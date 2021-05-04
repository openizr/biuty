<template>
  <div
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== null"
      class="ui-dropdown__label"
      :for="randomId"
    >{{ label }}</label>
    <div className="ui-dropdown__wrapper">
      <input
        :id="randomId"
        ref="inputRef"
        readonly
        :name="name"
        type="text"
        aria-haspopup="listbox"
        class="ui-dropdown__wrapper__field"
        :aria-labelledby="`${randomId} ${randomId}`"
        :value="fieldValue"
        :tabindex="(modifiers.includes('disabled') ? -1 : 0)"
        @keydown="navigate"
        @focus="focusField"
        @mousedown="displayList"
      >
      <button
        v-if="icon !== null"
        :id="`${randomId}icon`"
        type="button"
        class="ui-dropdown__wrapper__clear-button"
        :aria-labelledby="`${randomId} ${randomId}icon`"
        :tabindex="(modifiers.includes('disabled') ? -1 : 0)"
        @click="clearOptions"
      >
        <i class="ui-dropdown__wrapper__clear-button__icon">{{ icon }}</i>
      </button>
      <ul
        ref="ulRef"
        tabindex="-1"
        role="listbox"
        :aria-labelledby="randomId"
        :aria-expanded="isDisplayed"
        :aria-activedescendant="`${randomId}${focusedOption}`"
        :class="buildClass('ui-dropdown__wrapper__list', (isDisplayed=== true)
          ? [position, 'expanded']
          :[position])"
        @keydown="navigate"
        @blur="hideList(true, $event)"
      >
        <li
          v-for="(option, index) in options"
          :id="`${randomId}${index}`"
          :key="`${randomId}${index}`"
          tabindex="-1"
          :aria-selected="focusedOption === index"
          :role="(option.type === 'option') ? 'option' : undefined"
          :class="buildClass(`ui-dropdown__wrapper__list__${option.type}`,
                             ((option.disabled === true) ? ['disabled'] : []).concat(
                               (currentValue.includes(option.value) ? ['selected'] : [])))"
          v-on="(option.type==='option') ? { mousedown: selectOption(index) } : {}"
          @blur="hideList(true, $event)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
    <span
      v-if="helper !== null"
      className="ui-dropdown__helper"
    >{{ helper }}</span>
  </div>
</template>

<script lang="ts">
/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Vue from 'vue';
import { Generic } from 'scripts/types';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

interface Option {
  type: 'header' | 'divider' | 'option';
  value?: string;
  label?: string;
  disabled?: boolean;
}

interface Props {
  id: string;
  icon: string;
  label: string;
  multiple: boolean;
  helper: string;
  modifiers: string;
  name: string;
  value: string[];
  options: Option[];
}

type Mapping = Record<string, string>;

const findOption = (value: string) => (options: Option[]): number => (
  options.findIndex((option) => value === option.value && option.value !== undefined)
);

const generateMapping = (mapping: Mapping, option: Option): Mapping => (
  (option.value !== undefined && option.label !== undefined)
    ? ({ ...mapping, [option.value as string]: option.label as string })
    : mapping
);

/**
 * Dropdown.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UIDropdown',
  props: {
    id: {
      type: String,
      default: null,
      required: false,
    },
    icon: {
      type: String,
      default: null,
      required: false,
    },
    label: {
      type: String,
      default: null,
      required: false,
    },
    helper: {
      type: String,
      default: null,
      required: false,
    },
    modifiers: {
      type: String,
      default: '',
      required: false,
    },
    multiple: {
      type: Boolean,
      default: false,
      required: false,
    },
    value: {
      type: Array,
      default: () => [],
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDisplayed: false,
      position: 'bottom',
      currentValue: this.value,
      randomId: generateRandomId(),
      mapping: this.options.reduce(generateMapping, {}),
      focusedOption: findOption(this.value[0])(this.options),
    };
  },
  computed: {
    fieldValue(): string {
      return this.currentValue.map((option: string) => this.mapping[option]).join(', ');
    },
    className(): string {
      return buildClass('ui-dropdown', this.modifiers.split(' '));
    },
  },
  watch: {
    value() {
      // Updates current value each time the `value` property is changed.
      this.currentValue = this.value;
      // Avoids having to pass through the entire options array at each rendering.
      this.mapping = this.options.reduce(generateMapping, {});
    },
    isDisplayed() {
      // HTML elements with `display: none` can't be focused. Thus, we need to wait for the HTML
      // list to be displayed before actually focusing it.
      if (this.isDisplayed === true) {
        setTimeout(() => {
          this.focusOption((this.focusedOption >= 0)
            ? this.focusedOption
            : this.findSiblingOption(0, +1) || 0);
        }, 50);
      } else {
        (this.$refs.inputRef as HTMLElement).focus();
      }
    },
  },
  methods: {
    clearOptions(): void {
      this.currentValue = [];
    },
    buildClass(baseClass: string, modifiers: string[]): string {
      return buildClass(baseClass, modifiers);
    },
    focusField(focusedValue?: string): void {
      this.$emit('focus', focusedValue);
    },
    displayList(): void {
      const relativeOffsetTop = (this.$refs.inputRef as HTMLElement).getBoundingClientRect().top;
      this.position = (relativeOffsetTop > window.innerHeight / 2) ? 'top' : 'bottom';
      this.isDisplayed = true;
    },
    hideList(force = false, event: MouseEvent | null): void {
      // We first ensure that the newly focused element is not an option of the list.
      const focusIsOutsideList = (event !== null)
        ? !(this.$refs.ulRef as Node).contains(event.relatedTarget as Node)
        : true;
      if (focusIsOutsideList && (force === true || this.multiple === false)) {
        this.isDisplayed = false;
      }
    },
    toggleOption(optionIndex: number): void {
      let newValue;
      const selectedValue = this.options[optionIndex].value as string;
      if (this.multiple === false) {
        newValue = [selectedValue];
      } else {
        const selectedIndex = this.currentValue.indexOf(selectedValue);
        newValue = (selectedIndex >= 0)
          ? this.currentValue.slice(0, selectedIndex)
            .concat(this.currentValue.slice(selectedIndex + 1))
          : this.currentValue.concat([selectedValue]);
      }
      this.currentValue = newValue;
      this.$emit('change', newValue);
    },
    selectOption(optionIndex: number): () => void {
      return () => {
        this.focusOption(optionIndex);
        this.toggleOption(optionIndex);
        this.hideList(false, null);
      };
    },
    focusOption(optionIndex: number): void {
      if ((this.$refs.ulRef as Node).childNodes.length > 0) {
        ((this.$refs.ulRef as Node).childNodes[optionIndex] as HTMLElement).focus();
      }
      this.focusedOption = optionIndex;
      this.focusField((this.options[optionIndex] || {}).value);
    },
    navigate(event: KeyboardEvent): void {
      const { key } = event;
      // `event.preventDefault` is not called globally to avoid preventing tabs.
      switch (key) {
        case 'ArrowUp':
          this.focusOption(this.findSiblingOption(this.focusedOption, -1) || this.focusedOption);
          event.preventDefault();
          break;
        case 'ArrowDown':
          this.focusOption(this.findSiblingOption(this.focusedOption, +1) || this.focusedOption);
          event.preventDefault();
          break;
        case 'PageUp':
        case 'Home':
          this.focusOption(this.findSiblingOption(0, -1) || 0);
          event.preventDefault();
          break;
        case 'End':
        case 'PageDown':
          this.focusOption(this.findSiblingOption(this.options.length, +1)
            || this.options.length - 1);
          event.preventDefault();
          break;
        case ' ':
        case 'Enter':
          if (this.isDisplayed === false) {
            this.isDisplayed = true;
          } else {
            this.selectOption(this.focusedOption)();
          }
          event.preventDefault();
          break;
        case 'Escape':
          this.hideList(true, null);
          event.preventDefault();
          break;
        default:
          break;
      }
    },
    findSiblingOption(startIndex: number, direction: number): (number | null) {
      const nextIndex = startIndex + direction;
      if (nextIndex < 0 || nextIndex >= this.options.length) {
        return null;
      }
      const option = this.options[nextIndex];
      return (option.value !== undefined && option.disabled !== true)
        ? nextIndex
        : this.findSiblingOption(nextIndex, direction);
    },
  },
});
</script>

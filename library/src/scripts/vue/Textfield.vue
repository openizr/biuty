<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== null"
      class="ui-textfield__label"
      :for="randomId"
      v-html="markdown(label)"
    />
    <div class="ui-textfield__wrapper">
      <i
        v-if="icon !== null && iconPosition === 'left'"
        role="button"
        tabIndex="0"
        class="ui-textfield__wrapper__icon"
        @click="clickIcon"
      >{{ icon }}</i>
      <input
        :id="randomId"
        ref="inputRef"
        v-model="currentValue"
        :name="name"
        :max="max"
        :min="min"
        :step="step"
        :type="type"
        :size="size"
        :readonly="readonly"
        :maxlength="maxlength"
        class="ui-textfield__wrapper__field"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="modifiers.includes('disabled')"
        @input="changeField"
        @blur="blurField"
        @focus="focusField"
        @paste="paste"
        @keydown="checkPattern"
      >
      <i
        v-if="icon !== null && iconPosition === 'right'"
        role="button"
        tabIndex="0"
        class="ui-textfield__wrapper__icon"
        @click="clickIcon"
      >{{ icon }}</i>
    </div>
    <span
      v-if="helper !== null"
      class="ui-textfield__helper"
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
import { Generic } from 'scripts/vue/types';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

interface Props {
  name: string;
  value: string;
  min: number;
  max: number;
  step: number;
  size: number;
  icon: string;
  id: string;
  label: string;
  helper: string;
  maxlength: number;
  modifiers: string;
  readonly: boolean;
  placeholder: string;
  autocomplete: string;
  allowedPattern: RegExp,
  debounceTimeout: number;
  iconPosition: 'left' | 'right';
  transform: (value: string) => string;
  type: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
}

const specialKeysRegexp = /(Tab|Backspace|Delete|Enter|ArrowRight|ArrowLeft|ArrowDown|ArrowUp)/;

/**
 * Textfield.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UITextfield',
  props: {
    id: {
      type: String,
      default: null,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      default: null,
      required: false,
    },
    max: {
      type: Number,
      default: null,
      required: false,
    },
    step: {
      type: Number,
      default: null,
      required: false,
    },
    size: {
      type: Number,
      default: null,
      required: false,
    },
    maxlength: {
      type: Number,
      default: null,
      required: false,
    },
    icon: {
      type: String,
      default: null,
      required: false,
    },
    value: {
      type: String,
      default: '',
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
    placeholder: {
      type: String,
      default: null,
      required: false,
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false,
    },
    modifiers: {
      type: String,
      default: '',
      required: false,
    },
    allowedPattern: {
      type: RegExp,
      default: null,
      required: false,
    },
    iconPosition: {
      validator: (value) => value === 'left' || value === 'right',
      default: 'left',
      required: false,
    },
    type: {
      validator: (value) => ['text', 'email', 'number', 'password', 'search', 'tel', 'url'].includes(value),
      default: 'text',
      required: false,
    },
    autocomplete: {
      type: String,
      default: 'on',
      required: false,
    },
    debounceTimeout: {
      type: Number,
      default: null,
      required: false,
    },
    transform: {
      type: Function,
      default: (value: string) => value,
      required: false,
    },
  },
  data() {
    return {
      timeout: null,
      cursorPosition: null,
      randomId: generateRandomId(),
      currentValue: this.transform(this.value),
      globalAllowedPattern: (this.allowedPattern instanceof RegExp) ? new RegExp(this.allowedPattern.source, 'g') : null,
    };
  },
  computed: {
    className(): string {
      return buildClass('ui-textfield', this.modifiers.split(' '));
    },
  },
  watch: {
    value(): void {
      // Updates current value each time the `value` property is changed.
      this.currentValue = this.transform(this.value);
    },
    allowedPattern(): void {
      this.globalAllowedPattern = (this.allowedPattern instanceof RegExp) ? new RegExp(this.allowedPattern.source, 'g') : null;
    },
  },
  updated(): void {
    if (/^(url|tel|search|text|password)$/.test(this.type)) {
      (this.$refs.inputRef as HTMLInputElement).selectionEnd = this.cursorPosition;
      (this.$refs.inputRef as HTMLInputElement).selectionStart = this.cursorPosition;
    }
  },
  methods: {
    changeField(event: Event): void {
      const filteredValue = (this.globalAllowedPattern !== null)
        ? ((event.target as HTMLInputElement).value.match(this.globalAllowedPattern) || []).join('')
        : (event.target as HTMLInputElement).value;
      const newValue = this.transform(filteredValue);
      const currentCursorPosition = (event.target as HTMLInputElement).selectionStart as number;
      const isAtTheEnd = currentCursorPosition >= this.currentValue.length;
      this.currentValue = newValue;
      this.cursorPosition = (isAtTheEnd ? newValue.length : currentCursorPosition);
      window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(() => {
        this.$emit('change', this.currentValue);
      }, this.debounceTimeout || 0);
    },
    blurField(): void {
      this.$emit('blur', this.currentValue);
    },
    focusField(): void {
      this.$emit('focus', this.currentValue);
    },
    paste(event: ClipboardEvent): void {
      const cursor = (event.target as HTMLInputElement).selectionStart as number;
      const clipboardData = (event.clipboardData as DataTransfer).getData('text');
      const filteredValue = (this.globalAllowedPattern !== null)
        ? (clipboardData.match(this.globalAllowedPattern) || []).join('')
        : clipboardData;
      this.changeField({
        target: {
          value: `${this.currentValue.slice(0, cursor)}${filteredValue}${this.currentValue.slice(cursor)}`,
          selectionStart: cursor + filteredValue.length + 1,
        },
      } as unknown as Event);
    },
    clickIcon(): void {
      this.$emit('iconClick');
    },
    markdown(label: string): string {
      return markdown(label);
    },
    checkPattern(event: KeyboardEvent): void {
      if (
        this.allowedPattern instanceof RegExp
        && !this.allowedPattern.test(event.key)
        && !specialKeysRegexp.test(event.key)
        && !event.ctrlKey
      ) {
        event.preventDefault();
      }
    },
  },
});
</script>

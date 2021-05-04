<template>
  <div
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== null"
      class="ui-checkbox__label"
      :for="randomId"
    >{{ label }}</label>
    <div class="ui-checkbox__wrapper">
      <label
        v-for="option in options"
        :key="option.value"
        :class="buildClass('ui-checkbox__wrapper__option', [
          (currentValue === option.value) ? 'checked' : '',
          (option.disabled === true) ? 'disabled' : '',
        ])"
      >
        <input
          v-model="currentValue"
          class="ui-checkbox__wrapper__option__checkbox"
          type="checkbox"
          :name="name"
          :value="option.value"
          :disabled="option.disabled === true"
          :tabindex="modifiers.includes('disabled') ? -1 : 0"
          @focus="focusField(option.value)"
          @change="changeField"
        >
        <span className="ui-checkbox__wrapper__option__label">{{ option.label }}</span>
      </label>
    </div>
    <span
      v-if="(helper !== null)"
      className="ui-checkbox__wrapper__helper"
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

interface Props {
  id: string;
  name: string;
  label: string;
  helper: string;
  value: string[];
  modifiers: string;
  options: { value: string; label: string; disabled?: boolean; }[];
}

/**
 * Checkbox.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UICheckbox',
  props: {
    id: {
      type: String,
      default: null,
      required: false,
    },
    name: {
      type: String,
      default: null,
      required: true,
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
    value: {
      type: Array,
      default: () => [],
      required: false,
    },
    modifiers: {
      type: String,
      default: '',
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentValue: this.value,
      randomId: generateRandomId(),
    };
  },
  computed: {
    className(): string {
      return buildClass('ui-checkbox', this.modifiers.split(' '));
    },
  },
  watch: {
    value(): void {
      // Updates current value each time the `value` property is changed.
      this.currentValue = this.value;
    },
  },
  methods: {
    buildClass(base: string, modifiers: string[]): string {
      return buildClass(base, modifiers);
    },
    changeField(): void {
      this.$emit('change', this.currentValue);
    },
    focusField(focusedValue: string): void {
      this.$emit('focus', focusedValue);
    },
  },
});
</script>

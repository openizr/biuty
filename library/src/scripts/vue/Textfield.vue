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
        v-model="currentValue"
        :name="name"
        :max="max"
        :min="min"
        :step="step"
        :type="type"
        :size="size"
        :value="currentValue"
        :readonly="readonly"
        :maxlength="maxlength"
        class="ui-textfield__wrapper__field"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="modifiers.includes('disabled')"
        @input="changeField"
        @blur="blurField"
        @focus="focusField"
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
import { Generic } from 'scripts/types';
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
  iconPosition: 'left' | 'right';
  type: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
}

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
  },
  data() {
    return {
      randomId: generateRandomId(),
      currentValue: this.value,
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
      this.currentValue = this.value;
    },
  },
  methods: {
    changeField(event: KeyboardEvent): void {
      this.$emit('change', (event.target as HTMLInputElement).value);
    },
    blurField(): void {
      this.$emit('blur', this.currentValue as string);
    },
    focusField(): void {
      this.$emit('focus', this.currentValue as string);
    },
    clickIcon(): void {
      this.$emit('iconClick');
    },
    markdown(label: string): string {
      return markdown(label);
    },
  },
});
</script>

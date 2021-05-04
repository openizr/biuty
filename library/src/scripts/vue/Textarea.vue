<template>
  <div
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== null"
      class="ui-textarea__label"
      :for="randomId"
    > {{ label }}</label>
    <div class="ui-textarea__wrapper">
      <textarea
        :id="randomId"
        v-model="currentValue"
        :name="name"
        :cols="cols"
        :rows="rows"
        class="ui-textarea__wrapper__field"
        :readonly="readonly"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="modifiers.includes('disabled')"
        @blur="blurField"
        @input="changeField"
        @focus="focusField"
      />
    </div>
    <span
      v-if="helper !== null"
      class="ui-textarea__helper"
    > {{ helper }} </span>
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
  cols: number;
  rows: number;
  value: string;
  label: string;
  helper: string;
  maxlength: number;
  modifiers: string;
  readonly: boolean;
  placeholder: string;
  autocomplete: string;
}

/**
 * Textarea.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UITextarea',
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
    cols: {
      type: Number,
      default: null,
      required: false,
    },
    rows: {
      type: Number,
      default: null,
      required: false,
    },
    maxlength: {
      type: Number,
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
      return buildClass('ui-textarea', this.modifiers.split(' '));
    },
  },
  watch: {
    value(): void {
      // Updates current value each time the `value` property is changed.
      this.currentValue = this.value;
    },
  },
  methods: {
    changeField(): void {
      this.$emit('change', this.currentValue);
    },
    blurField(): void {
      this.$emit('blur', this.currentValue);
    },
    focusField(): void {
      this.$emit('focus', this.currentValue);
    },
  },
});
</script>

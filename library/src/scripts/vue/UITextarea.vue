<!-- Text area. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { computed, ref, watch } from 'vue';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

const emit = defineEmits({
  focus: null,
  blur: null,
  paste: null,
  change: null,
  keyDown: null,
});

const props = withDefaults(defineProps<{
  /** `id` HTML attribute to set to the element. */
  id?: string;

  /** `cols` HTML attribute to set to the element. */
  cols?: number;

  /** `rows` HTML attribute to set to the element. */
  rows?: number;

  /** `name` HTML attribute to set to the element. */
  name: string;

  /**
   * Textarea's value. Updating this prop with a new value will replace the current value by
   * the one passed.
   */
  value?: string;

  /** Element's label. Supports biuty light markdown. */
  label?: string;

  /** Element's helper. Supports biuty light markdown. */
  helper?: string;

  /** `readonly` HTML attribute to set to the element. Defaults to `false`. */
  readonly?: boolean;

  /** `maxlength` HTML attribute to set to the element. */
  maxlength?: number;

  /** List of modifiers to apply to the element. Defaults to `""`. */
  modifiers?: string;

  /** `autofocus` HTML attribute to set to the element. Defaults to `false`. */
  autofocus?: boolean;

  /** `placeholder` HTML attribute to set to the element. */
  placeholder?: string;

  /** `autocomplete` HTML attribute to set to the element. Defaults to `on`. */
  autocomplete?: 'on' | 'off';

  /**
   * Wether to automatically resize textarea's height when user puts line-breaks.
   * Defaults to `false`.
   */
  autoresize?: boolean;

  /**
   * Number of milliseconds to wait before triggering the `change` event. If user changes the
   * textarea value during that time, the timeout is reset. This is especially useful to limit the
   * number of triggers, if you want to use this component as an autocomplete performing HTTP
   * requests on user inputs, for instance. Defaults to `0`.
   */
  debounceTimeout?: number;
}>(), {
  modifiers: '',
  id: undefined,
  readonly: false,
  cols: undefined,
  rows: undefined,
  name: undefined,
  autofocus: false,
  value: undefined,
  label: undefined,
  autoresize: false,
  helper: undefined,
  autocomplete: 'on',
  debounceTimeout: 50,
  maxlength: undefined,
  placeholder: undefined,
});

const timeout = ref(null);
const reverseTimeout = ref(null);
const randomId = ref(generateRandomId());
const currentValue = ref(props.value);
const parsedLabel = computed(() => markdown(props.label));
const actualRows = computed(() => ((props.autoresize && props.rows === null)
  ? Math.max(1, currentValue.value.split('\n').length)
  : props.rows));
const parsedHelper = computed(() => markdown(props.helper));
const isDisabled = computed(() => props.modifiers.includes('disabled'));
const className = computed(() => buildClass('ui-textarea', props.modifiers));

// -------------------------------------------------------------------------------------------------
// CALLBACKS DECLARATION.
// -------------------------------------------------------------------------------------------------

const handleChange = (event: InputEvent): void => {
  clearTimeout(timeout.value);
  clearTimeout(reverseTimeout.value);
  const newValue = (event.target as HTMLTextAreaElement).value;
  currentValue.value = newValue;
  // This debounce system prevents triggering `onChange` callback too many times when user is
  // still typing to save performance and make the UI more reactive on low-perfomance devices.
  timeout.value = setTimeout(() => {
    emit('change', newValue, event);
  }, props.debounceTimeout);
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates current value whenever `value` prop changes.
watch(() => props.value, () => {
  clearTimeout(reverseTimeout.value);
  // Do not update current value immediatly while user is typing something else.
  reverseTimeout.value = setTimeout(() => {
    currentValue.value = props.value;
  }, 150);
});
</script>

<template>
  <div
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== undefined"
      class="ui-textarea__label"
      :for="randomId"
      v-html="parsedLabel"
    />
    <div class="ui-textarea__wrapper">
      <textarea
        :id="randomId"
        :value="currentValue"
        :name="name"
        :cols="cols"
        :rows="actualRows"
        :autofocus="autofocus"
        class="ui-textarea__wrapper__field"
        :readonly="readonly"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="isDisabled"
        @blur="$emit('blur', currentValue, $event)"
        @focus="$emit('focus', currentValue, $event)"
        @input="(readonly !== true && !isDisabled) ? handleChange($event) : undefined"
        @paste="(readonly !== true && !isDisabled) ? $emit('paste', $event) : undefined"
        @keydown="(readonly !== true && !isDisabled) ? $emit('keyDown', $event) : undefined"
      />
    </div>
    <span
      v-if="helper !== undefined"
      class="ui-textarea__helper"
      v-html="parsedHelper"
    />
  </div>
</template>

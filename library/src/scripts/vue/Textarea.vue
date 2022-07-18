<!-- Text area. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable vue/no-v-html */

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

const props = defineProps<{
  id?: string;
  cols?: number;
  rows?: number;
  name: string;
  value?: string;
  label?: string;
  helper?: string;
  readonly?: boolean;
  maxlength?: number;
  modifiers?: string;
  autofocus?: boolean;
  autoresize?: boolean;
  placeholder?: string;
  debounceTimeout?: number;
  autocomplete?: 'on' | 'off';
}>();

const timeout = ref(null);
const randomId = ref(generateRandomId());
const currentValue = ref(props.value || '');
const parsedLabel = computed(() => markdown(props.label));
const actualRows = computed(() => ((props.autoresize && (props.rows || null) === null)
  ? Math.max(1, currentValue.value.split('\n').length)
  : props.rows));
const parsedHelper = computed(() => markdown(props.helper));
const isDisabled = computed(() => props.modifiers?.includes('disabled'));
const className = computed(() => buildClass('ui-textarea', props.modifiers || ''));

// -------------------------------------------------------------------------------------------------
// CALLBACKS DECLARATION.
// -------------------------------------------------------------------------------------------------

const handleChange = (event: InputEvent): void => {
  const newValue = (event.target as HTMLTextAreaElement).value;
  currentValue.value = newValue;
  window.clearTimeout(timeout.value as number);
  // This debounce system prevents triggering `onChange` callback too many times when user is
  // still typing to save performance and make the UI more reactive on low-perfomance devices.
  timeout.value = setTimeout(() => {
    emit('change', newValue, event);
  }, props.debounceTimeout || 0);
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates current value whenever `value` prop changes.
watch(() => props.value, () => {
  currentValue.value = props.value;
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

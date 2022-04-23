<!-- Text field. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable vue/no-v-html */

import {
  computed,
  onUpdated,
  ref, watch,
} from 'vue';
import UIIcon from 'scripts/vue/Icon.vue';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

type KeyType = 'default' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey';
type AllowedKeys = Record<KeyType, RegExp | null>;
type Transform = (value: string, selectionStart: number) => [string, number?];

const emit = defineEmits({
  focus: null,
  blur: null,
  paste: null,
  change: null,
  keyDown: null,
  iconClick: null,
  iconKeyDown: null,
});

const props = defineProps<{
  id?: string;
  min?: number;
  max?: number;
  name: string;
  step?: number;
  icon?: string;
  size?: number;
  value?: string;
  label?: string;
  helper?: string;
  readonly?: boolean;
  maxlength?: number;
  modifiers?: string;
  placeholder?: string;
  autocomplete?: 'on' | 'off';
  iconPosition?: 'left' | 'right';
  allowedKeys?: {
    altKey?: RegExp;
    metaKey?: RegExp;
    ctrlKey?: RegExp;
    default?: RegExp;
    shiftKey?: RegExp;
  };
  debounceTimeout?: number;
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
  transform?: Transform;
}>();

const keyTypes: KeyType[] = ['default', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
const specialKeysRegexp = /Tab|Control|Shift|Meta|ContextMenu|Alt|Escape|Insert|Home|End|AltGraph|NumLock|Backspace|Delete|Enter|ArrowRight|ArrowLeft|ArrowDown|ArrowUp/;
const defaultTransform = (value: string): string[] => [value];

const timeout = ref(null);
const inputRef = ref(null);
const cursorPosition = ref(null);
const randomId = ref(generateRandomId());
const parsedLabel = computed(() => markdown(props.label));
const parsedHelper = computed(() => markdown(props.helper));
const isDisabled = computed(() => props.modifiers?.includes('disabled'));
const actualTransform = computed(() => props.transform || defaultTransform);
const className = computed(() => buildClass('ui-textfield', props.modifiers || ''));
const currentValue = ref(actualTransform.value(props.value || '', 0)[0]);

// Memoïzes global version of allowed keys RegExps (required for filtering out a whole text).
const globalAllowedKeys = computed(() => keyTypes.reduce((allAllowedKeys, keyType) => {
  const allowedKeysForType = (props.allowedKeys || {})[keyType];
  return {
    ...allAllowedKeys,
    [keyType]: (allowedKeysForType !== undefined && allowedKeysForType !== null)
      ? new RegExp(allowedKeysForType.source, `${allowedKeysForType.flags}g`)
      : null,
  };
}, {} as AllowedKeys));

// -------------------------------------------------------------------------------------------------
// CALLBACKS DECLARATION.
// -------------------------------------------------------------------------------------------------

const handleChange = (event: InputEvent, filter = true): void => {
  const target = event.target as HTMLInputElement;
  const { selectionStart } = target;
  const filteredValue = (filter && globalAllowedKeys.value.default !== null)
    ? (target.value.match(globalAllowedKeys.value.default) || []).join('')
    : target.value;
  const [newValue, newCursorPosition] = actualTransform.value(filteredValue, selectionStart);
  if (newCursorPosition !== undefined) {
    cursorPosition.value = newCursorPosition;
  } else {
    const isAtTheEnd = selectionStart >= currentValue.value.length;
    cursorPosition.value = isAtTheEnd ? newValue.length : selectionStart;
  }
  // We need to force the input value to prevent the component from getting uncontrolled.
  if (newValue === currentValue.value) {
    target.value = currentValue.value;
  } else {
    currentValue.value = newValue;
  }
  window.clearTimeout(timeout.value as number);
  // This debounce system prevents triggering `onChange` callback too many times when user is
  // still typing to improve performance and make UI more reactive on low-perfomance devices.
  timeout.value = setTimeout(() => {
    emit('change', newValue, event);
  }, props.debounceTimeout || 0);
};

const handleKeyDown = (event: KeyboardEvent): void => {
  const allowedKeys = props.allowedKeys || {};
  let allowedKeysForEvent = allowedKeys.default || null;
  if (event.ctrlKey === true) {
    allowedKeysForEvent = allowedKeys.ctrlKey || null;
  } else if (event.shiftKey === true) {
    allowedKeysForEvent = allowedKeys.shiftKey || null;
  } else if (event.altKey === true) {
    allowedKeysForEvent = allowedKeys.altKey || null;
  } else if (event.metaKey === true) {
    allowedKeysForEvent = allowedKeys.metaKey || null;
  }
  if (
    allowedKeysForEvent !== null
    && !allowedKeysForEvent.test(event.key)
    && !specialKeysRegexp.test(event.key)
  ) {
    event.preventDefault();
  } else {
    emit('keyDown', event);
  }
};

const handlePaste = (event: ClipboardEvent): void => {
  const { selectionStart, selectionEnd } = event.target as HTMLInputElement;
  const filteredValue = (globalAllowedKeys.value.default !== null)
    ? (event.clipboardData.getData('text').match(globalAllowedKeys.value.default) || []).join('')
    : event.clipboardData.getData('text');
  handleChange({
    target: {
      value: `${currentValue.value.slice(0, selectionStart)}${filteredValue}${currentValue.value.slice(selectionEnd)}`,
      selectionStart: selectionStart + filteredValue.length,
    },
  } as unknown as InputEvent, false);
  event.preventDefault();
  emit('paste', event);
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates current value whenever `value` and `transform` props change.
watch(() => [props.value, props.transform], () => {
  const [newValue, newCursorPosition] = actualTransform.value(props.value || '', 0);
  currentValue.value = newValue;
  cursorPosition.value = newCursorPosition;
});

// Re-positions cursor at the right place when using transform function.
onUpdated(() => {
  if (/^(url|text|tel|search|password)$/.test(props.type || 'text') && inputRef.value !== null) {
    inputRef.value.selectionStart = cursorPosition.value;
    inputRef.value.selectionEnd = cursorPosition.value;
  }
});
</script>

<template>
  <div
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== undefined"
      class="ui-textfield__label"
      :for="randomId"
      v-html="parsedLabel"
    />
    <div class="ui-textfield__wrapper">
      <span
        v-if="icon !== undefined && iconPosition !== 'right'"
        tabIndex="0"
        role="button"
        class="ui-textfield__wrapper__icon"
        @click="$emit('iconClick', $event)"
        @keydown="$emit('iconKeyDown', $event)"
      >
        <UIIcon :name="icon" />
      </span>
      <input
        :id="randomId"
        ref="inputRef"
        :name="name"
        :max="max"
        :min="min"
        :step="step"
        :type="type"
        :readonly="readonly"
        :value="currentValue"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :size="size"
        :autocomplete="autocomplete"
        class="ui-textfield__wrapper__field"
        :disabled="isDisabled"
        @keydown="handleKeyDown"
        @blur="$emit('blur', currentValue, $event)"
        @focus="$emit('focus', currentValue, $event)"
        @paste="(readonly !== true && !isDisabled) ? handlePaste($event) : undefined"
        @input="(readonly !== true && !isDisabled) ? handleChange($event) : undefined"
      >
      <span
        v-if="icon !== undefined && iconPosition === 'right'"
        tabIndex="0"
        role="button"
        class="ui-textfield__wrapper__icon"
        @click="$emit('iconClick', $event)"
        @keydown="$emit('iconKeyDown', $event)"
      >
        <UIIcon :name="icon" />
      </span>
    </div>
    <span
      v-if="helper !== undefined"
      class="ui-textfield__helper"
      v-html="parsedHelper"
    />
  </div>
</template>

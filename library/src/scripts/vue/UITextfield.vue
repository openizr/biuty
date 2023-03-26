<!-- Text field. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  computed,
  onUpdated,
  ref, watch,
} from 'vue';
import UIIcon from 'scripts/vue/Icon.vue';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

type AllowedKeys = {
  altKey?: RegExp;
  metaKey?: RegExp;
  ctrlKey?: RegExp;
  default?: RegExp;
  shiftKey?: RegExp;
};
type KeyType = 'default' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey';
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

const props = withDefaults(defineProps<{
  /** `id` HTML attribute to set to the element. */
  id?: string;

  /** `min` HTML attribute to set to the element. */
  min?: number;

  /** `max` HTML attribute to set to the element. */
  max?: number;

  /** `name` HTML attribute to set to the element. */
  name: string;

  /** `step` HTML attribute to set to the element. */
  step?: number;

  /** Name of the icon to set to the element. */
  icon?: string;

  /** `site` HTML attribute to set to the element. */
  size?: number;

  /**
   * Input's value. Updating this prop with a new value will replace the current value by
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

  /** `placeholder` HTML attribute to set to the element. Defaults to `false`. */
  placeholder?: string;

  /** `autocomplete` HTML attribute to set to the element. Defaults to `on`. */
  autocomplete?: 'on' | 'off';

  /** Position of the icon relatively to the label. */
  iconPosition?: 'left' | 'right';

  /**
   * List of RegExp patterns used to filter user inputs and keep only authorized characters.
   * Useful for purpose-specific inputs, like phone numbers (you only want to allow digits).
   * `default` is used to filter all inputs, and the others keys are used to allow specific
   * patterns when holding special keys, like `Ctrl`.
   */
  allowedKeys?: AllowedKeys;

  /**
   * Number of milliseconds to wait before triggering the `change` event. If user changes the
   * input value during that time, the timeout is reset. This is especially useful to limit the
   * number of triggers, if you want to use this component as an autocomplete performing HTTP
   * requests on user inputs, for instance. Defaults to `0`.
   */
  debounceTimeout?: number;

  /** `type` HTML attribute to set to the element. Defaults to `text`. */
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';

  /**
   * Transformation function that will format input value.
   * This is especially useful for purpose-specific inputs, like phone numbers (you want to format
   * the number to something like (XXX) XXX-XXXX).
   *
   * @param value Input value to transform.
   *
   * @param selectionStart Current cursor position in the input.
   *
   * @returns An array of at least the formatted value, and optionally the new cursor position
   * after formatting.
   */
  transform?: Transform;
}>(), {
  type: 'text',
  modifiers: '',
  min: undefined,
  id: undefined,
  max: undefined,
  readonly: false,
  autofocus: false,
  name: undefined,
  icon: undefined,
  step: undefined,
  size: undefined,
  value: undefined,
  label: undefined,
  helper: undefined,
  autocomplete: 'on',
  debounceTimeout: 50,
  iconPosition: 'left',
  maxlength: undefined,
  placeholder: undefined,
  allowedKeys: {} as undefined,
  transform: (value: string): [string, number?] => [value],
});

const keyTypes: KeyType[] = ['default', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
const specialKeysRegexp = /Tab|Control|Shift|Meta|ContextMenu|Alt|Escape|Insert|Home|End|AltGraph|NumLock|Backspace|Delete|Enter|ArrowRight|ArrowLeft|ArrowDown|ArrowUp/;

const timeout = ref(null);
const inputRef = ref(null);
const reverseTimeout = ref(null);
const cursorPosition = ref(null);
const randomId = ref(generateRandomId());
const parsedLabel = computed(() => markdown(props.label));
const parsedHelper = computed(() => markdown(props.helper));
const currentValue = ref(props.transform(props.value, 0)[0]);
const isDisabled = computed(() => props.modifiers.includes('disabled'));
const className = computed(() => buildClass('ui-textfield', props.modifiers));

// Memoizes global version of allowed keys RegExps (required for filtering out a whole text).
const globalAllowedKeys = computed(() => keyTypes.reduce((allAllowedKeys, keyType) => {
  const allowedKeysForType = (props.allowedKeys)[keyType];
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
  clearTimeout(timeout.value);
  clearTimeout(reverseTimeout.value);
  const target = event.target as HTMLInputElement;
  const { selectionStart } = target;
  const filteredValue = (filter && globalAllowedKeys.value.default !== null)
    ? (target.value.match(globalAllowedKeys.value.default) || []).join('')
    : target.value;
  const [newValue, newCursorPosition] = props.transform(filteredValue, selectionStart);
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
  // This debounce system prevents triggering `onChange` callback too many times when user is
  // still typing to improve performance and make UI more reactive on low-perfomance devices.
  timeout.value = setTimeout(() => {
    emit('change', newValue, event);
  }, props.debounceTimeout);
};

const handleKeyDown = (event: KeyboardEvent): void => {
  const { allowedKeys } = props;
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
  // `selectionStart` and `selectionEnd` do not exist on inputs with type `number`, so we just
  // want to replace the entire content when pasting something in that case.
  const selectionStart = (event.target as HTMLInputElement).selectionStart || 0;
  const selectionEnd = (event.target as HTMLInputElement).selectionEnd || currentValue.value.length;
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
  clearTimeout(reverseTimeout.value);
  // Do not update current value immediatly while user is typing something else.
  reverseTimeout.value = setTimeout(() => {
    const [newValue] = props.transform(props.value, 0);
    currentValue.value = newValue;
  }, 150);
});

// Re-positions cursor at the right place when using transform function.
onUpdated(() => {
  if (/^(url|text|tel|search|password)$/.test(props.type) && inputRef.value !== null) {
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
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        class="ui-textfield__wrapper__field"
        :disabled="isDisabled"
        :size="size === undefined ? 1 : size"
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

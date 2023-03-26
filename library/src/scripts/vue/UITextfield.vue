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
import UIIcon from 'scripts/vue/UIIcon.vue';
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
type MouseEventHandler = (event: MouseEvent) => void;
type FocusEventHandler = (value: string, event: FocusEvent) => void;
type ChangeEventHandler = (value: string, event: InputEvent) => void;
type KeyboardEventHandler = (value: string, event: KeyboardEvent) => void;
type ClipboardEventHandler = (value: string, event: ClipboardEvent) => void;

const props = withDefaults(defineProps<{
  id?: string;
  min?: number;
  max?: number;
  name: string;
  step?: number;
  icon?: string;
  size?: number;
  label?: string;
  helper?: string;
  readonly?: boolean;
  maxlength?: number;
  modifiers?: string;
  autofocus?: boolean;
  placeholder?: string;
  value?: string | number;
  autocomplete?: 'on' | 'off';
  iconPosition?: 'left' | 'right';
  allowedKeys?: AllowedKeys;
  debounceTimeout?: number;
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
  transform?: Transform;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  onPaste?: ClipboardEventHandler;
  onChange?: ChangeEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onIconKeyDown?: KeyboardEventHandler;
  onIconClick?: MouseEventHandler;
}>(), {
  value: '',
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
  size: 1,
  label: undefined,
  helper: undefined,
  autocomplete: 'off',
  debounceTimeout: 50,
  iconPosition: 'left',
  maxlength: undefined,
  placeholder: undefined,
  allowedKeys: {} as undefined,
  transform: (value: string): [string, number?] => [value],
  onFocus: undefined,
  onBlur: undefined,
  onChange: undefined,
  onPaste: undefined,
  onKeyDown: undefined,
  onIconKeyDown: undefined,
  onIconClick: undefined,
});

const keyTypes: KeyType[] = ['default', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
const specialKeysRegexp = /Tab|Control|Shift|Meta|ContextMenu|Alt|Escape|Insert|Home|End|AltGraph|NumLock|Backspace|Delete|Enter|ArrowRight|ArrowLeft|ArrowDown|ArrowUp/;

const timeout = ref(null);
const inputRef = ref(null);
const isUserTyping = ref(false);
const cursorPosition = ref(null);
const randomId = ref(generateRandomId());
const currentValue = ref(props.transform(`${props.value}`, 0)[0]);
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
  isUserTyping.value = true;
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
    isUserTyping.value = false;
    if (props.onChange !== undefined) {
      props.onChange(newValue, event);
    }
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
  } else if (props.onKeyDown !== undefined) {
    props.onKeyDown(currentValue.value, event);
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
  if (props.onPaste !== undefined) {
    props.onPaste(currentValue.value, event);
  }
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates current value whenever `value` and `transform` props change.
watch(() => [props.value, props.transform], () => {
  // Do not update current value immediatly while user is typing something else.
  if (!isUserTyping.value) {
    const [newValue] = props.transform(`${props.value}`, 0);
    currentValue.value = newValue;
  }
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
      v-html="markdown(label)"
    />
    <div class="ui-textfield__wrapper">
      <span
        v-if="icon !== undefined && iconPosition === 'left'"
        tabIndex="0"
        role="button"
        class="ui-textfield__wrapper__icon"
        @click="onIconClick !== undefined && onIconClick($event)"
        @keydown="onIconKeyDown !== undefined && onIconKeyDown($event)"
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
        :size="size"
        @keydown="handleKeyDown"
        @blur="onBlur !== undefined && onBlur(currentValue, $event)"
        @focus="onFocus !== undefined && onFocus(currentValue, $event)"
        @paste="(readonly !== true && !isDisabled) && handlePaste($event)"
        @input="(readonly !== true && !isDisabled) && handleChange($event)"
      >
      <span
        v-if="icon !== undefined && iconPosition === 'right'"
        tabIndex="0"
        role="button"
        class="ui-textfield__wrapper__icon"
        @click="onIconClick !== undefined && onIconClick($event)"
        @keydown="onIconKeyDown !== undefined && onIconKeyDown($event)"
      >
        <UIIcon :name="icon" />
      </span>
    </div>
    <span
      v-if="helper !== undefined"
      class="ui-textfield__helper"
      v-html="markdown(helper)"
    />
  </div>
</template>

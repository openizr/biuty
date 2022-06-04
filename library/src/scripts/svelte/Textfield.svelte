<!-- Text field. -->
<script lang="ts">
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import UIIcon from 'scripts/svelte/Icon.svelte';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import { createEventDispatcher, tick } from 'svelte';
import generateRandomId from 'scripts/helpers/generateRandomId';

type KeyType = 'default' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey';
type AllowedKeys = Partial<Record<KeyType, RegExp | null>>;
type Transform = (value: string, selectionStart: number) => [string, number?];

const dispatch = createEventDispatcher();
const defaultTransform: Transform = (newValue) => [newValue];
const keyTypes: KeyType[] = ['default', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
const specialKeysRegexp = /Tab|Control|Shift|Meta|ContextMenu|Alt|Escape|Insert|Home|End|AltGraph|NumLock|Backspace|Delete|Enter|ArrowRight|ArrowLeft|ArrowDown|ArrowUp/;

export let name: string;
export let value = '';
export let modifiers = '';
export let readonly = false;
export let autofocus = false;
export let debounceTimeout = 0;
export let id: string | null = null;
export let min: number | null = null;
export let max: number | null = null;
export let step: number | null = null;
export let size: number | null = null;
export let icon: string | null = null;
export let label: string | null = null;
export let helper: string | null = null;
export let allowedKeys: AllowedKeys = {};
export let maxlength: number | null = null;
export let placeholder: string | null = null;
export let autocomplete: 'on' | 'off' = 'on';
export let iconPosition: 'left' | 'right' = 'left';
export let transform: Transform = defaultTransform;
export let type: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' = 'text';

let timeout: number | null = null;
const randomId = generateRandomId();
let cursorPosition: number | null = null;
let actualTransform = transform || defaultTransform;
let currentValue = defaultTransform(value, 0)[0];
let inputRef: HTMLInputElement | null = null;

$: isDisabled = modifiers.includes('disabled');
$: className = buildClass('ui-textfield', modifiers);
$: parsedLabel = label !== null ? markdown(label) : null;
$: parsedHelper = helper !== null ? markdown(helper) : null;
// Memoïzes global version of allowed keys RegExps (required for filtering out a whole text).
$: globalAllowedKeys = keyTypes.reduce((allAllowedKeys, keyType) => {
  const allowedKeysForType = allowedKeys[keyType];
  return {
    ...allAllowedKeys,
    [keyType]: (allowedKeysForType !== undefined && allowedKeysForType !== null)
      ? new RegExp(allowedKeysForType.source, `${allowedKeysForType.flags}g`)
      : null,
  };
}, {} as AllowedKeys);

// -------------------------------------------------------------------------------------------------
// CALLBACKS DECLARATION.
// -------------------------------------------------------------------------------------------------

// Re-positions cursor at the right place when using transform function.
const updateCursorPosition = async () => {
  await tick();
  if (/^(url|text|tel|search|password)$/.test(type || 'text') && inputRef !== null) {
    inputRef.selectionStart = cursorPosition;
    inputRef.selectionEnd = cursorPosition;
  }
};

const handleChange = (event: Event, filter = true): void => {
  const target = event.target as HTMLInputElement;
  const selectionStart = target.selectionStart as number;
  const filteredValue = (filter && globalAllowedKeys.default !== null)
    ? (target.value.match(globalAllowedKeys.default as RegExp) || []).join('')
    : target.value;
  const [newValue, newCursorPosition] = actualTransform(filteredValue, selectionStart);
  if (newCursorPosition !== undefined) {
    cursorPosition = newCursorPosition;
  } else {
    const isAtTheEnd = selectionStart >= currentValue.length;
    cursorPosition = isAtTheEnd ? newValue.length : selectionStart;
  }
  // We need to force the input value to prevent the component from getting uncontrolled.
  if (newValue === currentValue) {
    target.value = currentValue;
  } else {
    currentValue = newValue;
  }
  window.clearTimeout(timeout as unknown as number);
  // This debounce system prevents triggering `onChange` callback too many times when user is
  // still typing to improve performance and make UI more reactive on low-perfomance devices.
  timeout = setTimeout(() => {
    dispatch('change', { newValue, event });
  }, debounceTimeout) as unknown as number;
  updateCursorPosition();
};

const handleKeyDown = (event: KeyboardEvent): void => {
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
    dispatch('keyDown', { event });
  }
};

const handlePaste = (event: ClipboardEvent): void => {
  const clipboardData = event.clipboardData as DataTransfer;
  const selectionEnd = (event.target as HTMLInputElement).selectionEnd as number;
  const selectionStart = (event.target as HTMLInputElement).selectionStart as number;
  const filteredValue = (globalAllowedKeys.default !== null)
    ? (clipboardData.getData('text').match(globalAllowedKeys.default as RegExp) || []).join('')
    : clipboardData.getData('text');
  handleChange({
    target: {
      value: `${currentValue.slice(0, selectionStart)}${filteredValue}${currentValue.slice(selectionEnd)}`,
      selectionStart: selectionStart + filteredValue.length,
    },
  } as unknown as InputEvent, false);
  event.preventDefault();
  dispatch('paste', { event });
};

const handleBlur = (event: FocusEvent): void => {
  dispatch('blur', { event, currentValue });
};

const handleFocus = (event: FocusEvent): void => {
  dispatch('focus', { event, currentValue });
};

const handleIconClick = (event: MouseEvent): void => {
  dispatch('iconClick', event);
};

const handleIconKeyDown = (event: KeyboardEvent): void => {
  dispatch('iconKeyDown', event);
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates current value whenever `value` and `transform` props change.
const updateValue = (updatedValue?: string, updatedTransform?: Transform) => {
  actualTransform = updatedTransform || defaultTransform;
  const [newValue] = actualTransform(updatedValue || '', 0);
  currentValue = newValue;
  updateCursorPosition();
};
$: updateValue(value);
</script>
<!-- svelte-ignore a11y-autofocus -->
<div
id={id}
  class={className}
>
  {#if label !== null}
    <label for={randomId} class="ui-textfield__label">
      {@html parsedLabel}
    </label>
  {/if}
  <div class="ui-textfield__wrapper">
    {#if icon !== null && iconPosition === 'left'}
      <span
        tabIndex="0"
        role="button"
        class="ui-textfield__wrapper__icon"
        on:click={handleIconClick}
        on:keydown={handleIconKeyDown}
      >
        <UIIcon name={icon} />
      </span>
    {/if}
    <input
      name={name}
      max={max}
      min={min}
      step={step}
      type={type}
      id={randomId}
      bind:this={inputRef}
      readonly={readonly}
      value={currentValue}
      maxlength={maxlength}
      placeholder={placeholder}
      size={size}
      autofocus={autofocus}
      autocomplete={autocomplete}
      class="ui-textfield__wrapper__field"
      disabled={isDisabled}
      on:blur={handleBlur}
      on:focus={handleFocus}
      on:keydown={handleKeyDown}
      on:paste={(readonly !== true && !isDisabled) ? handlePaste : undefined}
      on:input={(readonly !== true && !isDisabled) ? handleChange : undefined}
    >
    {#if icon !== null && iconPosition === 'right'}
      <span
        tabIndex="0"
        role="button"
        class="ui-textfield__wrapper__icon"
        on:click={handleIconClick}
        on:keydown={handleIconKeyDown}
      >
        <UIIcon name={icon} />
      </span>
    {/if}
  </div>
  {#if helper !== null}
    <span  class="ui-textfield__helper">
      {@html parsedHelper}
    </span>
  {/if}
</div>

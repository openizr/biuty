<!-- Text area. -->
<script lang="ts">
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

export let value = '';
export let name: string;
export let modifiers = '';
export let readonly = false;
export let autofocus = false;
export let autoresize = false;
export let debounceTimeout = 50;
export let autocomplete: 'on' | 'off' = 'on';
export let id: string | undefined = undefined;
export let cols: number | undefined = undefined;
export let rows: number | undefined = undefined;
export let label: string | undefined = undefined;
export let helper: string | undefined = undefined;
export let maxlength: number | undefined = undefined;
export let placeholder: string | undefined = undefined;
export let onFocus: ((value: string, event: FocusEvent) => void) | undefined = undefined;
export let onBlur: ((value: string, event: FocusEvent) => void) | undefined = undefined;
export let onPaste: ((value: string, event: ClipboardEvent) => void) | undefined = undefined;
export let onChange: ((value: string, event: InputEvent) => void) | undefined = undefined;
export let onKeyDown: ((value: string, event: KeyboardEvent) => void) | undefined = undefined;

let currentValue = value;
let isUserTyping = false;
let timeout: number | null = null;
const randomId = generateRandomId();

$: isDisabled = modifiers.includes('disabled');
$: className = buildClass('ui-textarea', modifiers);

// -------------------------------------------------------------------------------------------------
// CALLBACKS DECLARATION.
// -------------------------------------------------------------------------------------------------

const handleChange = (event: Event): void => {
  clearTimeout(timeout as number);
  isUserTyping = true;
  const newValue = (event.target as HTMLTextAreaElement).value;
  currentValue = newValue;
  // This debounce system prevents triggering `onChange` callback too many times when user is
  // still typing to save performance and make the UI more reactive on low-perfomance devices.
  timeout = setTimeout(() => {
    isUserTyping = false;
    if (onChange !== undefined) {
      onChange(newValue, event as InputEvent);
    }
  }, debounceTimeout) as unknown as number;
};

const handlePaste = (event: ClipboardEvent): void => {
  if (onPaste !== undefined) {
    onPaste(currentValue, event);
  }
};

const handleKeyDown = (event: KeyboardEvent): void => {
  if (onKeyDown !== undefined) {
    onKeyDown(currentValue, event);
  }
};

const handleBlur = (event: FocusEvent): void => {
  if (onBlur !== undefined) {
    onBlur(currentValue, event);
  }
};

const handleFocus = (event: FocusEvent): void => {
  if (onFocus !== undefined) {
    onFocus(currentValue, event);
  }
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates current value whenever `value` prop changes.
$: {
  // Do not update current value immediatly while user is typing something else.
  if (!isUserTyping) {
    currentValue = value;
  }
}
$: actualRows = (autoresize && rows === undefined) ? Math.max(1, currentValue.split('\n').length) : rows;
</script>

<!-- svelte-ignore a11y-autofocus -->
<div
  id={id}
  class={className}
>
  {#if label !== undefined}
    <label for={randomId} class="ui-textarea__label">
      {@html markdown(label)}
    </label>
  {/if}
  <div class="ui-textarea__wrapper">
    <textarea
      name={name}
      cols={cols}
      id={randomId}
      on:paste={handlePaste}
      rows={actualRows}
      readonly={readonly}
      on:blur={handleBlur}
      value={currentValue}
      maxlength={maxlength}
      autofocus={autofocus}
      disabled={isDisabled}
      on:focus={handleFocus}
      on:keydown={handleKeyDown}
      placeholder={placeholder}
      autocomplete={autocomplete}
      class="ui-textarea__wrapper__field"
      on:input={(readonly !== true && !isDisabled) ? handleChange : undefined}
    />
  </div>
  {#if helper !== undefined}
    <span  class="ui-textarea__helper">
      {@html markdown(helper)}
    </span>
  {/if}
</div>

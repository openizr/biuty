<!-- Text area. -->
<script lang="ts">
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createEventDispatcher } from 'svelte';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

const dispatch = createEventDispatcher();

export let name: string;
export let value = '';
export let modifiers = '';
export let readonly = false;
export let autofocus = false;
export let debounceTimeout = 0;
export let id: string | null = null;
export let cols: number | null = null;
export let rows: number | null = null;
export let label: string | null = null;
export let helper: string | null = null;
export let maxlength: number | null = null;
export let placeholder: string | null = null;
export let autocomplete: 'on' | 'off' = 'on';

// Enforces props default values.
$: id = id || null;
$: value = value || '';
$: label = label || null;
$: helper = helper || null;
$: modifiers = modifiers || '';
$: readonly = readonly || false;
$: autofocus = autofocus || false;
$: placeholder = placeholder || null;
$: autocomplete = autocomplete || 'on';
$: debounceTimeout = debounceTimeout || 0;
$: rows = (rows !== undefined) ? rows : null;
$: cols = (cols !== undefined) ? cols : null;
$: maxlength = (maxlength !== undefined) ? maxlength : null;

let currentValue = value;
let timeout: number | null = null;
const randomId = generateRandomId();

$: isDisabled = modifiers.includes('disabled');
$: className = buildClass('ui-textarea', modifiers);
$: parsedLabel = label !== null ? markdown(label) : null;
$: parsedHelper = helper !== null ? markdown(helper) : null;

// -------------------------------------------------------------------------------------------------
// CALLBACKS DECLARATION.
// -------------------------------------------------------------------------------------------------

const handleChange = (event: Event): void => {
  const newValue = (event.target as HTMLTextAreaElement).value;
  currentValue = newValue;
  window.clearTimeout(timeout as number);
  // This debounce system prevents triggering `onChange` callback too many times when user is
  // still typing to save performance and make the UI more reactive on low-perfomance devices.
  timeout = setTimeout(() => {
    dispatch('change', { newValue, event });
  }, debounceTimeout) as unknown as number;
};

const handleBlur = (event: FocusEvent): void => {
  dispatch('blur', { event, currentValue });
};

const handleFocus = (event: FocusEvent): void => {
  dispatch('focus', { event, currentValue });
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates current value whenever `value` prop changes.
const updateValue = (newValue: string) => {
  currentValue = newValue;
};
$: updateValue(value);
</script>

<!-- svelte-ignore a11y-autofocus -->
<div
  id={id}
  class={className}
>
  {#if label !== null}
    <label for={randomId} class="ui-textarea__label">
      {@html parsedLabel}
    </label>
  {/if}
  <div class="ui-textarea__wrapper">
    <textarea
      id={randomId}
      value={currentValue}
      name={name}
      cols={cols}
      rows={rows}
      class="ui-textarea__wrapper__field"
      readonly={readonly}
      maxlength={maxlength}
      placeholder={placeholder}
      autofocus={autofocus}
      autocomplete={autocomplete}
      disabled={isDisabled}
      on:paste
      on:keydown
      on:blur={handleBlur}
      on:focus={handleFocus}
      on:input={(readonly !== true && !isDisabled) ? handleChange : undefined}
    />
  </div>
  {#if helper !== null}
    <span  class="ui-textarea__helper">
      {@html parsedHelper}
    </span>
  {/if}
</div>

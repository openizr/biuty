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

export let value = '';
export let name: string;
export let modifiers = '';
export let readonly = false;
export let autofocus = false;
export let autoresize = false;
export let debounceTimeout = 0;
export let autocomplete: 'on' | 'off' = 'on';
export let id: string | undefined = undefined;
export let cols: number | undefined = undefined;
export let rows: number | undefined = undefined;
export let label: string | undefined = undefined;
export let helper: string | undefined = undefined;
export let maxlength: number | undefined = undefined;
export let placeholder: string | undefined = undefined;

let currentValue = value;
let userIsTyping = false;
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
  clearTimeout(timeout as number);
  userIsTyping = true;
  const newValue = (event.target as HTMLTextAreaElement).value;
  currentValue = newValue;
  // This debounce system prevents triggering `onChange` callback too many times when user is
  // still typing to save performance and make the UI more reactive on low-perfomance devices.
  timeout = setTimeout(() => {
    userIsTyping = false;
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
$: {
  // Do not update current value immediatly while user is typing something else.
  if (!userIsTyping) {
    currentValue = value;
  }
}
$: actualRows = (autoresize && rows === null) ? Math.max(1, currentValue.split('\n').length) : rows;
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
      on:paste
      on:keydown
      name={name}
      cols={cols}
      id={randomId}
      rows={actualRows}
      readonly={readonly}
      on:blur={handleBlur}
      value={currentValue}
      maxlength={maxlength}
      autofocus={autofocus}
      disabled={isDisabled}
      on:focus={handleFocus}
      placeholder={placeholder}
      autocomplete={autocomplete}
      class="ui-textarea__wrapper__field"
      on:input={(readonly !== true && !isDisabled) ? handleChange : undefined}
    />
  </div>
  {#if helper !== null}
    <span  class="ui-textarea__helper">
      {@html parsedHelper}
    </span>
  {/if}
</div>

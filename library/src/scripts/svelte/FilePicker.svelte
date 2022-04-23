<!-- File picker. -->
<script lang="ts">
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createEventDispatcher } from 'svelte';
import UIIcon from 'scripts/svelte/Icon.svelte';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

const dispatch = createEventDispatcher();

export let name: string;
export let modifiers = '';
export let multiple = false;
export let value: File[] = [];
export let id: string | null = null;
export let icon: string | null = null;
export let label: string | null = null;
export let accept: string | null = null;
export let helper: string | null = null;
export let placeholder: string | null = null;
export let iconPosition: 'left' | 'right' = 'left';

let currentValue = value;
const randomId = generateRandomId();

$: className = buildClass('ui-file-picker', modifiers + (multiple ? ' multiple' : ''));
$: parsedLabel = label !== null ? markdown(label) : null;
$: parsedHelper = helper !== null ? markdown(helper) : null;
$: currentPlaceholder = (currentValue.length > 0) ? currentValue.map((file) => file.name).join(', ') : placeholder;

// -----------------------------------------------------------------------------------------------
// CALLBACKS DECLARATION.
// -----------------------------------------------------------------------------------------------

const handleChange = (event: Event): void => {
  const files = [];
  const target = event.target as HTMLInputElement;
  const numberOfFiles = (target.files as FileList).length;
  for (let index = 0; index < numberOfFiles; index += 1) {
    files.push((target.files as FileList)[index]);
  }
  currentValue = files;
  dispatch('change', [files, event]);
};

const handleFocus = (event: FocusEvent): void => {
  dispatch('focus', [currentValue, event]);
};

const handleBlur = (event: FocusEvent): void => {
  dispatch('blur', [currentValue, event]);
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates current value whenever `value` prop changes.
const updateValue = (updatedValue: File[]) => {
  currentValue = updatedValue;
};
$: updateValue(value);
</script>

<div
  id={id}
  class={className}
>
  {#if label !== null}
    <label for={randomId} class="ui-file-picker__label">
      {@html parsedLabel}
    </label>
  {/if}
  <div class="ui-file-picker__wrapper">
    {#if icon !== null && iconPosition === 'left'}
      <UIIcon name={icon} />
    {/if}
    <input
      type="file"
      name={name}
      id={randomId}
      accept={accept}
      multiple={multiple}
      on:blur={handleBlur}
      on:focus={handleFocus}
      on:input={handleChange}
      class="ui-file-picker__wrapper__field"
      tabIndex={modifiers.includes('disabled') ? -1 : 0}
    >
    {#if icon !== null && iconPosition === 'right'}
      <UIIcon name={icon} />
    {/if}
    <span class="ui-file-picker__wrapper__placeholder">
      {currentPlaceholder}
    </span>
  </div>
  {#if helper !== null}
    <span  class="ui-file-picker__helper">
      {@html parsedHelper}
    </span>
  {/if}
</div>

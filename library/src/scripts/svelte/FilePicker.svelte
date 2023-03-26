<!-- File picker. -->
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
import generateRandomId from 'scripts/helpers/generateRandomId';

export let name: string;
export let modifiers = '';
export let multiple = false;
export let value: File[] = [];
export let id: string | undefined = undefined;
export let icon: string | undefined = undefined;
export let label: string | undefined = undefined;
export let accept: string | undefined = undefined;
export let helper: string | undefined = undefined;
export let iconPosition: 'left' | 'right' = 'left';
export let placeholder: string | undefined = undefined;
export let onChange: ((value: File[], event: InputEvent) => void) | undefined = undefined;
export let onFocus: ((value: File[], event: FocusEvent) => void) | undefined = undefined;
export let onBlur: ((value: File[], event: FocusEvent) => void) | undefined = undefined;

let currentValue = value;
const randomId = generateRandomId();

$: className = buildClass('ui-file-picker', modifiers + (multiple ? ' multiple' : ''));
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
  if (onChange !== undefined) {
    onChange(files, event as InputEvent);
  }
};

const handleFocus = (event: FocusEvent): void => {
  if (onFocus !== undefined) {
    onFocus(currentValue, event);
  }
};

const handleBlur = (event: FocusEvent): void => {
  if (onBlur !== undefined) {
    onBlur(currentValue, event);
  }
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
  {#if label !== undefined}
    <label for={randomId} class="ui-file-picker__label">
      {@html markdown(label)}
    </label>
  {/if}
  <div class="ui-file-picker__wrapper">
    {#if icon !== undefined && iconPosition === 'left'}
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
    {#if icon !== undefined && iconPosition === 'right'}
      <UIIcon name={icon} />
    {/if}
    <span class="ui-file-picker__wrapper__placeholder">
      {currentPlaceholder}
    </span>
  </div>
  {#if helper !== undefined}
    <span  class="ui-file-picker__helper">
      {@html markdown(helper)}
    </span>
  {/if}
</div>

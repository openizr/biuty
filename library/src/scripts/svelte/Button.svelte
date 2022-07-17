<!-- Button. -->
<script lang="ts">
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import UIIcon from 'scripts/svelte/Icon.svelte';
import buildClass from 'scripts/helpers/buildClass';

export let modifiers = '';
export let id: string | null = null;
export let icon: string | null = null;
export let label: string | null = null;
export let type: 'button' | 'submit' = 'button';
export let iconPosition: 'left' | 'right' = 'left';

// Enforces props default values.
$: id = id || null;
$: icon = icon || null;
$: label = label || null;
$: type = type || 'button';
$: modifiers = modifiers || '';
$: iconPosition = iconPosition || 'left';

$: iconModifier = icon !== null && label === null ? ' icon' : '';
$: className = buildClass('ui-button', `${modifiers}${iconModifier}`);
</script>

<button
  {id}
  {type}
  on:click
  on:focus
  class={className}
  tabIndex={modifiers?.includes('disabled') ? -1 : 0}
>
  {#if icon !== null && iconPosition === 'left'}
    <UIIcon name={icon} />
  {/if}
  {#if label !== null}
    <span class="ui-button__label">{label}</span>
  {/if}
  {#if icon !== null && iconPosition === 'right'}
    <UIIcon name={icon} />
  {/if}
</button>

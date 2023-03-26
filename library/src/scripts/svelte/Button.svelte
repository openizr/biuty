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
export let id: string | undefined = undefined;
export let icon: string | undefined = undefined;
export let label: string | undefined = undefined;
export let type: 'button' | 'submit' = 'button';
export let iconPosition: 'left' | 'right' = 'left';
export let onClick: ((event: MouseEvent) => void) | undefined = undefined;
export let onFocus: ((event: FocusEvent) => void) | undefined = undefined;

$: iconModifier = icon !== undefined && label === undefined ? ' icon' : '';
$: className = buildClass('ui-button', `${modifiers}${iconModifier}`);
</script>

<button
  {id}
  {type}
  class={className}
  on:click={onClick}
  on:focus={onFocus}
  tabIndex={modifiers.includes('disabled') ? -1 : 0}
>
  {#if icon !== undefined && iconPosition === 'left'}
    <UIIcon name={icon} />
  {/if}
  {#if label !== undefined}
    <span class="ui-button__label">{label}</span>
  {/if}
  {#if icon !== undefined && iconPosition === 'right'}
    <UIIcon name={icon} />
  {/if}
</button>

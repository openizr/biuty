<!-- Tooltip wrapper, for accessibility. -->
<script lang="ts">
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import buildClass from 'scripts/helpers/buildClass';

export let label: string;
export let modifiers = '';
export let id: string | undefined = undefined;
export let description: string | undefined = undefined;

let isDescriptionVisible = false;

const displayDescription = () => {
  isDescriptionVisible = true;
};

const hideDescription = () => {
  isDescriptionVisible = false;
};

$: className = buildClass('ui-tooltip', [modifiers, isDescriptionVisible ? 'described' : ''].join(' '));
</script>

<div
  {id}
  role="tooltip"
  class={className}
  aria-label={label}
  on:focus={displayDescription}
  on:focusout={hideDescription}
  on:keypress={displayDescription}
>
<slot></slot>
{#if isDescriptionVisible && description !== undefined}
  <span class="ui-tooltip__description" role="status">{description}</span>
{/if}
</div>
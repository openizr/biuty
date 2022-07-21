<!-- Title. -->
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

export let label: string;
export let modifiers = '';
export let id: string | null = null;
export let itemProp: string | null = null;
export let level: '1' | '2' | '3' | '4' | '5' | '6' = '1';

// Enforces props default values.
$: id = id || null;
$: level = level || '1';
$: itemProp = itemProp || null;
$: modifiers = modifiers || '';

$: parsedLabel = markdown(label);
$: fullModifiers = modifiers;
// Checks if any of the given modifiers corresponds to a valid level (1, 2, ...).
// By default, if no level is specified in modifiers, we set it to the `level` prop.
$: if (/(^|\s)([1-6])($|\s)/i.test(modifiers) === false) {
  fullModifiers = `${fullModifiers} ${level}`;
}
$: className = buildClass('ui-title', fullModifiers);
</script>

{#if level === '1'}
  <h1 {id} class={className} itemprop={itemProp}>
    {@html parsedLabel}
  </h1>
{:else if level === '2'}
  <h2 {id} class={className} itemprop={itemProp}>
    {@html parsedLabel}
  </h2>
{:else if level === '3'}
  <h3 {id} class={className} itemprop={itemProp}>
    {@html parsedLabel}
  </h3>
{:else if level === '4'}
  <h4 {id} class={className} itemprop={itemProp}>
    {@html parsedLabel}
  </h4>
{:else if level === '5'}
  <h5 {id} class={className} itemprop={itemProp}>
    {@html parsedLabel}
  </h5>
{:else}
  <h6 {id} class={className} itemprop={itemProp}>
    {@html parsedLabel}
  </h6>
{/if}

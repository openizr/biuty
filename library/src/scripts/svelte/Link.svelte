<!-- Hyperlink. -->
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

export let href: string;
export let label: string;
export let modifiers = '';
export let id: string | undefined = undefined;
export let rel: string | undefined = undefined;
export let target: string | undefined = undefined;

$: parsedLabel = markdown(label);
$: className = buildClass('ui-link', modifiers);
</script>

<a {id} {rel} {href} class={className} {target} on:click>
  {@html parsedLabel}
</a>

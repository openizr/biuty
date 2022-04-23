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
  export let id: string | null = null;
  export let rel: string | null = null;
  export let title: string | null = null;
  export let target: string | null = null;

  $: parsedLabel = markdown(label);
  $: className = buildClass('ui-title', modifiers);
</script>

<a {id} {rel} {href} {title} class={className} {target} on:click>
  {@html parsedLabel}
</a>

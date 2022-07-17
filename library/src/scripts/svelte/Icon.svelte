<!-- Basic icon. -->
<script lang="ts">
  /**
   * Copyright (c) Openizr. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  import buildClass from 'scripts/helpers/buildClass';

  export let name: string;
  export let modifiers = '';
  export let id: string | null = null;

  $: className = buildClass('ui-icon', `${name} ${modifiers}`);
</script>

<i
  id={id}
  class={className}
/>

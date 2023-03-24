<!-- Tooltips page. -->
<script lang="ts" setup>
  /**
   * Copyright (c) Openizr. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  import type { Locale } from 'basx/i18n';
  import { UIButton, UITooltip, UILink } from 'biuty/svelte';

export let locale: Locale;
</script>

<div class="vgap-5">
  <main class="grid cols-1 hgap-3 vgap-5">
    <a href="/" class="cols-l-3">GO BACK</a>
    {locale}
    <section class="grid cols-12">
      <UITooltip label="Hello World! This is a very very very very very very very very very very very very very very very very very long tooltip" modifiers="top">
        <UIButton icon="star" />
      </UITooltip>
      <UITooltip label="Hello World! This is a very very very very very very very very very very very very very very very very very long tooltip" modifiers="left">
        <UIButton icon="star" />
      </UITooltip>
      <UITooltip label="Hello World! This is a very very very very very very very very very very very very very very very very very long tooltip" modifiers="bottom">
        <UIButton icon="star" />
      </UITooltip>
      <UITooltip label="Hello World! This is a very very very very very very very very very very very very very very very very very long tooltip" modifiers="right">
        <UIButton icon="star" />
      </UITooltip>
      <UITooltip label="More info" description="This is a more detailled description.">
        <UIButton icon="star" />
      </UITooltip>
      <UITooltip label="More info" description="This is a more more detailled description." modifiers="right">
        <UIButton icon="star" />
      </UITooltip>
      <UITooltip label="This is a link" modifiers="right">
        <UILink href="https://test.com" label="Test" />
      </UITooltip>
    </section>
  </main>
</div>

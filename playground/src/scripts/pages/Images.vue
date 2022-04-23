<!-- Images page. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Locale } from 'basx/i18n';
import { UIImage } from 'biuty/vue';

defineProps<{
  locale: Locale;
}>();
</script>

<template>
  <div class="vgap-5">
    <main class="ui-page ui-block cols-3 hgap-3 vgap-5">
      <a
        href="/"
        class="cols-3"
      >GO BACK</a>
      <UIImage
        ratio="square"
        src="https://picsum.photos/200/600"
        alt="img"
      />
      <UIImage
        ratio="square"
        src="https://picsum.photos/300/300"
        alt="img"
      />
      <UIImage
        ratio="square"
        src="https://picsum.photos/600/200"
        alt="img"
      />
      <UIImage
        ratio="square"
        modifiers="large"
        src="https://picsum.photos/200/600"
        alt="img"
      />
      <UIImage
        ratio="square"
        modifiers="large"
        src="https://picsum.photos/300/300"
        alt="img"
      />
      <UIImage
        ratio="square"
        modifiers="large"
        src="https://picsum.photos/600/200"
        alt="img"
      />
      <UIImage
        ratio="square"
        modifiers="small"
        src="https://picsum.photos/200/600"
        alt="img"
      />
      <UIImage
        ratio="square"
        modifiers="small"
        src="https://picsum.photos/300/300"
        alt="img"
      />
      <UIImage
        ratio="square"
        modifiers="small"
        src="https://picsum.photos/600/200"
        alt="img"
      />
    </main>
  </div>
</template>

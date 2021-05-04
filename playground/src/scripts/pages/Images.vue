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

<script lang="ts">
/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Vue from 'vue';
import { Generic } from 'scripts/types';
import { UIImage } from 'sonar-ui/vue';

interface Props {
  translate: (label: string) => string;
}

/**
 * Images page.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'Images',
  components: {
    UIImage,
  },
  props: {
    translate: {
      type: Function,
      required: true,
    },
  },
});
</script>

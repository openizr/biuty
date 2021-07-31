<template>
  <!-- Custom aspect ratio... -->
  <img
    v-if="/^([0-9]+):([0-9]+)$/i.test(ratio) === true"
    :id="id"
    :src="src"
    :alt="alt"
    loading="lazy"
    :class="className"
    :width="dimensions.width"
    :height="dimensions.height"
    :itemprop="itemProp"
  >
  <!-- Standard aspect ratio... -->
  <div
    v-else
    :class="className"
  >
    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      :itemprop="itemProp"
      :width="dimensions.width"
      :height="dimensions.height"
    >
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
import { Generic } from 'scripts/vue/types';
import buildClass from 'scripts/helpers/buildClass';

interface Props {
  src: string;
  alt: string;
  ratio: string;
  id: string | null;
  modifiers: string;
  itemProp: string | null;
}

/**
 * Image.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UIImage',
  props: {
    id: {
      type: String,
      default: null,
      required: false,
    },
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    ratio: {
      type: String,
      required: true,
    },
    itemProp: {
      type: String,
      default: null,
      required: false,
    },
    modifiers: {
      type: String,
      default: '',
      required: false,
    },
  },
  computed: {
    className(): string {
      return buildClass('ui-image', `${this.ratio.replace(':', 'x')} ${this.modifiers}`.split(' '));
    },
    dimensions(): { width: number; height: number; } {
      let dimensions;
      switch (this.ratio) {
        case 'square':
          return { width: 1, height: 1 };
        case 'portrait':
          return { width: 2, height: 3 };
        case 'landscape':
          return { width: 3, height: 2 };
        case 'panoramic':
          return { width: 16, height: 9 };
        default:
          dimensions = this.ratio.split(':').map((value) => parseInt(value, 10));
          return { width: dimensions[0], height: dimensions[1] };
      }
    },
  },
});
</script>

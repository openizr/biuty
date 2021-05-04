<template>
  <!-- eslint-disable vue/no-v-html -->
  <p
    :id="id"
    :class="className"
    :itemprop="itemProp"
    v-html="parsedLabel"
  />
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
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';

interface Props {
  id: string;
  label: string;
  itemProp: string;
  modifiers: string;
}

/**
 * Paragraph.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UIP',
  props: {
    id: {
      type: String,
      default: null,
      required: false,
    },
    itemProp: {
      type: String,
      default: null,
      required: false,
    },
    label: {
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
      return buildClass('ui-p', this.modifiers.split(' '));
    },
    parsedLabel(): string {
      return markdown(this.label);
    },
  },
});
</script>

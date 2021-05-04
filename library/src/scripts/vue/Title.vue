<template>
  <!-- eslint-disable vue/no-v-html -->
  <component
    :is="`h${level}`"
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
  level: string;
  id: string | null;
  modifiers: string;
  label: string | null;
  itemProp: string | null;
}

/**
 * Title.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UITitle',
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
    level: {
      validator: (value) => ['1', '2', '3', '4', '5', '6'].includes(value),
      default: '1',
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
      let { modifiers } = this;
      // Checks if any of the given modifiers corresponds to a valid level (1, 2, ...).
      // By default, if no level is specified in modifiers, we set it to the `level` prop.
      if (/(^|\s)([1-6])($|\s)/i.test(modifiers) === false) {
        modifiers = `${modifiers} ${this.level}`;
      }
      return buildClass('ui-title', modifiers.split(' '));
    },
    parsedLabel(): string {
      return markdown(this.label || '');
    },
  },
});
</script>

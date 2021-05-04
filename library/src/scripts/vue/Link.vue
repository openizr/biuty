<template>
  <!-- eslint-disable vue/no-v-html -->
  <a
    :id="id"
    :rel="rel"
    :href="href"
    :title="title"
    :class="className"
    :target="target"
    v-on="(onClick !== undefined) ? { click: onClick } : {}"
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
  rel: string;
  href: string;
  title: string;
  label: string;
  target: string;
  modifiers: string;
  onClick: () => void;
}

/**
 * Link.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UILink',
  props: {
    id: {
      type: String,
      default: null,
      required: false,
    },
    href: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
      required: false,
    },
    rel: {
      type: String,
      default: null,
      required: false,
    },
    target: {
      type: String,
      default: null,
      required: false,
    },
    label: {
      type: String,
      default: null,
      required: false,
    },
    onClick: {
      type: Function,
      default: undefined,
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
      return buildClass('ui-link', this.modifiers.split(' '));
    },
    parsedLabel(): string {
      return markdown(this.label);
    },
  },
});
</script>

<!-- Hyperlink. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable vue/no-v-html */

import { computed } from 'vue';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';

const props = defineProps<{
  id?: string;
  rel?: string;
  href: string;
  label: string;
  target?: string;
  modifiers?: string;
}>();

const parsedLabel = computed(() => markdown(props.label));
const className = computed(() => buildClass('ui-link', props.modifiers));
</script>

<template>
  <a
    :id="id"
    :rel="rel"
    :href="href"
    :class="className"
    :target="target"
    v-html="parsedLabel"
  />
</template>

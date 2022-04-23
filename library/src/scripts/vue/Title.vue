<!-- Title. -->
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
  label: string;
  itemProp?: string;
  modifiers?: string;
  level?: '1' | '2' | '3' | '4' | '5' | '6';
}>();

const parsedLabel = computed(() => markdown(props.label));
const className = computed(() => {
  let modifiers = props.modifiers || '';
  // Checks if any of the given modifiers corresponds to a valid level (1, 2, ...).
  // By default, if no level is specified in modifiers, we set it to the `level` prop.
  if (/(^|\s)([1-6])($|\s)/i.test(modifiers) === false) {
    modifiers = `${modifiers} ${props.level || '1'}`;
  }
  return buildClass('ui-title', modifiers);
});
</script>

<template>
  <component
    :is="`h${level || '1'}`"
    :id="id"
    :class="className"
    :itemprop="itemProp"
    v-html="parsedLabel"
  />
</template>

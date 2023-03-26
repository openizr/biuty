<!-- Title. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { computed } from 'vue';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';

const props = withDefaults(defineProps<{
  /** `id` HTML attribute to set to the element. */
  id?: string;

  /** Heading's content. Supports biuty light markdown. */
  label: string;

  /** `itemprop` HTML attribute to set to the element. */
  itemProp?: string;

  /** List of modifiers to apply to the element. Defaults to `""`. */
  modifiers?: string;

  /** Heading HTML level (1 to 6). This will determine which HTML tag to use. Defaults to "1". */
  level?: '1' | '2' | '3' | '4' | '5' | '6';
}>(), {
  level: '1',
  modifiers: '',
  id: undefined,
  itemProp: undefined,
});

const parsedLabel = computed(() => markdown(props.label));
const className = computed(() => {
  let fullModifiers = props.modifiers;
  // Checks if any of the given modifiers corresponds to a valid level (1, 2, ...).
  // By default, if no level is specified in modifiers, we set it to the `level` prop.
  if (/(^|\s)([1-6])($|\s)/i.test(props.modifiers) === false) {
    fullModifiers = `${props.modifiers} ${props.level}`;
  }
  return buildClass('ui-title', fullModifiers);
});
</script>

<template>
  <component
    :is="`h${level}`"
    :id="id"
    :class="className"
    :itemprop="itemProp"
    v-html="parsedLabel"
  />
</template>

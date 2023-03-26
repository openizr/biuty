<!-- Hyperlink. -->
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

type ClickEventHandler = (event: MouseEvent) => void;

const props = withDefaults(defineProps<{
  id?: string;
  label: string;
  rel?: string;
  target?: string;
  href: string;
  modifiers?: string;
  onClick?: ClickEventHandler;
}>(), {
  modifiers: '',
  id: undefined,
  rel: undefined,
  target: undefined,
  onClick: undefined,
});

const className = computed(() => buildClass('ui-link', props.modifiers));
</script>

<template>
  <a
    :id="id"
    :rel="rel"
    :href="href"
    :class="className"
    :target="target"
    @click="onClick"
    v-html="markdown(props.label)"
  />
</template>

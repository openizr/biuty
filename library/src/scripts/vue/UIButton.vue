<!-- Button. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { computed } from 'vue';
import UIIcon from 'scripts/vue/UIIcon.vue';
import buildClass from 'scripts/helpers/buildClass';

type EventHandler = (event: MouseEvent) => void;

const props = withDefaults(defineProps<{
  id?: string;
  label?: string;
  icon?: string;
  type?: 'button' | 'submit';
  iconPosition?: 'left' | 'right';
  modifiers?: string;
  onClick?: EventHandler;
  onFocus?: EventHandler;
}>(), {
  modifiers: '',
  id: undefined,
  icon: undefined,
  type: 'button',
  label: undefined,
  onClick: undefined,
  onFocus: undefined,
  iconPosition: 'left',
});

const className = computed(() => buildClass('ui-button', `${props.modifiers}${(props.icon !== undefined && props.label === undefined) ? ' icon' : ''}`));
</script>

<template>
  <button
    :id="id"
    :type="type"
    :class="className"
    :tabIndex="(modifiers.includes('disabled') ? -1 : 0)"
    @click="props.onClick"
    @focus="props.onFocus"
  >
    <UIIcon
      v-if="icon !== undefined && iconPosition === 'left'"
      :name="icon"
    />
    <span
      v-if="(label !== undefined)"
      class="ui-button__label"
    >{{ label }}</span>
    <UIIcon
      v-if="icon !== undefined && iconPosition === 'right'"
      :name="icon"
    />
  </button>
</template>

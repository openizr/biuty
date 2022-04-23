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
import UIIcon from 'scripts/vue/Icon.vue';
import buildClass from 'scripts/helpers/buildClass';

const props = defineProps<{
  id?: string;
  icon?: string;
  label?: string;
  modifiers?: string;
  type?: 'button' | 'submit';
  iconPosition?: 'left' | 'right';
}>();

const className = computed(() => buildClass('ui-button', `${props.modifiers || ''}${(props.icon !== undefined && props.label === undefined) ? ' icon' : ''}`));
</script>

<template>
  <button
    :id="id"
    :class="className"
    :type="type || 'button'"
    :tabIndex="(modifiers?.includes('disabled') ? -1 : 0)"
  >
    <UIIcon
      v-if="icon !== undefined && iconPosition !== 'right'"
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

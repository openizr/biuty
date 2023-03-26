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

const props = withDefaults(defineProps<{
  /** `id` HTML attribute to set to the element. */
  id?: string;

  /** Button's content. */
  label?: string;

  /** Name of the icon to set to the element. */
  icon?: string;

  /** `type` HTML attribute to set to the element. Defaults to "button". */
  type?: 'button' | 'submit';

  /** Position of the icon relatively to the label. Defaults to "left". */
  iconPosition?: 'left' | 'right';

  /** List of modifiers to apply to the element. Defaults to `""`. */
  modifiers?: string;
}>(), {
  modifiers: '',
  id: undefined,
  icon: undefined,
  type: 'button',
  label: undefined,
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

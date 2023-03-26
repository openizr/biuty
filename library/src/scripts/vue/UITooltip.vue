<!-- Tooltip wrapper, for accessibility. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { computed, ref } from 'vue';
import buildClass from 'scripts/helpers/buildClass';

const props = withDefaults(defineProps<{
  /** `id` HTML attribute to set to the element. */
  id?: string;

  /** `aria-label` HTML attribute to set to the element. */
  label?: string;

  /**
   * Description to display instead of the label (toggletip mode). In this mode, the label prop
   * will still be displayed on hover/focus, but this time, as soon as the user clicks or presses
   * a key on the tooltip children, label will be replaced by the description prop.
   * See https://inclusive-components.design/tooltips-toggletips/
   */
  description?: string;

  /** List of modifiers to apply to the element. Defaults to `"top"`. */
  modifiers?: string;
}>(), {
  modifiers: '',
  id: undefined,
  label: undefined,
  description: undefined,
});

const isDescriptionVisible = ref(false);

const displayDescription = () => {
  isDescriptionVisible.value = true;
};

const hideDescription = () => {
  isDescriptionVisible.value = false;
};

const className = computed(() => buildClass('ui-tooltip', [props.modifiers, isDescriptionVisible.value ? 'described' : ''].join(' ')));
</script>

<template>
  <div
    :id="id"
    role="tooltip"
    :class="className"
    :aria-label="label"
    @focus="displayDescription"
    @focusout="hideDescription"
    @keypress="displayDescription"
  >
    <slot />
    <span
      v-if="isDescriptionVisible && description !== undefined"
      class="ui-tooltip__description"
      role="status"
    >{{ description }}</span>
  </div>
</template>

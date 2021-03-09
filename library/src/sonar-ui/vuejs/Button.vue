<template>
  <button
    :id="id"
    type="button"
    :class="classes.join(' ')"
    :tabIndex="(modifiers.includes('disabled') ? -1 : 0)"
    v-on="(onClick !== undefined) ? { click: onClick } : {}"
  >
    <i
      v-if="icon !== null && iconPosition === 'left'"
      class="ui-button__icon"
    >{{ icon }}</i>
    <span
      v-if="(label !== null)"
      class="ui-button__label"
    >{{ label }}</span>
    <i
      v-if="icon !== null && iconPosition === 'right'"
      class="ui-button__icon"
    >{{ icon }}</i>
  </button>
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

interface Props {
  id: string | null;
  modifiers: string;
  icon: string | null;
  label: string | null;
  iconPosition: 'left' | 'right',
  onClick: () => void | undefined;
}

type Generic = Record<string, unknown>;

/**
 * Button.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UIButton',
  props: {
    id: {
      type: String,
      default: null,
      required: false,
    },
    icon: {
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
      default: 'contained',
      required: false,
    },
    iconPosition: {
      validator: (value) => value === 'left' || value === 'right',
      default: 'left',
      required: false,
    },
  },
  computed: {
    classes(): string[] {
      const buildModifier = (modifier: string): string => `ui-button--${modifier}`;
      return ['ui-button'].concat(this.modifiers.split(' ').map(buildModifier));
    },
  },
});
</script>

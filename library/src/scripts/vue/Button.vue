<template>
  <button
    :id="id"
    :type="type"
    :class="`${className}${(icon !== null && label === null) ? ' ui-button--icon' : ''}`"
    :tabIndex="(modifiers.includes('disabled') ? -1 : 0)"
    @click="clickButton"
    @focus="focusButton"
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
import { Generic } from 'scripts/types';
import buildClass from 'scripts/helpers/buildClass';

interface Props {
  id: string | null;
  modifiers: string;
  icon: string | null;
  label: string | null;
  type: 'button' | 'submit';
  iconPosition: 'left' | 'right';
}

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
    type: {
      validator: (value) => value === 'button' || value === 'submit',
      default: 'button',
      required: false,
    },
    modifiers: {
      type: String,
      default: '',
      required: false,
    },
    iconPosition: {
      validator: (value) => value === 'left' || value === 'right',
      default: 'left',
      required: false,
    },
  },
  computed: {
    className(): string {
      return buildClass('ui-button', this.modifiers.split(' '));
    },
  },
  methods: {
    clickButton(): void {
      this.$emit('click');
    },
    focusButton(): void {
      this.$emit('focus');
    },
  },
});
</script>

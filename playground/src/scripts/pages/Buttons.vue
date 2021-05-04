<template>
  <div class="vgap-5">
    <main class="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
      <a
        href="/"
        class="cols-l-3"
      >GO BACK</a>
      <UIButton label="ui-button" />
      <UIButton
        label="ui-button icon left"
        icon="star"
      />
      <UIButton
        label="ui-button icon right"
        icon="star"
        icon-position="right"
      />
      <UIButton
        label="ui-button disabled"
        modifiers="disabled"
      />
      <UIButton
        label="ui-button with listener"
        @click="onClick"
      />
      <UIButton
        label="ui-button with type submit"
        type="submit"
      />
      <UIButton
        label="ui-button with focus listener"
        @focus="onFocus"
      />
    </main>
  </div>
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
import { UIButton } from 'sonar-ui/vue';

interface Props {
  translate: (label: string) => string;
}

/**
 * Buttons page.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'Buttons',
  components: {
    UIButton,
  },
  props: {
    translate: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onClick(): void {
      console.log('Clicked!'); // eslint-disable-line no-console
    },
    onFocus(): void {
      console.log('Focused!'); // eslint-disable-line no-console
    },
  },
});
</script>

<!-- Buttons page. -->

<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Locale } from 'basx/i18n';
import { UIButton } from 'biuty/vue';

defineProps<{
  locale: Locale;
}>();

const { log } = console;

const onClick = (): void => {
  log('Clicked!');
};
const onFocus = (): void => {
  log('Focused!');
};
</script>

<template>
  <div class="vgap-5">
    <main class="grid cols-1 hgap-3 vgap-5">
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

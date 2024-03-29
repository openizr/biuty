<!-- Textfields page. -->

<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Locale } from 'basx/i18n';
import { ref, onMounted } from 'vue';
import { UITextfield } from 'biuty/vue';

defineProps<{
  locale: Locale;
}>();

const newValue = ref('test');

onMounted(() => {
  setTimeout(() => {
    newValue.value = 'new test';
  }, 3000);
});

const { log } = console;

const onChange = (value: string, event: Event): void => {
  log('Changed!', value, event);
};

const onBlur = (value: string, event: Event): void => {
  log('Blurred!', value, event);
};

const onFocus = (value: string, event: Event): void => {
  log('Focused!', value, event);
};

const onIconClick = (value: string, event: Event): void => {
  log('Clicked!', value, event);
};

const onKeyDown = (value: string, event: Event): void => {
  log('Key down!', value, event);
};

const transform = (value: string): [string] => {
  if (value.length >= 7) {
    return [`(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`];
  }
  if (value.length >= 4) {
    return [`(${value.slice(0, 3)}) ${value.slice(3)}`];
  }
  return [value];
};
</script>

<template>
  <div class="vgap-5">
    <main class="grid cols-1 hgap-3 vgap-5">
      <a
        href="/"
        class="cols-l-3"
      >GO BACK</a>
      <UITextfield name="textfield1" />
      <UITextfield
        name="textfield2"
        label="*ui-textfield*"
      />
      <UITextfield
        name="textfield3"
        label="ui-textfield readonly"
        readonly
      />
      <UITextfield
        name="textfield3"
        label="ui-textfield with autofocus"
        autofocus
      />
      <UITextfield
        name="textfield4"
        label="ui-textfield with value"
        :value="newValue"
      />
      <UITextfield
        name="textfield5"
        label="ui-textfield with helper"
        helper="helper"
      />
      <UITextfield
        name="textfield6"
        label="ui-textfield with listener"
        @change="onChange"
      />
      <UITextfield
        name="textfield7"
        label="ui-textfield with blur listener"
        @blur="onBlur"
      />
      <UITextfield
        name="textfield8"
        label="ui-textfield with maxlength"
        :maxlength="10"
      />
      <UITextfield
        name="textfield9"
        label="ui-textfield with placeholder"
        placeholder="placeholder"
      />
      <UITextfield
        name="textfield10"
        label="ui-textfield with password type"
        type="password"
        :size="10"
      />
      <UITextfield
        name="textfield11"
        label="ui-textfield disabled"
        modifiers="disabled"
      />
      <UITextfield
        name="textfield12"
        label="ui-textfield icon left"
        icon="star"
      />
      <UITextfield
        name="textfield13"
        label="ui-textfield icon right"
        icon="star"
        icon-position="right"
      />
      <UITextfield
        name="textfield14"
        label="ui-textfield icon with listener"
        icon="star"
        @icon-click="onIconClick"
        @icon-key-down="onKeyDown"
      />
      <UITextfield
        name="textfield15"
        label="ui-textfield with focus listener"
        @focus="onFocus"
      />
      <UITextfield
        name="textfield16"
        label="ui-textfield with transform"
        :allowed-pattern="/[0-9]/i"
        :transform="transform"
        :maxlength="14"
      />
      <UITextfield
        name="textfield17"
        label="ui-textfield with debounce"
        :debounce-timeout="250"
        @change="onChange"
      />
      <UITextfield
        name="textfield18"
        label="ui-textfield with type number"
        type="number"
        :min="0"
        :max="30"
        :step="5"
      />
      <UITextfield
        name="textfield18"
        label="ui-textfield with type onKeyDown"
        :allowed-keys="{ default: /[0-9()-]| / }"
        :maxlength="14"
        :transform="(value, start) => {
          const stripedValue = value.replace(/(\(|\)|-| )/ig, '');
          const { length } = stripedValue;
          if (length >= 7) {
            let e;
            if (!(length === 7 && !/-/.test(value)) && start !== 10) {
              e = start;
            }
            return [`(${stripedValue.slice(0, 3)}) ${stripedValue
              .slice(3, 6)}-${stripedValue.slice(6, 10)}`, e];
          }
          if (length >= 4) {
            return [`(${stripedValue.slice(0, 3)}) ${stripedValue.slice(3)}`, start];
          }
          if (length >= 3 && value.length < 4) {
            return [`(${stripedValue.slice(0, 3)}) `, 6];
          }
          return [stripedValue, start];
        }"
        @key-down="onKeyDown"
        @change="onChange"
      />
    </main>
  </div>
</template>

<!-- Textareas page. -->

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
import { UITextarea } from 'biuty/vue';

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

const onChange = (value: string): void => {
  log('Changed!', value);
};

const onBlur = (value: string): void => {
  log('Blurred!', value);
};

const onFocus = (): void => {
  log('Focused!');
};
</script>

<template>
  <div className="vgap-5">
    <main className="grid cols-1 hgap-3 vgap-5">
      <a
        href="/"
        className="cols-l-3"
      >GO BACK</a>
      <UITextarea name="textarea1" />
      <UITextarea
        name="textarea2"
        label="*ui-textarea*"
      />
      <UITextarea
        name="textarea3"
        label="ui-textarea readonly"
        readonly
      />
      <UITextarea
        name="textarea4"
        label="ui-textarea with autofocus"
        autofocus
      />
      <UITextarea
        name="textarea5"
        label="ui-textarea with value"
        :value="newValue"
      />
      <UITextarea
        name="textarea6"
        label="ui-textarea with helper"
        helper="helper"
      />
      <UITextarea
        name="textarea7"
        label="ui-textarea with listener"
        @change="onChange"
      />
      <UITextarea
        name="textarea8"
        label="ui-textarea with debounce"
        :debounce-timeout="250"
        @change="onChange"
      />
      <UITextarea
        name="textarea9"
        label="ui-textarea with blur listener"
        @blur="onBlur"
      />
      <UITextarea
        name="textarea10"
        label="ui-textarea with maxlength"
        :maxlength="10"
      />
      <UITextarea
        name="textarea11"
        label="ui-textarea with placeholder"
        placeholder="placeholder"
      />
      <UITextarea
        name="textarea12"
        label="ui-textarea with rows and cols"
        :rows="10"
        :cols="10"
      />
      <UITextarea
        name="textarea13"
        label="ui-textarea disabled"
        modifiers="disabled"
      />
      <UITextarea
        name="textarea14"
        label="ui-textarea with autoresize"
        autoresize
      />
      <UITextarea
        name="textarea15"
        label="ui-textarea with focus listener"
        @focus="onFocus"
      />
    </main>
  </div>
</template>

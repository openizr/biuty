<template>
  <div className="vgap-5">
    <main className="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
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
        label="ui-textarea with value"
        :value="newValue"
      />
      <UITextarea
        name="textarea5"
        label="ui-textarea with helper"
        helper="helper"
      />
      <UITextarea
        name="textarea15"
        label="ui-textarea with transform"
        :transform="(value) => value.toUpperCase()"
      />
      <UITextarea
        name="textarea6"
        label="ui-textarea with listener"
        @change="onChange"
      />
      <UITextarea
        name="textarea16"
        label="ui-textarea with debounce"
        :debounce-timeout="250"
        @change="onChange"
      />
      <UITextarea
        name="textarea7"
        label="ui-textarea with blur listener"
        @blur="onBlur"
      />
      <UITextarea
        name="textarea8"
        label="ui-textarea with maxlength"
        :maxlength="10"
      />
      <UITextarea
        name="textarea9"
        label="ui-textarea with placeholder"
        placeholder="placeholder"
      />
      <UITextarea
        name="textarea10"
        label="ui-textarea with rows and cols"
        :rows="10"
        :cols="10"
      />
      <UITextarea
        name="textarea11"
        label="ui-textarea disabled"
        modifiers="disabled"
      />
      <UITextarea
        name="textarea12"
        label="ui-textarea with focus listener"
        @focus="onFocus"
      />
      <UITextarea
        name="textarea13"
        label="ui-textarea with paste listener"
        @paste="onPaste"
      />
      <UITextarea
        name="textarea14"
        label="ui-textarea with keyDown listener"
        @keyDown="onKeyDown"
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
import { UITextarea } from 'sonar-ui/vue';

interface Props {
  translate: (label: string) => string;
}

/**
 * Textareas page.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'Textareas',
  components: {
    UITextarea,
  },
  props: {
    translate: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      newValue: 'test',
    };
  },
  mounted() {
    setTimeout(() => {
      this.newValue = 'new test';
    }, 3000);
  },
  methods: {
    onChange(value: string): void {
      console.log('Changed!', value); // eslint-disable-line no-console
    },
    onBlur(value: string): void {
      console.log('Blurred!', value); // eslint-disable-line no-console
    },
    onFocus(): void {
      console.log('Focused!'); // eslint-disable-line no-console
    },
    onPaste(): void {
      console.log('Pasted!'); // eslint-disable-line no-console
    },
    onKeyDown(): void {
      console.log('Keyed down!'); // eslint-disable-line no-console
    },
  },
});
</script>

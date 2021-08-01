<template>
  <div class="vgap-5">
    <main class="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
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
        @iconClick="onIconClick"
      />
      <UITextfield
        name="textfield15"
        label="ui-textfield with focus listener"
        @focus="onFocus"
      />
      <UITextfield
        name="textfield16"
        label="ui-textfield with transform"
        :transform="(value) => value.toUpperCase()"
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
        min="0"
        max="30"
        step="5"
      />
      <UITextfield
        name="textfield19"
        label="ui-textfield with paste listener"
        @paste="onPaste"
      />
      <UITextfield
        name="textfield20"
        label="ui-textfield with keyDown listener"
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
import { UITextfield } from 'sonar-ui/vue';

interface Props {
  translate: (label: string) => string;
}

/**
 * Textfields page.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'Textfields',
  components: {
    UITextfield,
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
    onIconClick(): void {
      console.log('Clicked!'); // eslint-disable-line no-console
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

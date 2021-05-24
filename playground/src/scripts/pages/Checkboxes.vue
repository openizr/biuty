<template>
  <div class="vgap-5">
    <main class="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
      <a
        href="/"
        class="cols-l-3"
      >GO BACK</a>
      <UICheckbox
        name="checkbox1"
        :options="options"
      />
      <UICheckbox
        name="checkbox2"
        :options="options"
        label="*ui-checkbox*"
      />
      <UICheckbox
        name="checkbox3"
        :options="options"
        label="ui-checkbox with value"
        :value="newValue"
      />
      <UICheckbox
        name="checkbox4"
        :options="options"
        label="ui-checkbox with helper"
        helper="helper"
      />
      <UICheckbox
        name="checkbox5"
        :options="options"
        label="ui-checkbox with listener"
        @change="onChange"
      />
      <UICheckbox
        name="checkbox6"
        :options="options"
        label="ui-checkbox disabled"
        modifiers="disabled"
      />
      <UICheckbox
        name="checkbox7"
        :options="options"
        label="ui-checkbox with focus listener"
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
import { UICheckbox } from 'sonar-ui/vue';

interface Props {
  translate: (label: string) => string;
}

/**
 * Checkboxes page.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'Checkboxes',
  components: {
    UICheckbox,
  },
  props: {
    translate: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      newValue: ['option1'],
      options: [
        {
          label: '*Option* _1_',
          value: 'option1',
        },
        {
          label: 'Option 2',
          value: 'option2',
        },
        {
          label: 'Option 3',
          value: 'option3',
        },
        {
          label: 'Option 4',
          value: 'option4',
          disabled: true,
        },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.newValue = ['option2', 'option4'];
    }, 3000);
  },
  methods: {
    onChange(value: string[]): void {
      console.log('Changed!', value); // eslint-disable-line no-console
    },
    onFocus(value: string): void {
      console.log('Focused!', value); // eslint-disable-line no-console
    },
  },
});
</script>

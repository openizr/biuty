<template>
  <div className="vgap-5">
    <main className="ui-page ui-block cols-12 cols-l-12 hgap-3 vgap-5">
      <a
        href="/"
        className="cols-12 cols-l-12"
      >GO BACK</a>
      <UIDropdown
        name="dropdown1"
        :options="options"
        :value="['option1']"
        label="*UIDropdown*"
        @change="onChange"
      />
      <!-- <UIDropdown
        name="dropdown2"
        :options="options"
        :value="['option1']"
        label="UIDropdown disabled"
      />
      <UIDropdown
        name="dropdown3"
        :options="options2"
        :value="['option1']"
        label="UIDropdown large"
      />
      <UIDropdown
        name="dropdown4"
        :options="options"
        :value="newValue"
        label="UIDropdown large disabled"
      />
      <UIDropdown
        name="dropdown5"
        :options="options"
        :value="['option1']"
        label="UIDropdown with focus listener"
        @focus="onFocus"
      /> -->
      <UIDropdown
        name="dropdown1"
        icon="star"
        :options="options"
        :value="['option1']"
        label="UIDropdown"
        @change="onChange"
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
import { UIDropdown } from 'sonar-ui/vue';

interface Props {
  translate: (label: string) => string;
}

/**
 * Dropdowns page.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'Dropdowns',
  components: {
    UIDropdown,
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
          label: '*Group 1*',
          type: 'header',
        },
        {
          label: 'Option 1',
          value: 'option1',
          disabled: false,
          type: 'option',
        },
        {
          label: 'Option 2',
          value: 'option2',
          disabled: true,
          type: 'option',
        },
        {
          type: 'divider',
        },
        {
          label: 'Option 4',
          value: 'option4',
          disabled: false,
          type: 'option',
        },
        {
          label: 'Option 5',
          value: 'option5',
          disabled: false,
          type: 'option',
        },
        {
          label: 'Option 6',
          value: 'option6',
          disabled: false,
          type: 'option',
        },
      ],
      options2: [
        {
          label: 'Option 1',
          value: 'option1',
          disabled: false,
          type: 'option',
        },
        {
          label: 'Option 2',
          value: 'option2',
          disabled: false,
          type: 'option',
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

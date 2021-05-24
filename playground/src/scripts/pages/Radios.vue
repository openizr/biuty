<template>
  <div class="vgap-5">
    <main class="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
      <a
        href="/"
        class="cols-l-3"
      >GO BACK</a>
      <UIRadio
        name="radio1"
        value="option3"
        :options="options"
      />
      <UIRadio
        name="radio2"
        value="option3"
        label="*ui-radio*"
        :options="options"
      />
      <UIRadio
        name="radio3"
        :value="newValue"
        label="ui-radio with value"
        :options="options"
      />
      <UIRadio
        name="radio4"
        value="option3"
        label="ui-radio with helper"
        helper="helper"
        :options="options"
      />
      <UIRadio
        name="radio5"
        value="option3"
        label="ui-radio with listener"
        :options="options"
        @change="onChange"
      />
      <UIRadio
        name="radio6"
        value="option3"
        label="ui-radio disabled"
        modifiers="disabled"
        :options="options"
      />
      <UIRadio
        name="radio7"
        value="option3"
        label="ui-radio with focus listener"
        :options="options"
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
import { UIRadio } from 'sonar-ui/vue';

interface Props {
  translate: (label: string) => string;
}

/**
 * Radios page.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'Radios',
  components: {
    UIRadio,
  },
  props: {
    translate: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      newValue: 'option3',
      options: [
        {
          label: '*Option 1*',
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
      this.newValue = 'option1';
    }, 3000);
  },
  methods: {
    onChange(value: string): void {
      console.log('Changed!', value); // eslint-disable-line no-console
    },
    onFocus(value: string): void {
      console.log('Focused!', value); // eslint-disable-line no-console
    },
  },
});
</script>

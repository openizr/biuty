<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== null"
      class="ui-file-uploader__label"
      :for="randomId"
      v-html="markdown(label)"
    />
    <i
      v-if="icon !== null && iconPosition === 'left'"
      class="ui-button__icon"
    >{{ icon }}</i>
    <input
      :id="randomId"
      type="file"
      :name="name"
      :multiple="multiple"
      class="ui-file-uploader__field"
      @focus="focusField"
      @change="changeField"
    >
    <i
      v-if="icon !== null && iconPosition === 'right'"
      class="ui-button__icon"
    >{{ icon }}</i>
    <span class="ui-file-uploader__files-list">
      {{ (currentValue.length === 0) ? placeholder : currentValue.join(', ') }}
    </span>
    <p
      v-if="helper !== null"
      class="ui-file-uploader__helper"
    >
      {{ helper }}
    </p>
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
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

interface Props {
  id: string;
  name: string;
  icon: string;
  label: string;
  helper: string;
  modifiers: string;
  multiple: boolean;
  placeholder: string;
  iconPosition: 'left' | 'right';
}

/**
 * File uploader.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'UIFileUploader',
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
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: null,
      required: false,
    },
    helper: {
      type: String,
      default: null,
      required: false,
    },
    placeholder: {
      type: String,
      default: null,
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
    multiple: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      randomId: generateRandomId(),
      currentValue: [],
    };
  },
  computed: {
    className(): string {
      return buildClass('ui-file-uploader', this.modifiers.split(' '));
    },
  },
  methods: {
    changeField(event: Event): void {
      const files = [];
      const numberOfFiles = ((event.target as HTMLInputElement).files?.length || 0);
      for (let index = 0; index < numberOfFiles; index += 1) {
        files.push(((event.target as HTMLInputElement).files as FileList)[index]);
      }
      this.currentValue = files.map((file) => file.name);
      this.$emit('change', files);
    },
    focusField(): void {
      this.$emit('focus', this.currentValue);
    },
    markdown(label: string): string {
      return markdown(label);
    },
  },
});
</script>

<!-- File picker. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ref, computed, watch } from 'vue';
import UIIcon from 'scripts/vue/UIIcon.vue';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

type FocusEventHandler = (event: FocusEvent) => void;
type ChangeEventHandler = (value: File[], event: InputEvent) => void;

const props = withDefaults(defineProps<{
  id?: string;
  name: string;
  accept?: string;
  icon?: string;
  multiple?: boolean;
  iconPosition?: 'left' | 'right';
  value?: File[];
  label?: string;
  helper?: string;
  modifiers?: string;
  placeholder?: string;
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
  onChange?: ChangeEventHandler;
}>(), {
  modifiers: '',
  id: undefined,
  icon: undefined,
  label: undefined,
  accept: undefined,
  helper: undefined,
  iconPosition: 'left',
  value: [] as undefined,
  placeholder: undefined,
  onBlur: undefined,
  onFocus: undefined,
  onChange: undefined,
});

const randomId = ref(generateRandomId());
const currentValue = ref(props.value);
const className = computed(() => buildClass('ui-file-picker', `${props.modifiers} ${props.multiple ? ' multiple' : ''}`));
const currentPlaceholder = computed(() => ((currentValue.value.length > 0)
  ? currentValue.value.map((file) => file.name).join(', ')
  : props.placeholder));

// -------------------------------------------------------------------------------------------------
// CALLBACKS DECLARATION.
// -------------------------------------------------------------------------------------------------

const handleChange = (event: InputEvent): void => {
  const files = [];
  const target = event.target as HTMLInputElement;
  const numberOfFiles = target.files.length;
  for (let index = 0; index < numberOfFiles; index += 1) {
    files.push(target.files[index]);
  }
  currentValue.value = files;
  if (props.onChange !== undefined) {
    props.onChange(currentValue.value, event);
  }
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates current value whenever `value` prop changes.
watch(() => props.value, () => {
  currentValue.value = props.value;
});
</script>

<template>
  <div
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== undefined"
      :for="randomId"
      class="ui-file-picker__label"
      v-html="markdown(props.label)"
    />
    <div class="ui-file-picker__wrapper">
      <UIIcon
        v-if="icon !== undefined && iconPosition !== 'right'"
        :name="icon"
      />
      <input
        :id="randomId"
        type="file"
        :name="name"
        :accept="accept"
        :multiple="multiple"
        class="ui-file-picker__wrapper__field"
        :tabindex="modifiers.includes('disabled') ? -1 : 0"
        @change="handleChange"
        @blur="onBlur !== undefined && onBlur(currentValue, $event)"
        @focus="onFocus !== undefined && onFocus(currentValue, $event)"
      >
      <UIIcon
        v-if="icon !== undefined && iconPosition === 'right'"
        :name="icon"
      />
      <span class="ui-file-picker__wrapper__placeholder">
        {{ currentPlaceholder }}
      </span>
    </div>
    <span
      v-if="helper !== undefined"
      class="ui-file-picker__helper"
      v-html="markdown(props.helper)"
    />
  </div>
</template>

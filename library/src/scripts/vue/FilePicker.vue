<!-- File picker. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable vue/no-v-html */

import UIIcon from 'scripts/vue/Icon.vue';
import { ref, computed, watch } from 'vue';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

const emit = defineEmits({
  focus: null,
  blur: null,
  change: null,
});

const props = defineProps<{
  id?: string;
  name: string;
  icon?: string;
  label?: string;
  accept?: string;
  helper?: string;
  modifiers?: string;
  multiple?: boolean;
  placeholder?: string;
  value?: File[] | null;
  iconPosition?: 'left' | 'right';
}>();

const randomId = ref(generateRandomId());
const currentValue = ref(props.value || []);
const parsedLabel = computed(() => markdown(props.label));
const parsedHelper = computed(() => markdown(props.helper));
const className = computed(() => buildClass('ui-file-picker', (props.modifiers || '') + (props.multiple ? ' multiple' : '')));
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
  emit('change', currentValue.value, event);
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
      class="ui-file-picker__label"
      :for="randomId"
      v-html="parsedLabel"
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
        :tabindex="modifiers?.includes('disabled') ? -1 : 0"
        @change="handleChange"
        @blur="$emit('blur', currentValue, $event)"
        @focus="$emit('focus', currentValue, $event)"
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
      v-html="parsedHelper"
    />
  </div>
</template>

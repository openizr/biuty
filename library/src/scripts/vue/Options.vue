<!-- Set of selectable options. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable vue/no-v-html */

import { ref, computed, watch } from 'vue';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

const toArray = (value: string | string[]): string[] => (Array.isArray(value) ? value : [value]);

const emit = defineEmits({
  focus: null,
  change: null,
});

const props = defineProps<{
  id?: string;
  name: string;
  label?: string;
  helper?: string;
  options: {
    value?: string;
    label?: string;
    disabled?: boolean;
    type?: 'header' | 'divider' | 'option';
  }[];
  select?: boolean;
  multiple?: boolean;
  modifiers?: string;
  value?: string | string[];
}>();

const buttonRef = ref(null);
const wrapperRef = ref(null);
const isDisplayed = ref(false);
const isFocused = ref(false);
const position = ref('bottom');
const focusedOptionIndex = ref(-1);
const randomId = ref(generateRandomId());
const currentValue = ref(toArray(props.value || []));
const parsedLabel = computed(() => markdown(props.label));
const parsedHelper = computed(() => markdown(props.helper));
const className = computed(() => buildClass(
  'ui-options',
  (props.modifiers || '') + (props.select === true ? ' select' : '') + (props.multiple === true ? ' multiple' : ''),
));

// Memoizes all options' parsed labels to optimize rendering.
const optionParsedLabels = computed(() => props.options.reduce((mapping, option) => {
  if (option.value !== undefined && option.value !== null) {
    return { ...mapping, [option.value]: markdown(option.label as string) };
  }
  return mapping;
}, { _: '' } as Record<string, string>));

// -------------------------------------------------------------------------------------------------
// CALLBACKS DECLARATION.
// -------------------------------------------------------------------------------------------------

// Updates the `isFocused` ref when blurring options.
const handleBlur = (): void => {
  isFocused.value = false;
};

// In `select` mode only, displays the options list at the right place on the viewport.
const displayList = (): void => {
  const relativeOffsetTop = buttonRef.value.getBoundingClientRect().top;
  position.value = ((relativeOffsetTop > window.innerHeight / 2) ? 'top' : 'bottom');
  isDisplayed.value = true;
};

// In `select` mode only, hides the options list only if forced or if focus is lost.
const hideList = (event: FocusEvent | null, force = false): void => {
  // We first ensure that the newly focused element is not an option of the list.
  const focusIsOutsideList = (event !== null && wrapperRef.value !== null)
    ? !wrapperRef.value.contains(event.relatedTarget as Node)
    : true;
  if (focusIsOutsideList && (force === true || props.multiple === false)) {
    handleBlur();
    isDisplayed.value = false;
  }
};

// Finds the direct previous or next option when navigating with keyboard.
const findSiblingOption = (startIndex: number, direction: number, offset = 1): number => {
  const nextIndex = startIndex + direction * offset;
  if (nextIndex < 0 || nextIndex >= props.options.length) {
    return startIndex;
  }
  const option = props.options[nextIndex];
  return (option.value !== undefined && option.disabled !== true)
    ? nextIndex
    : findSiblingOption(startIndex, direction, offset + 1);
};

// Automatically triggered when a `focus` event is fired.
const handleFocus = (optionValue: string, optionIndex: number, event: FocusEvent): void => {
  isFocused.value = true;
  focusedOptionIndex.value = optionIndex;
  emit('focus', optionValue, event);
};

// Manually triggered, used to simulate `focus` events (`select` mode).
const focusOption = (optionIndex: number): void => {
  const refNode = wrapperRef.value;
  // Vue sometimes adds an empty textNode between elements...
  const children = [...refNode.childNodes].filter((childNode) => childNode.nodeName !== '#text');
  if (refNode !== null && optionIndex < children.length && optionIndex >= 0) {
    children[optionIndex].focus();
  }
};

// Automatically triggered when a `change` event is fired.
const handleChange = (event: InputEvent): void => {
  const selectedIndex = currentValue.value.indexOf((event.target as HTMLInputElement).value);
  let newValue = [(event.target as HTMLInputElement).value];
  if (props.multiple === true) {
    newValue = (selectedIndex >= 0)
      ? currentValue.value.slice(0, selectedIndex)
        .concat(currentValue.value.slice(selectedIndex + 1))
      : currentValue.value.concat([(event.target as HTMLInputElement).value]);
  }
  // If the value hasn't changed, we don't trigger anything.
  if (props.multiple || newValue[0] !== currentValue.value[0]) {
    currentValue.value = newValue;
    emit('change', (props.multiple === true) ? newValue : newValue[0], event);
  }
};

// Manually triggered, used to simulate `change` events (`select` mode).
const changeOption = (optionIndex: number): void => {
  focusedOptionIndex.value = optionIndex;
  const optionValue = props.options[optionIndex].value;
  handleChange({ target: { value: optionValue } } as unknown as InputEvent);
  if (props.select === true) {
    hideList(null);
  }
};

// -------------------------------------------------------------------------------------------------
// KEYBOARD NAVIGATION.
// -------------------------------------------------------------------------------------------------

// Handles keyboard navigation amongst options.
const handleKeydown = (event: KeyboardEvent): void => {
  const { key } = event;
  const navigationControls: Record<string, () => number> = {
    ArrowUp: () => findSiblingOption(focusedOptionIndex.value, -1),
    ArrowLeft: () => findSiblingOption(focusedOptionIndex.value, -1),
    ArrowDown: () => findSiblingOption(focusedOptionIndex.value, +1),
    ArrowRight: () => findSiblingOption(focusedOptionIndex.value, +1),
    PageUp: () => Math.max(0, findSiblingOption(-1, +1)),
    Home: () => Math.max(0, findSiblingOption(-1, +1)),
    PageDown: () => Math.min(props.options.length - 1, findSiblingOption(props.options.length, -1)),
    End: () => Math.min(props.options.length - 1, findSiblingOption(props.options.length, -1)),
  };

  const siblingOption = navigationControls[key];
  if (siblingOption !== undefined) {
    // User is navigating through options...
    if (isDisplayed.value || !props.select) {
      focusOption(siblingOption());
    } else {
      changeOption(siblingOption());
    }
    // `event.preventDefault` is not called globally to avoid overriding `Tab` behaviour.
    event.preventDefault();
  } else if (key === ' ' || key === 'Enter') {
    // User wants to select / unselect an option...
    if (isDisplayed.value === false && props.select) {
      isDisplayed.value = true;
    } else {
      changeOption(focusedOptionIndex.value);
    }
    event.preventDefault();
  } else if (key === 'Escape') {
    // User wants to hide list (`select` mode)...
    hideList(null, true);
    event.preventDefault();
  }
};

// -------------------------------------------------------------------------------------------------
// PROPS REACTIVITY MANAGEMENT.
// -------------------------------------------------------------------------------------------------

// Updates `firstSelectedOption` ref whenever `currentValue` changes.
const firstSelectedOption = computed(() => {
  if (currentValue.value.length === 0) {
    return findSiblingOption(-1, 1);
  }
  return Math.max(0, props.options.findIndex(
    (option) => currentValue.value.includes(option.value as string),
  ));
});

// Updates current value whenever `value` property changes.
watch(() => props.value, () => {
  const newValue = toArray(props.value || []);
  currentValue.value = newValue;
});

// Updates current value whenever `multiple` property changes.
watch(() => props.multiple, () => {
  currentValue.value = (props.multiple === true || currentValue.value.length === 0)
    ? currentValue.value
    : [currentValue.value[0]];
});

// Re-focuses the right option whenever `options` property changes, to avoid out of range focus.
watch(() => props.options, () => {
  if (isFocused.value === true) {
    focusOption(firstSelectedOption.value);
  }
});

// HTML elements with `display: none` can't be focused. Thus, we need to wait for the HTML list to
// be displayed before actually focusing it (`select` mode).
watch([isDisplayed, () => props.select], async () => {
  setTimeout(() => {
    if (wrapperRef.value !== null && props.select === true && isDisplayed.value) {
      focusOption(firstSelectedOption.value);
    } else if (!isDisplayed.value && buttonRef.value !== null) {
      buttonRef.value.focus();
    }
  }, 10);
});
</script>

<template>
  <div
    v-if="select === true"
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== undefined"
      class="ui-options__label"
      :for="randomId"
      v-html="parsedLabel"
    />
    <div class="ui-options__wrapper">
      <button
        :id="randomId"
        ref="buttonRef"
        :name="name"
        type="button"
        aria-haspopup="listbox"
        class="ui-options__wrapper__button"
        :aria-labelledby="`${randomId} ${randomId}`"
        :tabindex="modifiers?.includes('disabled') ? -1 : 0"
        @keydown="handleKeydown"
        @focus="handleFocus('', firstSelectedOption, $event)"
        @mousedown="displayList"
        v-html="currentValue.map((optionValue) => optionParsedLabels[optionValue]).join(', ')"
      />
      <ul
        ref="wrapperRef"
        tabindex="-1"
        role="listbox"
        :aria-labelledby="randomId"
        :aria-expanded="isDisplayed"
        :aria-multiselectable="multiple === true"
        :aria-activedescendant="`${randomId}${focusedOptionIndex}`"
        :class="buildClass(
          'ui-options__wrapper__list', isDisplayed ? `${position} expanded` : position
        )"
        @keydown="handleKeydown"
      >
        <li
          v-for="(option, index) in options"
          :id="`${randomId}${index}`"
          :key="`${randomId}${index}`"
          tabindex="-1"
          :aria-selected="currentValue.includes(option.value)"
          :role="(option.type === 'option') ? 'option' : undefined"
          :class="buildClass(
            `ui-options__wrapper__list__${option.type}`,
            ((option.disabled === true) ? 'disabled': '') +
              (currentValue.includes(option.value) ? ' checked' : ''))"
          @blur="hideList($event, true)"
          @mousedown="(option.type==='option') ? changeOption(index) : undefined"
          @focus="handleFocus(option.value, index, $event)"
          v-html="optionParsedLabels[option.value || '_']"
        />
      </ul>
    </div>
    <span
      v-if="helper !== undefined"
      class="ui-options__helper"
      v-html="parsedHelper"
    />
  </div>

  <div
    v-else
    :id="id"
    :class="className"
  >
    <label
      v-if="label !== undefined"
      class="ui-options__label"
      :for="`${randomId}_${Math.max(firstSelectedOption, 0)}`"
      v-html="parsedLabel"
    />
    <div
      ref="wrapperRef"
      class="ui-options__wrapper"
    >
      <label
        v-for="(option, index) in options"
        :key="option.value"
        :class="buildClass(
          'ui-options__wrapper__option',
          (currentValue.includes(option.value) ? 'checked' : '') +
            ((option.disabled === true) ? ' disabled' : '')
        )"
      >
        <input
          :id="`${randomId}_${index}`"
          :name="name"
          :checked="currentValue.includes(option.value)"
          :type="(multiple === true) ? 'checkbox' : 'radio'"
          :value="option.value"
          :disabled="option.disabled === true"
          class="ui-options__wrapper__option__field"
          :tabindex="(
            option.disabled === true ||
            modifiers?.includes('disabled') ||
            !(
              ((index === 0 || multiple === false) && currentValue.length === 0) ||
              option.value === currentValue[0]
            )
              ? -1 : 0)"
          @blur="handleBlur"
          @change="handleChange"
          @keydown="handleKeydown"
          @focus="handleFocus(option.value, index, $event)"
        >
        <span
          class="ui-options__wrapper__option__label"
          v-html="optionParsedLabels[option.value]"
        />
      </label>
    </div>
    <span
      v-if="helper !== undefined"
      class="ui-options__helper"
      v-html="parsedHelper"
    />
  </div>
</template>

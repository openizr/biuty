<!-- Textfields page. -->

<script lang="ts">
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { onMount } from 'svelte';
import type { Locale } from 'basx/i18n';
import { UITextarea } from 'biuty/svelte';

export let locale: Locale;

let newValue = 'test';

onMount(() => {
  setTimeout(() => {
    newValue = 'new test';
  }, 3000);
});

const { log } = console;

const onChange = (...e): void => {
  log('Changed!', e);
};

const onBlur = (...e): void => {
  log('Blurred!', e);
};

const onFocus = (...e): void => {
  log('Focused!', e);
};

</script>

<div class="vgap-5">
  <main class="grid cols-1 hgap-3 vgap-5">
    <a
      href="/"
      class="cols-l-3"
    >GO BACK</a>
    {locale}
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
      value={newValue}
    />
    <UITextarea
      name="textarea6"
      label="ui-textarea with helper"
      helper="helper"
    />
    <UITextarea
      name="textarea7"
      label="ui-textarea with listener"
      on:change={onChange}
    />
    <UITextarea
      name="textarea8"
      label="ui-textarea with debounce"
      debounceTimeout={250}
      on:change={onChange}
    />
    <UITextarea
      name="textarea9"
      label="ui-textarea with blur listener"
      on:blur={onBlur}
    />
    <UITextarea
      name="textarea10"
      label="ui-textarea with maxlength"
      maxlength={10}
    />
    <UITextarea
      name="textarea11"
      label="ui-textarea with placeholder"
      placeholder="placeholder"
    />
    <UITextarea
      name="textarea12"
      label="ui-textarea with rows and cols"
      rows={10}
      cols={10}
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
      on:focus={onFocus}
    />
  </main>
</div>

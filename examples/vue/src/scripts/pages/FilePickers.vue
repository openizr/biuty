<!-- FileUploaders page. -->

<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Locale } from 'basx/i18n';
import { UIFilePicker } from 'biuty/vue';

defineProps<{
  locale: Locale;
}>();

const { log } = console;

const onChange = (value: File[], event: InputEvent): void => {
  log('Changed!', value, event);
};

const onFocus = (value: File[], event: FocusEvent): void => {
  log('Focused!', value, event);
};

const onBlur = (value: File[], event: FocusEvent): void => {
  log('Blurred!', value, event);
};

const file = new File([], 'test.png');
</script>

<template>
  <div className="vgap-5">
    <main className="grid cols-1 hgap-3 vgap-5">
      <a
        href="/"
        className="cols-l-3"
      >GO BACK</a>
      <UIFilePicker name="file-uploader1" />
      <UIFilePicker
        name="file-uploader2"
        label="*ui-file-uploader*"
      />
      <UIFilePicker
        name="file-uploader5"
        label="ui-file-uploader multiple"
        multiple
      />
      <UIFilePicker
        name="file-uploader5"
        label="ui-file-uploader with helper"
        helper="helper"
      />
      <UIFilePicker
        name="file-uploader6"
        label="ui-file-uploader with listener"
        :on-change="onChange"
      />
      <UIFilePicker
        name="file-uploader11"
        label="ui-file-uploader disabled"
        modifiers="disabled"
      />
      <UIFilePicker
        name="file-uploader12"
        label="ui-file-uploader icon left"
        icon="star"
      />
      <UIFilePicker
        name="file-uploader13"
        label="ui-file-uploader icon right"
        icon="star"
        icon-position="right"
      />
      <UIFilePicker
        name="file-uploader14"
        label="ui-file-uploader with focus listener"
        :on-focus="onFocus"
        :on-blur="onBlur"
      />
      <UIFilePicker
        name="file-uploader15"
        label="ui-file-uploader with accept"
        accept="image/*"
      />
      <UIFilePicker
        name="file-uploader15"
        label="ui-file-uploader with value"
        :value="[file]"
      />
    </main>
  </div>
</template>

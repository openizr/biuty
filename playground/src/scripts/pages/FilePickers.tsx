/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UIFilePicker } from 'biuty/react';

const onChange = (value: File[]): void => {
  console.log('Changed!', value);
};

const onFocus = (): void => {
  console.log('Focused!');
};

/**
 * FileUploaders page.
 */
export default function FileUploaders(): JSX.Element {
  return (
    <div>
      <main className="grid cols-1 hgap-3 vgap-5">
        <a href="/" className="cols-l-3">GO BACK</a>
        <UIFilePicker name="file-uploader1" />
        <UIFilePicker name="file-uploader2" label="*ui-file-uploader*" />
        <UIFilePicker name="file-uploader5" label="ui-file-uploader multiple" multiple />
        <UIFilePicker name="file-uploader5" label="ui-file-uploader with helper" helper="helper" />
        <UIFilePicker name="file-uploader6" label="ui-file-uploader with listener" onChange={onChange} />
        <UIFilePicker name="file-uploader11" label="ui-file-uploader disabled" modifiers="disabled" />
        <UIFilePicker name="file-uploader12" label="ui-file-uploader icon left" icon="star" />
        <UIFilePicker name="file-uploader13" label="ui-file-uploader icon right" icon="star" iconPosition="right" />
        <UIFilePicker name="file-uploader14" label="ui-file-uploader with focus listener" onFocus={onFocus} />
        <UIFilePicker name="file-uploader15" label="ui-file-uploader with accept" accept="image/*" />
        <UIFilePicker name="file-uploader16" label="ui-file-uploader with value" value={[new File([], 'test.png')]} />
      </main>
    </div>
  );
}

FileUploaders.displayName = 'Textfields';

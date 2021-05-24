/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UIFileUploader } from 'sonar-ui/react';

const onChange = (value: File[]): void => {
  console.log('Changed!', value); // eslint-disable-line no-console
};

const onFocus = (): void => {
  console.log('Focused!'); // eslint-disable-line no-console
};

/**
 * FileUploaders page.
 */
export default function FileUploaders(): JSX.Element {
  return (
    <div className="vgap-5">
      <main className="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
        <a href="/" className="cols-l-3">GO BACK</a>
        <UIFileUploader name="file-uploader1" />
        <UIFileUploader name="file-uploader2" label="*ui-file-uploader*" />
        <UIFileUploader name="file-uploader5" label="ui-file-uploader multiple" multiple />
        <UIFileUploader name="file-uploader5" label="ui-file-uploader with helper" helper="helper" />
        <UIFileUploader name="file-uploader6" label="ui-file-uploader with listener" onChange={onChange} />
        <UIFileUploader name="file-uploader11" label="ui-file-uploader disabled" modifiers="disabled" />
        <UIFileUploader name="file-uploader12" label="ui-file-uploader icon left" icon="star" />
        <UIFileUploader name="file-uploader13" label="ui-file-uploader icon right" icon="star" iconPosition="right" />
        <UIFileUploader name="file-uploader14" label="ui-file-uploader with focus listener" onFocus={onFocus} />
      </main>
    </div>
  );
}

FileUploaders.displayName = 'Textfields';

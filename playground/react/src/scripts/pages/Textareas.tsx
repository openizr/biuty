/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UITextarea } from 'sonar-ui/react';

const onChange = (value: string): void => {
  console.log('Changed!', value); // eslint-disable-line no-console
};

const onBlur = (value: string): void => {
  console.log('Blurred!', value); // eslint-disable-line no-console
};

/**
 * Textareas page.
 */
export default function Textareas(): JSX.Element {
  const [newValue, setNewValue] = React.useState('test');

  React.useEffect(() => {
    setTimeout(() => {
      setNewValue('new test');
    }, 3000);
  }, []);

  return (
    <div className="vgap-5">
      <main className="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
        <a href="/" className="cols-l-3">GO BACK</a>
        <UITextarea name="textarea1" />
        <UITextarea name="textarea2" label="ui-textarea" />
        <UITextarea name="textarea3" label="ui-textarea readonly" readonly />
        <UITextarea name="textarea4" label="ui-textarea with value" value={newValue} />
        <UITextarea name="textarea5" label="ui-textarea with helper" helper="helper" />
        <UITextarea name="textarea6" label="ui-textarea with listener" onChange={onChange} />
        <UITextarea name="textarea7" label="ui-textarea with blur listener" onBlur={onBlur} />
        <UITextarea name="textarea8" label="ui-textarea with maxlength" maxlength={10} />
        <UITextarea name="textarea9" label="ui-textarea with placeholder" placeholder="placeholder" />
        <UITextarea name="textarea10" label="ui-textarea with rows and cols" rows={10} cols={10} />
        <UITextarea name="textarea11" label="ui-textarea disabled" modifiers="disabled" />
      </main>
    </div>
  );
}

Textareas.displayName = 'Textareas';

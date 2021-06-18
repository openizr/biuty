/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UITextfield } from 'sonar-ui/react';

const onChange = (value: string): void => {
  console.log('Changed!', value); // eslint-disable-line no-console
};

const onBlur = (value: string): void => {
  console.log('Blurred!', value); // eslint-disable-line no-console
};

const onFocus = (): void => {
  console.log('Focused!'); // eslint-disable-line no-console
};

const onIconClick = (): void => {
  console.log('Clicked!'); // eslint-disable-line no-console
};

const transform = (value: string): string => value.toUpperCase();

/**
 * Textfields page.
 */
export default function Textfields(): JSX.Element {
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
        <UITextfield name="textfield1" />
        <UITextfield name="textfield2" label="*ui-textfield*" />
        <UITextfield name="textfield3" label="ui-textfield readonly" readonly />
        <UITextfield name="textfield4" label="ui-textfield with value" value={newValue} />
        <UITextfield name="textfield5" label="ui-textfield with helper" helper="helper" />
        <UITextfield name="textfield16" label="ui-textfield with transform" transform={transform} />
        <UITextfield name="textfield17" label="ui-textfield with debounce" onChange={onChange} debounceTimeout={250} />
        <UITextfield name="textfield6" label="ui-textfield with listener" onChange={onChange} />
        <UITextfield name="textfield7" label="ui-textfield with blur listener" onBlur={onBlur} />
        <UITextfield name="textfield8" label="ui-textfield with maxlength" maxlength={10} />
        <UITextfield name="textfield9" label="ui-textfield with placeholder" placeholder="placeholder" />
        <UITextfield name="textfield10" label="ui-textfield with password type" type="password" size={10} />
        <UITextfield name="textfield11" label="ui-textfield disabled" modifiers="disabled" />
        <UITextfield name="textfield12" label="ui-textfield icon left" icon="star" />
        <UITextfield name="textfield13" label="ui-textfield icon right" icon="star" iconPosition="right" />
        <UITextfield name="textfield14" label="ui-textfield icon with listener" icon="star" onIconClick={onIconClick} />
        <UITextfield name="textfield15" label="ui-textfield with focus listener" onFocus={onFocus} />
      </main>
    </div>
  );
}

Textfields.displayName = 'Textfields';

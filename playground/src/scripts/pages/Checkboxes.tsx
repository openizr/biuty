/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UICheckbox } from 'sonar-ui/react';

const onChange = (value: string[]): void => {
  console.log('Changed!', value); // eslint-disable-line no-console
};

const onFocus = (value: string): void => {
  console.log('Focused!', value); // eslint-disable-line no-console
};

const options = [
  {
    label: '*Option* _1_',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
  {
    label: 'Option 3',
    value: 'option3',
  },
  {
    label: 'Option 4',
    value: 'option4',
    disabled: true,
  },
];

/**
 * Checkboxes page.
 */
export default function Checkboxes(): JSX.Element {
  const [newValue, setNewValue] = React.useState(['option3']);

  React.useEffect(() => {
    setTimeout(() => {
      setNewValue(['option2', 'option4']);
    }, 3000);
  }, []);

  return (
    <div className="vgap-5">
      <main className="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
        <a href="/" className="cols-l-3">GO BACK</a>
        <UICheckbox name="checkbox1" options={options} />
        <UICheckbox name="checkbox2" options={options} label="*ui-checkbox*" />
        <UICheckbox name="checkbox3" options={options} label="ui-checkbox with value" value={newValue} />
        <UICheckbox name="checkbox4" options={options} label="ui-checkbox with helper" helper="helper" />
        <UICheckbox name="checkbox5" options={options} label="ui-checkbox with listener" onChange={onChange} />
        <UICheckbox name="checkbox6" options={options} label="ui-checkbox disabled" modifiers="disabled" />
        <UICheckbox name="checkbox7" options={options} label="ui-checkbox with focus listener" onFocus={onFocus} />
      </main>
    </div>
  );
}

Checkboxes.displayName = 'Checkboxes';

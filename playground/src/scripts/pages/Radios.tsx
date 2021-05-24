/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UIRadio } from 'sonar-ui/react';

const onChange = (value: string): void => {
  console.log('Changed!', value); // eslint-disable-line no-console
};

const onFocus = (value: string): void => {
  console.log('Focused!', value); // eslint-disable-line no-console
};

const options = [
  {
    label: '*Option 1*',
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
 * Radios page.
 */
export default function Radios(): JSX.Element {
  const [newValue, setNewValue] = React.useState('option3');

  React.useEffect(() => {
    setTimeout(() => {
      setNewValue('option1');
    }, 3000);
  }, []);

  return (
    <div className="vgap-5">
      <main className="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
        <a href="/" className="cols-l-3">GO BACK</a>
        <UIRadio name="radio1" value="option3" options={options} />
        <UIRadio name="radio2" value="option3" label="*ui-radio*" options={options} />
        <UIRadio name="radio3" value={newValue} label="ui-radio with value" options={options} />
        <UIRadio name="radio4" value="option3" label="ui-radio with helper" helper="helper" options={options} />
        <UIRadio name="radio5" value="option3" label="ui-radio with listener" onChange={onChange} options={options} />
        <UIRadio name="radio6" value="option3" label="ui-radio disabled" modifiers="disabled" options={options} />
        <UIRadio name="radio7" value="option3" label="ui-radio with focus listener" onFocus={onFocus} options={options} />
      </main>
    </div>
  );
}

Radios.displayName = 'Radios';

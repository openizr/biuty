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
        <UIRadio name="radio1" value="option1" selected={newValue} />
        <UIRadio name="radio1" value="option2" label="ui-radio" selected={newValue} />
        <UIRadio name="radio1" value="option3" label="ui-radio readonly" readonly selected={newValue} />
        <UIRadio name="radio1" value="option4" label="ui-radio with value" selected={newValue} />
        <UIRadio name="radio1" value="option5" label="ui-radio with helper" helper="helper" selected={newValue} />
        <UIRadio name="radio1" value="option6" label="ui-radio with listener" onChange={onChange} selected={newValue} />
        <UIRadio name="radio1" value="option7" label="ui-radio disabled" modifiers="disabled" selected={newValue} />
      </main>
    </div>
  );
}

Radios.displayName = 'Radios';

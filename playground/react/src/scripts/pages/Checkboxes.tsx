/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UICheckbox } from 'sonar-ui/react';

const onChange = (value: boolean): void => {
  console.log('Changed!', value); // eslint-disable-line no-console
};

/**
 * Checkboxes page.
 */
export default function Checkboxes(): JSX.Element {
  const [newValue, setNewValue] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setNewValue(true);
    }, 3000);
  }, []);

  return (
    <div className="vgap-5">
      <main className="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
        <a href="/" className="cols-l-3">GO BACK</a>
        <UICheckbox name="checkbox1" />
        <UICheckbox name="checkbox2" label="ui-checkbox" />
        <UICheckbox name="checkbox3" label="ui-checkbox readonly" readonly />
        <UICheckbox name="checkbox4" label="ui-checkbox with value" value={newValue} />
        <UICheckbox name="checkbox5" label="ui-checkbox with helper" helper="helper" />
        <UICheckbox name="checkbox6" label="ui-checkbox with listener" onChange={onChange} />
        <UICheckbox name="checkbox7" label="ui-checkbox disabled" modifiers="disabled" />
      </main>
    </div>
  );
}

Checkboxes.displayName = 'Checkboxes';

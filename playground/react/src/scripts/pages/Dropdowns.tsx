/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UIDropdown } from 'sonar-ui/react';

const options = [
  {
    label: 'Option 1',
    value: 'option1',
    disabled: false,
    type: 'option',
  },
  {
    label: 'Option 2',
    value: 'option2',
    disabled: true,
    type: 'option',
  },
  {
    type: 'divider',
  },
  {
    label: 'Option 4',
    value: 'option4',
    disabled: false,
    type: 'option',
  },
  {
    label: 'Option 5',
    value: 'option5',
    disabled: false,
    type: 'option',
  },
  {
    label: 'Option 6',
    value: 'option6',
    disabled: false,
    type: 'option',
  },
];

const options2 = [
  {
    label: 'Option 1',
    value: 'option1',
    disabled: false,
    type: 'option',
  },
  {
    label: 'Option 2',
    value: 'option2',
    disabled: false,
    type: 'option',
  },
];

const defaultOptions = ['option1'];

/**
 * Dropdowns page.
 */
export default function Dropdowns(): JSX.Element {
  return (
    <div className="vgap-5">
      <main className="ui-page ui-block cols-12 cols-l-12 hgap-3 vgap-5">
        <a href="/" className="cols-12 cols-l-12">GO BACK</a>

        <div className="cols-12 cols-l-6">
          <UIDropdown options={options} defaultOptions={defaultOptions} label="UIDropdown" />
        </div>

        <div className="cols-12 cols-l-6">
          <UIDropdown options={options} defaultOptions={defaultOptions} modifiers="disabled" label="UIDropdown disabled" />
        </div>

        <div className="cols-12 cols-l-6">
          <UIDropdown options={options2} defaultOptions={defaultOptions} modifiers="large" label="UIDropdown large" />
        </div>

        <div className="cols-12 cols-l-6">
          <UIDropdown options={options} defaultOptions={defaultOptions} modifiers="large" label="UIDropdown large disabled" />
        </div>
      </main>
    </div>
  );
}

Dropdowns.displayName = 'Dropdowns';

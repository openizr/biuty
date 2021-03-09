/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UIButton } from 'sonar-ui/react';

/**
 * Buttons page.
 */
export default function Buttons(): JSX.Element {
  return (
    //
    <div className="vgap-5">
      <main className="ui-page ui-block cols-1 cols-l-3 hgap-3 vgap-5">
        <a href="/" className="cols-l-3">GO BACK</a>
        <UIButton label="ui-button" />
        <UIButton modifiers="primary" label="ui-button ui-button--primary" />
        <UIButton modifiers="secondary" label="ui-button ui-button--secondary" />
        <UIButton modifiers="disabled" label="ui-button ui-button--disabled" />
        <UIButton modifiers="primary disabled" label="ui-button ui-button--primary ui-button--disabled" />
        <UIButton modifiers="secondary disabled" label="ui-button ui-button--secondary ui-button--disabled" />
        <UIButton modifiers="loading" label="ui-button ui-button--loading" />
        <UIButton modifiers="primary loading" label="ui-button ui-button--primary ui-button--loading" />
        <UIButton modifiers="secondary loading" label="ui-button ui-button--secondary ui-button--loading" />
        <UIButton modifiers="large" label="ui-button ui-button--large" />
        <UIButton modifiers="primary large" label="ui-button ui-button--primary--large" />
        <UIButton modifiers="secondary large" label="ui-button ui-button--secondary--large" />
      </main>
    </div>
  );
}

Buttons.displayName = 'Buttons';

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UIButton } from 'biuty/react';

const onClick = (): void => {
  console.log('Clicked!'); // eslint-disable-line no-console
};

const onFocus = (): void => {
  console.log('Focused!'); // eslint-disable-line no-console
};

/**
 * Buttons page.
 */
export default function Buttons(): JSX.Element {
  return (
    <div>
      <main className="grid cols-1 hgap-3 vgap-5">
        <a href="/">GO BACK</a>
        <UIButton label="ui-button" />
        <UIButton label="ui-button icon left" icon="star" />
        <UIButton label="ui-button icon right" icon="star" iconPosition="right" />
        <UIButton label="ui-button disabled" modifiers="disabled" />
        <UIButton label="ui-button with listener" onClick={onClick} />
        <UIButton label="ui-button with type submit" type="submit" />
        <UIButton label="ui-button with focus listener" onFocus={onFocus} />
        <UIButton icon="star" onFocus={onFocus} />
      </main>
    </div>
  );
}

Buttons.displayName = 'Buttons';

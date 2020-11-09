/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UIButton } from 'sonar-ui/react';

export default function Buttons(): JSX.Element {
  return (
    <section>
      <h3>Buttons</h3>
      <div>
        <UIButton label="contained primary" modifiers="contained primary" />
        <UIButton label="contained secondary" modifiers="contained secondary" />
        <UIButton label="contained warning" modifiers="contained warning" />
        <UIButton label="contained error" modifiers="contained error" />
        <UIButton label="contained disabled" modifiers="contained disabled" />
      </div>
      <div>
        <UIButton label="outlined primary" modifiers="outlined primary" />
        <UIButton label="outlined secondary" modifiers="outlined secondary" />
        <UIButton label="outlined warning" modifiers="outlined warning" />
        <UIButton label="outlined error" modifiers="outlined error" />
        <UIButton label="outlined disabled" modifiers="outlined disabled" />
      </div>
      <div>
        <UIButton label="text primary" modifiers="text primary" />
        <UIButton label="text secondary" modifiers="text secondary" />
        <UIButton label="text warning" modifiers="text warning" />
        <UIButton label="text error" modifiers="text error" />
        <UIButton label="text disabled" modifiers="text disabled" />
      </div>
    </section>
  );
}

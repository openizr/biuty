/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import buildClass from 'scripts/helpers/buildClass';

/**
 * Basic icon.
 */
function UIIcon(props: UIIconProps): JSX.Element {
  const { name } = props;
  let { id, modifiers } = props;

  // Enforces props default values.
  id = id || null;
  modifiers = modifiers || '';

  const className = buildClass('ui-icon', `${name} ${modifiers}`);
  return (
    <i
      id={id as string}
      className={className}
    />
  );
}

export default React.memo(UIIcon);

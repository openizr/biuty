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
 * Hyperlink.
 */
function UILink(props: UILinkProps & {
  /** `click` event handler. */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}): JSX.Element {
  let { rel, id } = props;
  const { href, label } = props;
  let { onClick, modifiers, target } = props;

  // Enforces props default values.
  id = id || null;
  rel = rel || null;
  target = target || null;
  onClick = onClick || null;
  modifiers = modifiers || '';

  return (
    <a
      href={href}
      id={id as string}
      rel={rel as string}
      target={target as string}
      className={buildClass('ui-link', modifiers)}
      onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
    >
      {label}
    </a>
  );
}

export default React.memo(UILink);

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
  const { rel, id } = props;
  const { href, label } = props;
  const { onClick, modifiers = '', target } = props;

  return (
    <a
      id={id}
      rel={rel}
      href={href}
      target={target}
      onClick={onClick}
      className={buildClass('ui-link', modifiers)}
    >
      {label}
    </a>
  );
}

export default React.memo(UILink);

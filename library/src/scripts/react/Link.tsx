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
function UILink(props: UILinkProps): JSX.Element {
  const { rel, id } = props;
  const { href, label, disabled = false } = props;
  const { onClick, modifiers = '', target } = props;

  // -----------------------------------------------------------------------------------------------
  // CALLBACKS DECLARATION.
  // -----------------------------------------------------------------------------------------------

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    if (onClick !== undefined && !disabled) {
      onClick(event as unknown as MouseEvent);
    }
  };

  // -----------------------------------------------------------------------------------------------
  // COMPONENT RENDERING.
  // -----------------------------------------------------------------------------------------------

  return (
    <a
      id={id}
      rel={rel}
      href={href}
      target={target}
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
      className={buildClass('ui-link', `${modifiers}${disabled ? ' disabled' : ''}`)}
    >
      {label}
    </a>
  );
}

export default React.memo(UILink);

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import UIIcon from 'scripts/react/Icon';
import buildClass from 'scripts/helpers/buildClass';

const JSXUIIcon = UIIcon as JSXElement;

/**
 * Button.
 */
function UIButton(props: UIButtonProps & {
  /** `click` event handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /** `focus` event handler. */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
}): JSX.Element {
  const { id, onClick, onFocus } = props;
  const { type = 'button', modifiers = '' } = props;
  const { label, icon, iconPosition = 'left' } = props;

  const children = [
    (icon !== undefined) ? <JSXUIIcon key="icon" name={icon} /> : null,
    (label !== undefined) ? <span key="label" className="ui-button__label">{label}</span> : null,
  ];

  return (
    <button
      id={id}
      onFocus={onFocus}
      onClick={onClick}
      type={(type === 'submit') ? 'submit' : 'button'}
      tabIndex={(modifiers.includes('disabled') ? -1 : 0)}
      className={buildClass('ui-button', `${modifiers}${(icon !== null && label === null) ? ' icon' : ''}`)}
    >
      {(iconPosition === 'left') ? children : children.reverse()}
    </button>
  );
}

export default React.memo(UIButton);

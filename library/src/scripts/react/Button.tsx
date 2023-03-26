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
function UIButton(props: UIButtonProps): JSX.Element {
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
      type={(type === 'submit') ? 'submit' : 'button'}
      tabIndex={(modifiers.includes('disabled') ? -1 : 0)}
      onFocus={onFocus as unknown as React.FocusEventHandler<HTMLButtonElement>}
      onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
      className={buildClass('ui-button', `${modifiers}${(icon !== undefined && label === undefined) ? ' icon' : ''}`)}
    >
      {(iconPosition === 'left') ? children : children.reverse()}
    </button>
  );
}

export default React.memo(UIButton);

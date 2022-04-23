/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import UIIcon from 'scripts/react/Icon';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'scripts/helpers/buildClass';

const JSXUIIcon = UIIcon as JSXElement;

const propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  modifiers: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

const defaultProps = {
  id: null,
  icon: null,
  label: null,
  modifiers: '',
  type: 'button',
  onFocus: null,
  onClick: null,
  iconPosition: 'left',
};

/**
 * Button.
 */
function UIButton(props: InferProps<typeof propTypes>): JSX.Element {
  const { type, onFocus } = props;
  const { onClick, id, modifiers } = props;
  const { label, icon, iconPosition } = props;

  const children = [
    (icon !== null && icon !== undefined) ? <JSXUIIcon key="icon" name={icon} /> : null,
    (label !== null) ? <span key="label" className="ui-button__label">{label}</span> : null,
  ];

  return (
    <button
      id={id as string}
      onFocus={onFocus as undefined}
      onClick={onClick as undefined}
      type={(type === 'submit') ? 'submit' : 'button'}
      tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
      className={buildClass('ui-button', `${modifiers as string}${(icon !== null && label === null) ? ' icon' : ''}`)}
    >
      {(iconPosition === 'left') ? children : children.reverse()}
    </button>
  );
}

UIButton.propTypes = propTypes;
UIButton.defaultProps = defaultProps;
UIButton.displayName = 'UIButton';

export default React.memo(UIButton);

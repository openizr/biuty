/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'sonar-ui/helpers/buildClass';

const propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  modifiers: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

const defaultProps = {
  id: null,
  icon: null,
  label: null,
  onClick: undefined,
  iconPosition: 'left',
  modifiers: 'contained',
};

/**
 * Button.
 */
export default function UIButton(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { label, icon, iconPosition, onClick, id, modifiers } = props;
  const className = buildClass('ui-button', (modifiers as string).split(' '));
  const children = [
    (icon !== null) ? <i key="icon" className="ui-button__icon">{icon}</i> : null,
    (label !== null) ? <span key="label" className="ui-button__label">{label}</span> : null,
  ];
  return (
    <button
      id={id as string}
      type="button"
      onClick={onClick as undefined}
      className={`${className}${(icon !== null && label === null) ? ' ui-button--icon' : ''}`}
      tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
    >
      {(iconPosition === 'left') ? children : children.reverse()}
    </button>
  );
}

UIButton.propTypes = propTypes;
UIButton.defaultProps = defaultProps;
UIButton.displayName = 'UIButton';

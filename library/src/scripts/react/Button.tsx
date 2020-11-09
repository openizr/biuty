/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';

const propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  modifiers: PropTypes.string,
};

const defaultProps = {
  id: null,
  icon: null,
  label: null,
  modifiers: 'contained',
  onClick: undefined,
};

/**
 * Button.
 */
export default function UIButton(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { label, icon, onClick, id } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const modifiers = (props.modifiers as string).split(' ');
  const classes = ['ui-button'].concat(modifiers.map((modifier) => `ui-button--${modifier}`));
  return (
    <button
      id={id as string}
      type="button"
      onClick={onClick as undefined}
      className={classes.join(' ')}
      tabIndex={(modifiers.includes('disabled') ? -1 : 0)}
    >
      {(icon !== null) ? <i className="ui-button__icon">{icon}</i> : null}
      {(label !== null) ? <span className="ui-button__label">{label}</span> : null}
    </button>
  );
}

UIButton.propTypes = propTypes;
UIButton.defaultProps = defaultProps;
UIButton.displayName = 'UIButton';

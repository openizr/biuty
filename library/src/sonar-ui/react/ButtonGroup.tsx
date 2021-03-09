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
  // icon: PropTypes.string,
  // label: PropTypes.string,
  // onClick: PropTypes.func,
  // modifiers: PropTypes.string,
  // iconPosition: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
};

const defaultProps = {
  id: null,
  // icon: null,
  // label: null,
  // onClick: undefined,
  // iconPosition: 'left',
  // modifiers: 'contained',
  children: null,
};

/**
 * Button group.
 */
export default function UIButtonGroup(props: InferProps<typeof propTypes>): JSX.Element {
  const { id, children } = props;
  return (
    <div
      id={id as string}
      className="ui-button-group"
    >
      {children}
    </div>
  );
}

UIButtonGroup.propTypes = propTypes;
UIButtonGroup.defaultProps = defaultProps;
UIButtonGroup.displayName = 'UIButtonGroup';

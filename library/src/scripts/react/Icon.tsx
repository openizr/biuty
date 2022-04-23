/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'scripts/helpers/buildClass';

const propTypes = {
  id: PropTypes.string,
  modifiers: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  id: null,
  modifiers: '',
};

/**
 * Basic icon.
 */
function UIIcon(props: InferProps<typeof propTypes>): JSX.Element | null {
  const { id, name, modifiers } = props;
  const className = buildClass('ui-icon', `${name} ${modifiers}`);
  return (
    <i
      id={id as string}
      className={className}
    />
  );
}

UIIcon.propTypes = propTypes;
UIIcon.defaultProps = defaultProps;
UIIcon.displayName = 'UIIcon';

export default React.memo(UIIcon);

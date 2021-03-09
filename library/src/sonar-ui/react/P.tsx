/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import md from 'sonar-ui/helpers/md';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'sonar-ui/helpers/buildClass';

const propTypes = {
  id: PropTypes.string,
  modifiers: PropTypes.string,
  label: PropTypes.string.isRequired,
  itemProp: PropTypes.string,
};

const defaultProps = {
  id: null,
  modifiers: 'contained',
  itemProp: undefined,
};

/**
 * Paragraph.
 */
export default function UIP(props: InferProps<typeof propTypes>): JSX.Element {
  const {
    label, id, modifiers, itemProp,
  } = props;
  const className = buildClass('ui-p', (modifiers as string).split(' '));
  return (
    <p
      id={id as string}
      className={className}
      itemProp={itemProp as string}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: md(label) }}
    />
  );
}

UIP.propTypes = propTypes;
UIP.defaultProps = defaultProps;
UIP.displayName = 'UIP';

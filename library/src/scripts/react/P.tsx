/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import markdown from 'scripts/helpers/markdown';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'scripts/helpers/buildClass';

const propTypes = {
  id: PropTypes.string,
  itemProp: PropTypes.string,
  modifiers: PropTypes.string,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  id: null,
  modifiers: '',
  itemProp: null,
};

/**
 * Paragraph.
 */
function UIP(props: InferProps<typeof propTypes>): JSX.Element {
  const { label } = props;
  let { itemProp, id, modifiers } = props;

  id = id || null;
  itemProp = itemProp || null;
  modifiers = modifiers || '';

  const className = buildClass('ui-p', modifiers);
  return (
    <p
      id={id as string}
      className={className}
      itemProp={itemProp as string}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: markdown(label) }}
    />
  );
}

UIP.propTypes = propTypes;
UIP.defaultProps = defaultProps;
UIP.displayName = 'UIP';

export default React.memo(UIP);

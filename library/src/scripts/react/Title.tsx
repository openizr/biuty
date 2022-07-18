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

const validLevels = ['1', '2', '3', '4', '5', '6'];

const propTypes = {
  id: PropTypes.string,
  itemProp: PropTypes.string,
  modifiers: PropTypes.string,
  label: PropTypes.string.isRequired,
  level: PropTypes.oneOf(validLevels),
};

const defaultProps = {
  id: null,
  level: '1',
  modifiers: '',
  itemProp: null,
};

/**
 * Title.
 */
function UITitle(props: InferProps<typeof propTypes>): JSX.Element {
  const { label } = props;
  let { id, itemProp } = props;
  let { level, modifiers } = props;

  id = id || null;
  level = level || '1';
  itemProp = itemProp || null;
  modifiers = modifiers || '';

  // Checks if any of the given modifiers corresponds to a valid level (1, 2, ...).
  // By default, if no level is specified in modifiers, we set it to the `level` prop.
  if (/(^|\s)([1-6])($|\s)/i.test(modifiers as string) === false) {
    modifiers += ` ${level}`;
  }

  return React.createElement(`h${level}`, {
    id,
    itemProp,
    dangerouslySetInnerHTML: { __html: markdown(label) },
    className: buildClass('ui-title', modifiers as string),
  }) as JSXElement;
}

UITitle.propTypes = propTypes;
UITitle.defaultProps = defaultProps;
UITitle.displayName = 'UITitle';

export default React.memo(UITitle);

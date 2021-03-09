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
  itemProp: undefined,
};

/**
 * Title.
 */
export default function UITitle(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { id, level, label, modifiers, itemProp } = props;
  const modifiersList = (modifiers as string).split(' ');

  // Checks if any of the given modifiers corresponds to a valid level (1, 2, ...).
  // By default, if no level is specified in modifiers, we set it to the `level` prop.
  if (/(^|\s)([1-6])($|\s)/i.test(modifiers as string) === false) {
    modifiersList.push(level as string);
  }

  return React.createElement(`h${level}`, {
    id,
    itemProp,
    className: buildClass('ui-title', modifiersList),
    dangerouslySetInnerHTML: { __html: md(label) },
  });
}

UITitle.propTypes = propTypes;
UITitle.defaultProps = defaultProps;
UITitle.displayName = 'UITitle';

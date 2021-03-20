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
  onClick: PropTypes.func,
  modifiers: PropTypes.string,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  id: null,
  modifiers: '',
  onClick: (): null => null,
};

/**
 * Link.
 */
export default function UILink(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { id, href, label, onClick, modifiers } = props;

  return (
    <a
      id={id as string}
      href={href}
      onClick={onClick as () => null}
      className={buildClass('ui-link', (modifiers as string).split(' '))}
    >
      {label}
    </a>
  );
}

UILink.propTypes = propTypes;
UILink.defaultProps = defaultProps;
UILink.displayName = 'UILink';

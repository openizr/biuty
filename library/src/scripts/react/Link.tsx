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
  onClick: PropTypes.func,
  rel: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string,
  modifiers: PropTypes.string,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  id: null,
  modifiers: '',
  rel: null,
  title: null,
  target: null,
  onClick: null,
};

/**
 * Hyperlink.
 */
function UILink(props: InferProps<typeof propTypes>): JSX.Element {
  const { rel, title } = props;
  const { id, href, label } = props;
  const { onClick, modifiers, target } = props;

  return (
    <a
      id={id as string}
      href={href}
      rel={rel as string}
      title={title as string}
      target={target as string}
      onClick={onClick as undefined}
      className={buildClass('ui-link', modifiers as string)}
    >
      {label}
    </a>
  );
}

UILink.propTypes = propTypes;
UILink.defaultProps = defaultProps;
UILink.displayName = 'UILink';

export default React.memo(UILink);

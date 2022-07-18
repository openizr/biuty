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
  target: PropTypes.string,
  modifiers: PropTypes.string,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  id: null,
  modifiers: '',
  rel: null,
  target: null,
  onClick: null,
};

/**
 * Hyperlink.
 */
function UILink(props: InferProps<typeof propTypes>): JSX.Element {
  let { rel, id } = props;
  const { href, label } = props;
  let { onClick, modifiers, target } = props;

  // Enforces props default values.
  id = id || null;
  rel = rel || null;
  target = target || null;
  onClick = onClick || null;
  modifiers = modifiers || '';

  return (
    <a
      href={href}
      id={id as string}
      rel={rel as string}
      target={target as string}
      className={buildClass('ui-link', modifiers)}
      onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
    >
      {label}
    </a>
  );
}

UILink.propTypes = propTypes;
UILink.defaultProps = defaultProps;
UILink.displayName = 'UILink';

export default React.memo(UILink);

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
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.bool])).isRequired,
  ]).isRequired,
};

const defaultProps = {
  id: null,
  modifiers: 'top',
  description: null,
};

/**
 * Tooltip wrapper, for accessibility.
 */
function Tooltip(props: InferProps<typeof propTypes>): JSX.Element {
  const { label, children } = props;
  let { id, description, modifiers } = props;

  id = id || null;
  modifiers = modifiers || 'top';
  description = description || null;

  const [isDescriptionVisible, setIsDescriptionVisible] = React.useState(false);
  const className = buildClass('ui-tooltip', [modifiers, isDescriptionVisible ? 'described' : ''].join(' '));

  const displayDescription = React.useCallback(() => {
    setIsDescriptionVisible(true);
  }, []);

  const hideDescription = React.useCallback(() => {
    setIsDescriptionVisible(false);
  }, []);

  return (
    <div
      id={id as string}
      role="tooltip"
      className={className}
      aria-label={label}
      onFocus={displayDescription}
      onKeyPress={displayDescription}
      onBlur={hideDescription}
    >
      {children}
      {(isDescriptionVisible && description !== undefined) && (
        <span className="ui-tooltip__description" role="status">{description}</span>
      )}
    </div>
  );
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
Tooltip.displayName = 'Tooltip';

export default React.memo(Tooltip);

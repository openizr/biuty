/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import buildClass from 'scripts/helpers/buildClass';

/**
 * Tooltip wrapper, for accessibility.
 */
function Tooltip(props: UITooltipProps): JSX.Element {
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

export default React.memo(Tooltip);

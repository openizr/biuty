/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';

/**
 * Paragraph.
 */
function UIP(props: UIPProps): JSX.Element {
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
      dangerouslySetInnerHTML={{ __html: markdown(label) }}
    />
  );
}

export default React.memo(UIP);

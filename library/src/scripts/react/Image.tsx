/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import buildClass from 'scripts/helpers/buildClass';

const getDimensions = (ratio: string): { width: number; height: number; } => {
  let dimensions;
  switch (ratio) {
    case 'square':
      return { width: 1, height: 1 };
    case 'portrait':
      return { width: 2, height: 3 };
    case 'landscape':
      return { width: 3, height: 2 };
    case 'panoramic':
      return { width: 16, height: 9 };
    default:
      dimensions = ratio.split('x').map((value) => parseInt(value, 10));
      return { width: dimensions[0], height: dimensions[1] };
  }
};

/**
 * Image.
 */
function UIImage(props: UIImageProps): JSX.Element {
  const { src, alt, ratio } = props;
  let { id, modifiers, itemProp } = props;
  const dimensions = getDimensions(ratio);
  const className = buildClass('ui-image', `${ratio} ${modifiers}`);

  // Enforces props default values.
  id = id || null;
  itemProp = itemProp || null;
  modifiers = modifiers || '';

  // Custom aspect ratio...
  if (/^([0-9]+)x([0-9]+)$/i.test(ratio)) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        id={id as string}
        className={className}
        width={dimensions.width}
        height={dimensions.height}
        itemProp={itemProp as string}
      />
    );
  }

  // Standard aspect ratio...
  return (
    <div id={id as string} className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={dimensions.width}
        height={dimensions.height}
        itemProp={itemProp as string}
      />
    </div>
  );
}

export default React.memo(UIImage);

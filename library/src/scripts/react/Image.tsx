/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import buildClass from 'scripts/helpers/buildClass';
import PropTypes, { InferProps } from 'prop-types';

const propTypes = {
  id: PropTypes.string,
  itemProp: PropTypes.string,
  modifiers: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
};

const defaultProps = {
  id: null,
  modifiers: '',
  itemProp: null,
};

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
function UIImage(props: InferProps<typeof propTypes>): JSX.Element {
  const { id, src, alt } = props;
  const { ratio, modifiers, itemProp } = props;
  const dimensions = getDimensions(ratio);
  const className = buildClass('ui-image', `${ratio} ${modifiers}`);

  // Custom aspect ratio...
  if (/^([0-9]+)x([0-9]+)$/i.test(ratio)) {
    return (
      <img
        id={id as string}
        src={src}
        alt={alt}
        loading="lazy"
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

UIImage.displayName = 'UIImage';
UIImage.propTypes = propTypes;
UIImage.defaultProps = defaultProps;

export default React.memo(UIImage);

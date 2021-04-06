/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import buildClass from 'sonar-ui/helpers/buildClass';
import PropTypes, { InferProps } from 'prop-types';

const propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
  modifiers: PropTypes.string,
  itemProp: PropTypes.string,
};

const defaultProps = {
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
      dimensions = ratio.split(':').map((value) => parseInt(value, 10));
      return { width: dimensions[0], height: dimensions[1] };
  }
};

/**
 * Image.
 */
export default function UIImage(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { src, alt, ratio, modifiers, itemProp } = props;
  const dimensions = getDimensions(ratio);
  const className = buildClass('ui-image', `${ratio.replace(':', 'x')} ${modifiers}`.split(' '));

  // Custom aspect ratio...
  if (/^([0-9]+):([0-9]+)$/i.test(ratio) === true) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        width={dimensions.width}
        height={dimensions.height}
        itemProp={(itemProp !== null) ? itemProp : undefined}
      />
    );
  }

  // Standard aspect ratio...
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={dimensions.width}
        height={dimensions.height}
        itemProp={(itemProp !== null) ? itemProp : undefined}
      />
    </div>
  );
}

UIImage.displayName = 'UIImage';
UIImage.propTypes = propTypes;
UIImage.defaultProps = defaultProps;

/**
 * Copyright (c) KivFinance, Inc.
 * All rights reserved.
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
  const dimensions = ratio.split(':');
  return { width: parseInt(dimensions[0], 10), height: parseInt(dimensions[1], 10) };
};

/**
 * Image.
 */
export default function UIImage(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { src, alt, ratio, modifiers, itemProp } = props;
  const dimensions = getDimensions(ratio);

  const className = buildClass('ui-image', `${ratio.replace(':', 'x')} ${modifiers}`.split(' '));

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

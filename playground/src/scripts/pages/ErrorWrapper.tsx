/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';

interface State {
  errors: Error[];
  hasError: boolean;
}

type Props = InferProps<typeof ErrorWrapper.propTypes>;

/**
 * Catches generic errors and displays a generic UI.
 */
export default class ErrorWrapper extends React.Component<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  static displayName = 'ErrorWrapper';

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  };

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    children: null,
  };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errors: [] };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    console.error(error, errorInfo); // eslint-disable-line no-console
  }

  render(): JSX.Element {
    const { children } = this.props;
    const { hasError, errors } = this.state;
    if (hasError === true || errors.length > 0) {
      return (
        <h1>Something went wrong.</h1>
      );
    }
    return children as JSX.Element;
  }
}

import * as React from 'react';

interface State {
  errors: Error[];
  hasError: boolean;
}

interface Props {
  children: React.ReactNode;
}

/**
 * Catches generic errors and displays a generic UI.
 */
export default class ErrorWrapper extends React.Component<Props, State> {
  static displayName = 'ErrorWrapper';

  static getDerivedStateFromError(): { hasError: boolean; } {
    return { hasError: true };
  }

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errors: [] };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string; }): void {
    console.error(error, errorInfo);
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

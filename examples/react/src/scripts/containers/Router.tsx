import React from 'react';
import connect from 'diox/connectors/react';
import routes from 'scripts/store/routes';
import { store } from 'scripts/store/index';
import ErrorWrapper from 'scripts/pages/ErrorWrapper';

type Translate = (label: string) => string;
type LazyComponent = () => Promise<{ default: React.ComponentType<{ translate: Translate; }>; }>;

const useCombiner = connect(store);

/**
 * App router.
 */
export default function Router(props: { locale: Record<string, string>; }): JSX.Element {
  const routing = useCombiner('router', (newState) => newState);
  const { locale } = props;
  const { route } = routing;

  let currentPage = null;
  if (routes[route] !== undefined) {
    const Component = React.lazy(routes[route] as LazyComponent);
    currentPage = <Component translate={(label: string): string => locale[label] ?? label} />;
  }

  return (
    <ErrorWrapper>
      <React.Suspense fallback={<div>LOADING...</div>}>
        {currentPage}
      </React.Suspense>
    </ErrorWrapper>
  );
}

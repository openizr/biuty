/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import connect from 'diox/connectors/react';
import routes from 'scripts/store/reactRoutes';
import { store } from 'scripts/store/reactIndex';
import PropTypes, { InferProps } from 'prop-types';
import ErrorWrapper from 'scripts/pages/ErrorWrapper';

type LazyComponent = () => Promise<{ default: React.ComponentType<{ translate: () => string }> }>;

const useCombiner = connect(store);

const propTypes = {
  locale: PropTypes.instanceOf(Object).isRequired,
};

/**
 * App router.
 */
export default function Router(props: InferProps<typeof propTypes>): JSX.Element {
  const routing = useCombiner('router', (newState) => newState);
  const { locale } = props;
  const { route } = routing;

  let currentPage = null;
  if (routes[route] !== undefined) {
    const Component = React.lazy(routes[route] as LazyComponent) as JSXElement;
    currentPage = <Component locale={locale} />;
  }

  const Wrapper = ErrorWrapper as JSXElement;
  const Suspense = React.Suspense as JSXElement;
  return (
    <Wrapper>
      <Suspense fallback={<div>LOADING...</div>}>
        {currentPage}
      </Suspense>
    </Wrapper>
  );
}

Router.propTypes = propTypes;
Router.defaultProps = {};
Router.displayName = 'Router';

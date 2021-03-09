/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { i18n } from 'basx';
import { store } from 'scripts/store';
import React, { Suspense } from 'react';
import routes from 'scripts/store/routes';
import useStore from 'diox/connectors/react';
import PropTypes, { InferProps } from 'prop-types';
import ErrorWrapper from 'scripts/pages/ErrorWrapper';

type LazyComponent = () => Promise<{ default: React.ComponentType<{ translate: () => string }> }>;

const [useCombiner] = useStore(store);

const propTypes = {
  locale: PropTypes.instanceOf(Object).isRequired,
};

/**
 * App router.
 */
export default function Router(props: InferProps<typeof propTypes>): JSX.Element {
  const [routing] = useCombiner('router', (newState) => newState);
  const { locale } = props;
  const { route } = routing;

  let currentPage = null;
  if (routes[route] !== undefined) {
    const Component = React.lazy(routes[route] as LazyComponent);
    currentPage = <Component translate={i18n(locale as Record<string, string>)} />;
  }

  return (
    <ErrorWrapper>
      <Suspense fallback={<div>LOADING...</div>}>
        {currentPage}
      </Suspense>
    </ErrorWrapper>
  );
}

Router.propTypes = propTypes;
Router.defaultProps = {};
Router.displayName = 'Router';

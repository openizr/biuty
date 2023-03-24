<!-- App router. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Locale } from 'basx/i18n';
import connect from 'diox/connectors/vue';
import { defineAsyncComponent } from 'vue';
import routes from 'scripts/store/vueRoutes';
import { store } from 'scripts/store/vueIndex';
import { RoutingContext } from 'diox/extensions/router';

defineProps<{
  locale?: Locale;
}>();

const useCombiner = connect(store);
const router = useCombiner<RoutingContext>('router', (newState) => ({
  ...newState,
  route: newState.route || '',
}));
const lazyComponents = Object.keys(routes).reduce((components, currentRoute) => ({
  ...components,
  [currentRoute]: defineAsyncComponent({
    loader: routes[currentRoute],
    delay: 200,
    timeout: 5000,
  }),
}), {});
</script>

<template>
  <component
    :is="lazyComponents[router.route]"
    v-if="routes[router.route] !== undefined && locale !== null"
    :locale="locale"
  />
</template>

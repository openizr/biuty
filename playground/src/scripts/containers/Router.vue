<template>
  <!-- eslint-disable vue/no-v-html -->
  <component
    :is="componentName"
    v-if="componentName !== undefined"
    :translate="translate"
  />
</template>

<script lang="ts">
/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { i18n } from 'basx';
import useStore from 'diox/connectors/vue';
import routes from 'scripts/store/vueRoutes';
import { store } from 'scripts/store/vueIndex';

interface Locale {
  [label: string]: string;
}

const [useCombiner] = useStore(store);
const lazyComponents = Object.keys(routes).reduce((mapping, route, index) => ({
  ...mapping,
  [route]: `Component${index}`,
}), {}) as { [name: string]: string; };

/**
 * App router.
 */
export default useCombiner('router', {
  name: 'Router',
  components: Object.keys(routes).reduce((components, route) => ({
    ...components,
    [lazyComponents[route]]: routes[route],
  }), {}),
  props: {
    locale: {
      type: Object as () => Locale,
      required: true,
    },
  },
  data() {
    return {
      route: '',
    };
  },
  computed: {
    translate(): (label: string) => string {
      return i18n((this as unknown as { locale: Locale; }).locale);
    },
    componentName(): string {
      return routes[(this as unknown as { route: string; }).route] as string;
    },
  },
}, (newState) => ({ route: newState.route }));
</script>

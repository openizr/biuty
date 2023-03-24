/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Store from 'diox';
import router from 'diox/extensions/router';
import connect from 'diox/connectors/svelte';
import routes from 'scripts/store/svelteRoutes';

const store = new Store();
store.register('router', router(Object.keys(routes)));

export { Store, store };
export const useCombiner = connect(store);

/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Store from 'diox';
import router from 'diox/extensions/router';
import routes from 'scripts/store/vueRoutes';

const store = new Store();
store.register('router', router(Object.keys(routes)));

export { Store, store };

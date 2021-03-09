/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Vue from 'vue';
import 'styles/main.scss';
import Buttons from 'scripts/Buttons.vue';

// Webpack HMR interface.
interface ExtendedNodeModule extends NodeModule {
  hot: { accept: () => void };
}

function main(): void {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#root',
    components: { Buttons },
    render: (h) => h(Buttons, { props: {} }),
  });
  Vue.config.devtools = process.env.NODE_ENV !== 'production';
}

// Ensures DOM is fully loaded before running app's main logic.
// Loading hasn't finished yet...
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
  // `DOMContentLoaded` has already fired...
} else {
  main();
}

// Enables Hot Module Rendering.
if ((module as ExtendedNodeModule).hot) {
  (module as ExtendedNodeModule).hot.accept();
}

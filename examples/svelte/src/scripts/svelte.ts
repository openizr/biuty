/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'styles/main.scss';
import i18n from 'basx/i18n';
import type { SvelteComponent } from 'svelte';
import Router from 'scripts/containers/Router.svelte';

let app: SvelteComponent;

i18n();

async function main(): Promise<void> {
  const target = document.querySelector('#root') as HTMLElement;
  target.innerHTML = '';
  app = new Router({
    hydrate: false,
    target,
  });
}

// Ensures DOM is fully loaded before running app's main logic.
// Loading hasn't finished yet...
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
  // `DOMContentLoaded` has already fired...
} else {
  main();
}

// Ensures subscriptions to Store are correctly cleared when page is left, to prevent "ghost"
// processing, by manually unmounting Svelte components tree.
window.addEventListener('beforeunload', () => {
  app.$destroy();
});

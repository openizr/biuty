/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'styles/main.scss';
import i18n from 'basx/i18n';
import * as React from 'react';
import Router from 'scripts/containers/Router';
import { createRoot, Root } from 'react-dom/client';

i18n();

let app: Root;

function main(): void {
  app = createRoot(document.querySelector('#root') as HTMLElement);
  const StrictMode = React.StrictMode as JSXElement;
  app.render(
    <StrictMode>
      <Router locale={{}} />
    </StrictMode>,
  );
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
// processing, by manually unmounting React components tree.
window.addEventListener('beforeunload', () => {
  app.unmount();
});

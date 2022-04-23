/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

interface Routes {
  [path: string]: () => Promise<unknown>;
}

export default {
  // '/': () => import('scripts/pages/Home'),
  '/buttons': () => import('scripts/pages/Buttons.svelte'),
  '/images': () => import('scripts/pages/Images.svelte'),
  '/options': () => import('scripts/pages/Options.svelte'),
  '/textfields': () => import('scripts/pages/Textfields.svelte'),
  // '/file-uploaders': () => import('scripts/pages/FileUploaders'),
  '/textareas': () => import('scripts/pages/Textareas.svelte'),
  '/typography': () => import('scripts/pages/Typography.svelte'),
} as Routes;

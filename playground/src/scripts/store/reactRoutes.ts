/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export default {
  '/': () => import('scripts/pages/Home'),
  '/buttons': () => import('scripts/pages/Buttons'),
  '/images': () => import('scripts/pages/Images'),
  '/options': () => import('scripts/pages/Options'),
  '/textfields': () => import('scripts/pages/Textfields'),
  '/file-pickers': () => import('scripts/pages/FilePickers'),
  '/textareas': () => import('scripts/pages/Textareas'),
  '/typography': () => import('scripts/pages/Typography'),
  '/sass': () => import('scripts/pages/Sass'),
} as Record<string, unknown>;

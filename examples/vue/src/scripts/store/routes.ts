/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export default {
  '/': () => import('scripts/pages/Home.vue'),
  '/buttons': () => import('scripts/pages/ButtonsPage.vue'),
  '/images': () => import('scripts/pages/Images.vue'),
  '/options': () => import('scripts/pages/OptionsPage.vue'),
  '/textfields': () => import('scripts/pages/Textfields.vue'),
  '/file-pickers': () => import('scripts/pages/FilePickers.vue'),
  '/textareas': () => import('scripts/pages/Textareas.vue'),
  '/typography': () => import('scripts/pages/Typography.vue'),
  '/tooltips': () => import('scripts/pages/TooltipsPage.vue'),
} as Record<string, unknown>;

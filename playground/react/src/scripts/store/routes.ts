/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export default {
  '/': () => import('scripts/pages/Home'),
  '/buttons': () => import('scripts/pages/Buttons'),
  // '/typography': () => import('scripts/pages/Typography'),
  // '/markdown': () => import('scripts/pages/Markdown'),
  // '/images': () => import('scripts/pages/Images'),
  '/dropdowns': () => import('scripts/pages/Dropdowns'),
  '/textfields': () => import('scripts/pages/Textfields'),
  '/file-uploaders': () => import('scripts/pages/FileUploaders'),
  '/textareas': () => import('scripts/pages/Textareas'),
  // '/radios': () => import('scripts/pages/Radios'),
  '/checkboxes': () => import('scripts/pages/Checkboxes'),
  // '/icons': () => import('scripts/pages/Icons'),
} as Record<string, unknown>;

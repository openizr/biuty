export default {
  '/': () => import('scripts/pages/Home'),
  '/buttons': () => import('scripts/pages/Buttons'),
  '/images': () => import('scripts/pages/Images'),
  '/options': () => import('scripts/pages/Options'),
  '/textfields': () => import('scripts/pages/Textfields'),
  '/file-pickers': () => import('scripts/pages/FilePickers'),
  '/textareas': () => import('scripts/pages/Textareas'),
  '/typography': () => import('scripts/pages/Typography'),
  '/tooltips': () => import('scripts/pages/Tooltips'),
  '/sass': () => import('scripts/pages/Sass'),
} as Record<string, unknown>;

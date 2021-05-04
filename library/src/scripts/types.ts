/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare module 'scripts/types' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type Generic = Record<string, any>;
}

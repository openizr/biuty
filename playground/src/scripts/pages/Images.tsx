/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { UIImage } from 'biuty/react';

/**
 * Images page.
 */
export default function Images(): JSX.Element {
  return (
    <div>
      <main className="grid cols-3 hgap-3 vgap-5 items-center">
        <a href="/" className="cols-3">GO BACK</a>
        <UIImage ratio="square" src="https://picsum.photos/200/600" alt="img" />
        <UIImage ratio="square" src="https://picsum.photos/300/300" alt="img" />
        <UIImage ratio="square" src="https://picsum.photos/600/200" alt="img" />
        <UIImage ratio="square" src="https://picsum.photos/200/600" alt="img" />
        <UIImage ratio="150x250" src="https://picsum.photos/300/300" alt="img" />
        <UIImage ratio="panoramic" src="https://picsum.photos/600/200" alt="img" />
        <UIImage ratio="landscape" src="https://picsum.photos/200/600" alt="img" />
        <UIImage ratio="portrait" src="https://picsum.photos/300/300" alt="img" />
        <UIImage ratio="portrait" src="https://picsum.photos/600/200" alt="img" />
      </main>
    </div>
  );
}

Images.displayName = 'Images';

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';

/**
 * Home page.
 */
export default function Home(): JSX.Element {
  return (
    <div className="vgap-5">
      <main className="ui-page ui-block cols-3 hgap-3 vgap-5">
        <a href="/typography" className="cols-3">TYPOGRAPHY</a>
        <br />
        <a href="/images" className="cols-3">IMAGES</a>
        <br />
        <a href="/buttons" className="cols-3">BUTTONS</a>
        <br />
        <a href="/markdown" className="cols-3">MARKDOWN</a>
        <br />
        <a href="/options" className="cols-3">OPTIONS</a>
        <br />
        <a href="/textfields" className="cols-3">TEXTFIELDS</a>
        <br />
        <a href="/textareas" className="cols-3">TEXTAREAS</a>
        <br />
        <a href="/file-pickers" className="cols-3">FILE PICKERS</a>
        <br />
        <a href="/icons" className="cols-3">ICONS</a>
      </main>
    </div>
  );
}

Home.displayName = 'Home';

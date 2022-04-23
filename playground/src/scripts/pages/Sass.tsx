/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';

/**
 * SASS page.
 */
export default function Sass(): JSX.Element {
  return (
    <section>
      <div className="grid cols-1 hgap-1 vgap-6 xl:hgap-3 m:cols-3 l:cols-12 xl:flex nowrap flex-col ">
        <div className="column flex-auto col-1 grid cols-4 hgap-1">
          <div className="column2 column1" />
          <div className="column2 none" />
          <div className="column2 block" />
        </div>
        <div className="column flex-auto col-1" />
        <div className="column column4">
          <div className="column3" />
          <div className="column3" />
          <div className="column3" />
          <div className="column3" />
          <div className="column3" />
          <div className="column3" />
          <div className="column3 self-center" />
        </div>
        <div className="column flex-auto col-1" />
        <div className="column flex-auto col-1" />
        <div className="column flex-auto col-1" />
        <div className="column flex-auto col-1" />
        <div className="column flex-auto col-12" />
        <div className="column flex-auto col-1" />
        <div className="column flex-auto col-1" />
        <div className="column flex-auto col-1" />
        <div className="column flex-auto col-1" />
      </div>
    </section>
  );
}

Sass.displayName = 'Sass';

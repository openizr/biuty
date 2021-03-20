/**
 * Copyright (c) KivFinance, Inc.
 * All rights reserved.
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
        <a href="/images" className="cols-3">IMAGES</a>
        <a href="/radios" className="cols-3">RADIOS</a>
        <a href="/buttons" className="cols-3">BUTTONS</a>
        <a href="/markdown" className="cols-3">MARKDOWN</a>
        <a href="/dropdowns" className="cols-3">DROPDOWNS</a>
        <a href="/textfields" className="cols-3">TEXTFIELDS</a>
        <a href="/textareas" className="cols-3">TEXTAREAS</a>
        <a href="/file-uploaders" className="cols-3">FILE UPLOADERS</a>
        <a href="/radios" className="cols-3">RADIOS</a>
        <a href="/checkboxes" className="cols-3">CHECKBOXES</a>
        <a href="/icons" className="cols-3">ICONS</a>
      </main>
    </div>
  );
}

Home.displayName = 'Home';

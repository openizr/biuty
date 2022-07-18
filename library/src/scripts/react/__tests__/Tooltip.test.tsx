/**
 * @jest-environment jsdom
 */

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import UITooltip from 'scripts/react/Tooltip';
import { render, fireEvent } from '@testing-library/react';

const JSXUITooltip = UITooltip as JSXElement;

describe('react/UITooltip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(
      <JSXUITooltip label="Test" modifiers={null}>
        <button type="button">i</button>
      </JSXUITooltip>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with description', async () => {
    const { container } = render(
      <JSXUITooltip label="Test" description="Description">
        <button type="button">i</button>
      </JSXUITooltip>,
    );
    const button = container.getElementsByTagName('button')[0];
    fireEvent.focus(button);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.blur(button);
    expect(container.firstChild).toMatchSnapshot();
  });
});

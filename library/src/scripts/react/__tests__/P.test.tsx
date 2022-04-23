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
import UIP from 'scripts/react/P';
import { render } from '@testing-library/react';

const JSXUIP = UIP as JSXElement;

describe('react/UIP', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(<JSXUIP label="Test" modifiers="large" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const { container } = render(<JSXUIP label="Test" id="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with itemProp', () => {
    const { container } = render(<JSXUIP label="Test" itemProp="description" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

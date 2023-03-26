/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @vitest-environment jsdom
 */

import React from 'react';
import UITitle from 'scripts/react/Title';
import { render } from '@testing-library/react';

const JSXUITitle = UITitle as JSXElement;

describe('react/UITitle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(<JSXUITitle label="Test" modifiers="large" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const { container } = render(<JSXUITitle label="Test" id="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - modifier different than level', () => {
    const { container } = render(<JSXUITitle label="Test" level="1" modifiers="5 large" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with itemProp', () => {
    const { container } = render(<JSXUITitle label="Test" itemProp="name" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @vitest-environment jsdom
 */

import React from 'react';
import UILink from 'scripts/react/Link';
import { render } from '@testing-library/react';

const JSXUILink = UILink as JSXElement;

describe('react/UILink', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(<JSXUILink label="Test" href="https://test.com" modifiers="large" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const { container } = render(<JSXUILink label="Test" href="https://test.com" id="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with target', () => {
    const { container } = render(<JSXUILink label="Test" href="https://test.com" target="_blank" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with rel', () => {
    const { container } = render(<JSXUILink label="Test" href="https://test.com" rel="no referrer" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with itemProp', () => {
    const { container } = render(<JSXUILink label="Test" href="https://test.com" itemProp="name" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

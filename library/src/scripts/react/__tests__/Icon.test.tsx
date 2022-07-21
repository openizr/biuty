/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import React from 'react';
import UIIcon from 'scripts/react/Icon';
import { render } from '@testing-library/react';

const JSXUIIcon = UIIcon as JSXElement;

describe('react/UIIcon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(<JSXUIIcon name="star" modifiers="large" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const { container } = render(<JSXUIIcon name="star" id="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

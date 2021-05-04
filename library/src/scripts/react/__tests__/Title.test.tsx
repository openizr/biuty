/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import UITitle from 'scripts/react/Title';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = document.createElement('div');

describe('react/UITitle', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.clearAllMocks();
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    ((container as unknown) as null) = null;
  });

  test('renders correctly - basic', () => {
    act(() => {
      render(<UITitle label="Test" level="1" modifiers="large" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - modifier different than level', () => {
    act(() => {
      render(<UITitle label="Test" level="1" modifiers="5 large" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    act(() => {
      render(<UITitle label="Test" id="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with itemprop', () => {
    act(() => {
      render(<UITitle label="Test" itemProp="name" />, container);
    });
    expect(container).toMatchSnapshot();
  });
});

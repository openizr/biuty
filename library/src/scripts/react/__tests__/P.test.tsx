/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import UIP from 'scripts/react/P';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = document.createElement('div');

describe('react/UIP', () => {
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
      render(<UIP label="Test" modifiers="large" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    act(() => {
      render(<UIP label="Test" id="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with itemProp', () => {
    act(() => {
      render(<UIP label="Test" itemProp="description" />, container);
    });
    expect(container).toMatchSnapshot();
  });
});

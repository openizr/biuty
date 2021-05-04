/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import UIImage from 'scripts/react/Image';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = document.createElement('div');

describe('react/UIImage', () => {
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
      render(<UIImage alt="test" src="https://test.com/a.jpg" ratio="square" modifiers="large" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - custom ratio', () => {
    act(() => {
      render(<UIImage alt="test" src="https://test.com/a.jpg" ratio="25:32" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    act(() => {
      render(<UIImage id="test" alt="test" src="https://test.com/a.jpg" ratio="portrait" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - standard ratio with itemprop', () => {
    act(() => {
      render(<UIImage itemProp="image" alt="test" src="https://test.com/a.jpg" ratio="landscape" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - custom ratio with itemprop', () => {
    act(() => {
      render(<UIImage itemProp="image" alt="test" src="https://test.com/a.jpg" ratio="1:5" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with panoramic ratio', () => {
    act(() => {
      render(<UIImage alt="test" src="https://test.com/a.jpg" ratio="panoramic" />, container);
    });
    expect(container).toMatchSnapshot();
  });
});

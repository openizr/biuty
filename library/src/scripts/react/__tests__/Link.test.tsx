/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import UILink from 'scripts/react/Link';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = document.createElement('div');

describe('react/UILink', () => {
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
      render(<UILink label="Test" href="https://test.com" modifiers="large" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    act(() => {
      render(<UILink id="test" label="Test" href="https://test.com" />, container);
    });
    const link = document.querySelector('a') as HTMLAnchorElement;
    act(() => {
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with listener', () => {
    const onClick = jest.fn();
    act(() => {
      render(<UILink onClick={onClick} label="Test" href="https://test.com" />, container);
    });
    const link = document.querySelector('a') as HTMLAnchorElement;
    act(() => {
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container).toMatchSnapshot();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

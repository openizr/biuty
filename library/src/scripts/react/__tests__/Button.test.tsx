/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import UIButton from 'scripts/react/Button';
import { render, unmountComponentAtNode } from 'react-dom';

describe('react/UIButton', () => {
  let container = document.createElement('div');

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
      render(<UIButton label="Test" modifiers="large" />, container);
    });
    const button = document.querySelector('button') as HTMLButtonElement;
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      button.focus();
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with id and listeners', () => {
    const onClick = jest.fn();
    const onFocus = jest.fn();
    act(() => {
      render(<UIButton id="test" onClick={onClick} onFocus={onFocus} label="Test" modifiers="large" />, container);
    });
    const button = document.querySelector('#test') as HTMLButtonElement;
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      button.focus();
    });
    expect(container).toMatchSnapshot();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  test('renders correctly - no label', () => {
    act(() => {
      render(<UIButton />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - label with icon', () => {
    act(() => {
      render(<UIButton label="Test" icon="star" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - type submit', () => {
    act(() => {
      render(<UIButton label="Test" type="submit" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - icon only', () => {
    act(() => {
      render(<UIButton icon="star" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - right icon', () => {
    act(() => {
      render(<UIButton icon="star" iconPosition="right" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    act(() => {
      render(<UIButton modifiers="disabled" />, container);
    });
    expect(container).toMatchSnapshot();
  });
});

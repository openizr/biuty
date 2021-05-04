/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import UITextfield from 'scripts/react/Textfield';
import { act, Simulate } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

type Target = any; // eslint-disable-line @typescript-eslint/no-explicit-any

let container = document.createElement('div');
jest.mock('scripts/helpers/generateRandomId');

describe('react/UITextfield', () => {
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
      render(<UITextfield name="test" modifiers="large" />, container);
    });
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      Simulate.focus(input);
    });
    act(() => {
      Simulate.change(input, { target: { value: 'new test' } as Target });
    });
    act(() => {
      Simulate.blur(input);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    act(() => {
      render(<UITextfield name="test" id="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with type number', () => {
    act(() => {
      render(<UITextfield name="test" type="number" min={0} max={30} step={10} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with type text', () => {
    act(() => {
      render(<UITextfield name="test" type="text" maxlength={10} size={10} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    act(() => {
      render(<UITextfield name="test" placeholder="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    act(() => {
      render(<UITextfield name="test" helper="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    act(() => {
      render(<UITextfield name="test" label="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    act(() => {
      render(<UITextfield name="test" value="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with left icon', () => {
    act(() => {
      render(<UITextfield name="test" icon="star" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with right icon', () => {
    act(() => {
      render(<UITextfield name="test" icon="star" iconPosition="right" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    act(() => {
      render(<UITextfield name="test" modifiers="disabled" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - autocomplete off', () => {
    act(() => {
      render(<UITextfield name="test" autocomplete="off" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - readonly', () => {
    const onChange = jest.fn();
    act(() => {
      render(<UITextfield name="test" readonly onChange={onChange} />, container);
    });
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      Simulate.change(input, { target: { value: 'new test' } as Target });
    });
    expect(container).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('renders correctly - with listeners', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const onIconClick = jest.fn();
    act(() => {
      render(
        <UITextfield
          name="test"
          icon="star"
          value="test"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onIconClick={onIconClick}
        />,
        container,
      );
    });
    const icon = document.querySelector('i') as HTMLElement;
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      Simulate.focus(input);
    });
    act(() => {
      Simulate.change(input, { target: { value: 'new test' } as Target });
    });
    act(() => {
      Simulate.blur(input);
    });
    act(() => {
      Simulate.click(icon);
    });
    expect(container).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith('test');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new test');
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith('new test');
    expect(onIconClick).toHaveBeenCalledTimes(1);
  });
});

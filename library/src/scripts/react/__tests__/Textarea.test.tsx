/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import UITextarea from 'scripts/react/Textarea';
import { act, Simulate } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

type Target = any; // eslint-disable-line @typescript-eslint/no-explicit-any
let container = document.createElement('div');
jest.useFakeTimers();
jest.mock('scripts/helpers/markdown');
jest.mock('scripts/helpers/generateRandomId');

describe('react/UITextarea', () => {
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
      render(<UITextarea name="test" modifiers="large" />, container);
    });
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    act(() => {
      Simulate.focus(textarea);
    });
    act(() => {
      Simulate.change(textarea, { target: { value: 'test' } as Target });
    });
    act(() => {
      Simulate.blur(textarea);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    act(() => {
      render(<UITextarea name="test" id="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with cols and rows', () => {
    act(() => {
      render(<UITextarea name="test" cols={10} rows={50} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    act(() => {
      render(<UITextarea name="test" placeholder="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    act(() => {
      render(<UITextarea name="test" helper="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    act(() => {
      render(<UITextarea name="test" label="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    act(() => {
      render(<UITextarea name="test" value="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with maxlength', () => {
    act(() => {
      render(<UITextarea name="test" maxlength={10} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    act(() => {
      render(<UITextarea name="test" modifiers="disabled" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - autocomplete off', () => {
    act(() => {
      render(<UITextarea name="test" autocomplete="off" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - readonly', () => {
    const onChange = jest.fn();
    act(() => {
      render(<UITextarea name="test" readonly onChange={onChange} />, container);
    });
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    act(() => {
      Simulate.change(textarea, { target: { value: 'test' } as Target });
    });
    expect(container).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('renders correctly - with listeners', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    act(() => {
      render(
        <UITextarea
          name="test"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value="test"
        />,
        container,
      );
    });
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    act(() => {
      Simulate.focus(textarea);
    });
    act(() => {
      Simulate.change(textarea, { target: { value: 'new test' } as Target });
    });
    act(() => {
      Simulate.blur(textarea);
    });
    jest.runAllTimers();
    expect(container).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith('test');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new test');
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith('new test');
  });

  test('renders correctly - with listener and debounce', () => {
    const onChange = jest.fn();
    act(() => {
      render(
        <UITextarea
          name="test"
          value="test"
          onChange={onChange}
          debounceTimeout={250}
        />,
        container,
      );
    });
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    act(() => {
      Simulate.change(textarea, { target: { value: 'new test' } as Target });
    });
    jest.runAllTimers();
    expect(container).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new test');
  });
});

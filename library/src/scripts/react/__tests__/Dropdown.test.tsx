/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import UIDropdown from 'scripts/react/Dropdown';
import { act, Simulate } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = document.createElement('div');
jest.mock('scripts/helpers/markdown');
jest.mock('scripts/helpers/generateRandomId');
const options: { type: string; value?: string; label?: string; disabled?: boolean; }[] = [
  { type: 'option', value: 'option1', label: 'Option 1' },
  { type: 'divider' },
  { type: 'option', value: 'option2', label: 'Option 2' },
  { type: 'option', value: 'option3', label: 'Option 3' },
  { type: 'header' },
  { type: 'option', value: 'option4', label: 'Option 4' },
];

describe('react/UIDropdown', () => {
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
      render(<UIDropdown name="test" modifiers="large" options={options} />, container);
    });
    const input = document.querySelector('input') as HTMLInputElement;
    const li = document.querySelector('li') as HTMLLIElement;
    act(() => {
      Simulate.mouseDown(input);
    });
    act(() => {
      Simulate.mouseDown(li);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    act(() => {
      render(<UIDropdown name="test" id="test" options={options} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    act(() => {
      render(<UIDropdown name="test" label="test" options={options} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    act(() => {
      render(<UIDropdown name="test" helper="test" options={options} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    act(() => {
      render(<UIDropdown name="test" value={['option1', 'option3']} options={options} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with icon', () => {
    act(() => {
      render(<UIDropdown name="test" icon="star" options={options} value={['option1']} />, container);
    });
    const icon = document.querySelector('i') as HTMLElement;
    act(() => {
      Simulate.click(icon);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - disabled with icon', () => {
    act(() => {
      render(<UIDropdown name="test" icon="star" options={options} modifiers="disabled" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    act(() => {
      render(<UIDropdown name="test" options={options} modifiers="disabled" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - multiple', () => {
    act(() => {
      render(<UIDropdown name="test" multiple options={options} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with option disabled', () => {
    const onChange = jest.fn();
    act(() => {
      render(
        <UIDropdown
          name="test"
          options={[{
            type: 'option', value: 'option5', label: 'Option 5', disabled: true,
          }]}
          onChange={onChange}
          modifiers="disabled"
        />,
        container,
      );
    });
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      Simulate.change(input);
    });
    expect(container).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('renders correctly - expanded', () => {
    act(() => {
      render(<UIDropdown name="test" options={options} />, container);
    });
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      Simulate.mouseDown(input);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - expanded with no option and small viewport', () => {
    window = Object.assign(window, { innerHeight: -1 }); // eslint-disable-line no-global-assign
    act(() => {
      render(<UIDropdown name="test" options={[]} />, container);
    });
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      Simulate.mouseDown(input);
    });
    expect(container).toMatchSnapshot();
    window = Object.assign(window, { innerHeight: 768 }); // eslint-disable-line no-global-assign
  });

  test('renders correctly - expanded with value', () => {
    act(() => {
      render(<UIDropdown name="test" options={options} value={['option1']} />, container);
    });
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      Simulate.mouseDown(input);
    });
    expect(container).toMatchSnapshot();
  });

  test('correctly handles keyboard navigation', () => {
    act(() => {
      render(<UIDropdown name="test" options={options} value={['option1']} />, container);
    });
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      Simulate.keyDown(input, { key: 'ArrowUp' });
      Simulate.keyDown(input, { key: 'ArrowDown' });
      Simulate.keyDown(input, { key: 'ArrowUp' });
      Simulate.keyDown(input, { key: 'PageDown' });
      Simulate.keyDown(input, { key: 'End' });
    });
    act(() => {
      Simulate.keyDown(input, { key: 'ArrowDown' });
      Simulate.keyDown(input, { key: 'PageUp' });
      Simulate.keyDown(input, { key: 'Home' });
      Simulate.keyDown(input, { key: ' ' });
      Simulate.keyDown(input, { key: 'Enter' });
      Simulate.keyDown(input, { key: 'Escape' });
      Simulate.keyDown(input, { key: 'Enter' });
    });
    act(() => {
      Simulate.keyDown(input, { key: 'A' });
      Simulate.keyDown(input, { key: 'Enter' });
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with listeners', () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    act(() => {
      render(
        <UIDropdown
          name="test"
          value={['option2']}
          options={options}
          onChange={onChange}
          onFocus={onFocus}
        />,
        container,
      );
    });
    const input = document.querySelector('input') as HTMLInputElement;
    const li = document.querySelector('li') as HTMLLIElement;
    act(() => {
      Simulate.mouseDown(input);
    });
    act(() => {
      Simulate.mouseDown(li);
    });
    expect(container).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(3);
    expect(onFocus).toHaveBeenNthCalledWith(1, 'option2');
    expect(onFocus).toHaveBeenNthCalledWith(2, 'option1');
    expect(onFocus).toHaveBeenNthCalledWith(3, undefined);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['option1']);
  });

  test('renders correctly - multiple with listeners', () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    act(() => {
      render(
        <UIDropdown
          name="test"
          value={['option2']}
          options={options}
          onChange={onChange}
          onFocus={onFocus}
          multiple
        />,
        container,
      );
    });
    const input = document.querySelector('input') as HTMLInputElement;
    const li = document.querySelector('li') as HTMLLIElement;
    act(() => {
      Simulate.mouseDown(input);
    });
    act(() => {
      Simulate.mouseDown(li);
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, ['option2', 'option1']);
    act(() => {
      Simulate.mouseDown(li);
    });
    expect(container).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(3);
    expect(onFocus).toHaveBeenNthCalledWith(1, 'option2');
    expect(onFocus).toHaveBeenNthCalledWith(2, 'option1');
    expect(onFocus).toHaveBeenNthCalledWith(3, 'option1');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(2, ['option2']);
  });
});

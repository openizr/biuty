/**
 * @jest-environment jsdom
 */

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import UIOptions from 'scripts/react/Options';
import { render, fireEvent, act } from '@testing-library/react';

const JSXUIOptions = UIOptions as JSXElement;

jest.mock('scripts/helpers/generateRandomId');

const selectOptions: { type: string; value?: string; label?: string; disabled?: boolean; }[] = [
  { type: 'option', value: 'option1', label: 'Option 1' },
  { type: 'divider' },
  { type: 'option', value: 'option2', label: 'Option 2' },
  { type: 'option', value: 'option3', label: 'Option 3' },
  { type: 'header' },
  { type: 'option', value: 'option4', label: 'Option 4' },
];

const options: { type: string; value?: string; label?: string; disabled?: boolean; }[] = [
  { type: 'option', value: 'option1', label: 'Option 1' },
  { type: 'option', value: 'option2', label: 'Option 2' },
  { type: 'option', value: 'option3', label: 'Option 3' },
  { type: 'option', value: 'option4', label: 'Option 4' },
];

describe('react/UIOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic select', async () => {
    const { container } = render(<JSXUIOptions name="test" modifiers="large" select options={selectOptions} />);
    await fireEvent.mouseDown(container.getElementsByTagName('button')[0]);
    await fireEvent.mouseDown(container.getElementsByTagName('li')[0]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with id', () => {
    const { container } = render(<JSXUIOptions name="test" id="test" select options={selectOptions} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with label', () => {
    const { container } = render(<JSXUIOptions name="test" label="test" select options={selectOptions} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with helper', () => {
    const { container } = render(<JSXUIOptions name="test" helper="test" select options={selectOptions} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with value', () => {
    const { container } = render(<JSXUIOptions name="test" value={['option1', 'option3']} select options={selectOptions} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select disabled', () => {
    const { container } = render(<JSXUIOptions name="test" modifiers="disabled" select options={selectOptions} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with option disabled', async () => {
    const onChange = jest.fn();
    const { container } = render(<JSXUIOptions
      name="test"
      select
      options={[{
        type: 'option', value: 'option5', label: 'Option 5', disabled: true,
      }]}
      onChange={onChange}
    />);
    await fireEvent.change(container.getElementsByTagName('button')[0]);
    expect(onChange).not.toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select expanded', async () => {
    const { container } = render(<JSXUIOptions name="test" select options={selectOptions} />);
    await fireEvent.mouseDown(container.getElementsByTagName('button')[0]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select changing options', async () => {
    const { container } = render(<JSXUIOptions name="test" select options={selectOptions} />);
    await fireEvent.keyDown(container.getElementsByTagName('button')[0], { key: 'End' });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select expanded with no option and small viewport', async () => {
    Object.assign(window, { innerHeight: -1 });
    const { container } = render(<JSXUIOptions name="test" select options={[]} />);
    await fireEvent.mouseDown(container.getElementsByTagName('button')[0]);
    expect(container.firstChild).toMatchSnapshot();
    Object.assign(window, { innerHeight: 768 });
  });

  test('renders correctly - select expanded with value', async () => {
    const { container } = render(<JSXUIOptions name="test" select options={selectOptions} value={['option1']} />);
    await fireEvent.mouseDown(container.getElementsByTagName('button')[0]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('correctly handles select keyboard navigation', async () => {
    const { container } = render(<JSXUIOptions name="test" select options={selectOptions} value={['option1']} />);
    const button = container.getElementsByTagName('button')[0];
    await fireEvent.focus(button);
    await fireEvent.keyDown(button, { key: 'ArrowUp' });
    await fireEvent.keyDown(button, { key: 'ArrowDown' });
    await fireEvent.keyDown(button, { key: 'PageDown' });
    await fireEvent.keyDown(button, { key: 'End' });
    await fireEvent.keyDown(button, { key: 'ArrowDown' });
    await fireEvent.keyDown(button, { key: 'PageUp' });
    await fireEvent.keyDown(button, { key: 'Home' });
    await fireEvent.keyDown(button, { key: ' ' });
    await fireEvent.keyDown(button, { key: 'Enter' });
    await fireEvent.keyDown(button, { key: 'Escape' });
    await fireEvent.keyDown(button, { key: 'Enter' });
    await fireEvent.keyDown(button, { key: 'A' });
    await fireEvent.keyDown(button, { key: 'Enter' });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with listeners', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    jest.useFakeTimers();
    const { container } = render(<JSXUIOptions name="test" select options={selectOptions} value="option2" onChange={onChange} onFocus={onFocus} />);
    const li = container.getElementsByTagName('li')[0];
    const button = container.getElementsByTagName('button')[0];
    await fireEvent.focus(button);
    await fireEvent.mouseDown(button);
    await act(async () => { jest.runAllTimers(); });
    await fireEvent.mouseDown(li);
    await fireEvent.blur(li);
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(3);
    expect(onFocus).toHaveBeenNthCalledWith(1, '', expect.any(Object));
    expect(onFocus).toHaveBeenNthCalledWith(2, 'option2', expect.any(Object));
    expect(onFocus).toHaveBeenNthCalledWith(3, '', expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('option1', expect.any(Object));
    jest.useRealTimers();
  });

  test('renders correctly - multiple select with listeners', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const { container } = render(<JSXUIOptions name="test" select options={selectOptions} value="option2" onChange={onChange} onFocus={onFocus} multiple />);
    const li = container.getElementsByTagName('li')[0];
    const button = container.getElementsByTagName('button')[0];
    await fireEvent.focus(button);
    await fireEvent.mouseDown(button);
    await fireEvent.focus(li);
    await fireEvent.mouseDown(li);
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, ['option2', 'option1'], expect.any(Object));
    await fireEvent.mouseDown(li);
    expect(onFocus).toHaveBeenCalledTimes(2);
    expect(onFocus).toHaveBeenNthCalledWith(1, '', expect.any(Object));
    expect(onFocus).toHaveBeenNthCalledWith(2, 'option1', expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(2, ['option2'], expect.any(Object));
  });

  test('select correctly focuses last available option when narrowing options down', async () => {
    const onFocus = jest.fn();
    const { container, rerender } = render(<JSXUIOptions name="test" select options={selectOptions} value="option3" onFocus={onFocus} multiple />);
    const li = container.getElementsByTagName('li')[3];
    const button = container.getElementsByTagName('button')[0];
    await fireEvent.focus(button);
    await fireEvent.mouseDown(button);
    await fireEvent.focus(li);
    rerender(<JSXUIOptions name="test" select options={selectOptions.slice(0, 2)} value="option3" onFocus={onFocus} multiple />);
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(3);
    expect(onFocus).toHaveBeenNthCalledWith(1, '', expect.any(Object));
    expect(onFocus).toHaveBeenNthCalledWith(2, 'option3', expect.any(Object));
    expect(onFocus).toHaveBeenNthCalledWith(3, 'option1', expect.any(Object));
  });

  test('select correctly updates current value when changing value and multiple props', async () => {
    const { container, rerender } = render(<JSXUIOptions name="test" select options={selectOptions} value={['option3']} multiple />);
    rerender(<JSXUIOptions name="test" select options={selectOptions} value={['option1', 'option2']} multiple />);
    expect(container.firstChild).toMatchSnapshot();
    rerender(<JSXUIOptions name="test" select options={selectOptions} value="option1" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio basic', () => {
    const { container } = render(<JSXUIOptions name="test" options={options} modifiers="large" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with id', () => {
    const { container } = render(<JSXUIOptions name="test" id="test" options={options} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with label', () => {
    const { container } = render(<JSXUIOptions name="test" label="test" options={options} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with helper', () => {
    const { container } = render(<JSXUIOptions name="test" helper="test" options={options} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with value', () => {
    const { container } = render(<JSXUIOptions name="test" options={options} value={['option1']} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio disabled', () => {
    const { container } = render(<JSXUIOptions name="test" options={options} modifiers="disabled" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with option disabled', () => {
    const { container } = render(<JSXUIOptions name="test" options={[{ value: 'option5', label: 'Option 5', disabled: true }]} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio  with listeners', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const { container } = render(<JSXUIOptions name="test" options={options} onChange={onChange} onFocus={onFocus} />);
    const input = container.getElementsByTagName('input')[2];
    await fireEvent.focus(input);
    await fireEvent.click(input);
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith('option3', expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('option3', expect.any(Object));
  });

  test('correctly handles checkboxes keyboard navigation', async () => {
    const { container } = render(<JSXUIOptions name="test" multiple options={options} />);
    const input = container.getElementsByTagName('input')[1];
    await fireEvent.keyDown(input, { key: 'ArrowLeft' });
    await fireEvent.keyDown(input, { key: 'ArrowRight' });
    await fireEvent.focus(container.getElementsByTagName('input')[0]);
    await fireEvent.keyDown(input, { key: ' ' });
    expect(container.firstChild).toMatchSnapshot();
  });
});

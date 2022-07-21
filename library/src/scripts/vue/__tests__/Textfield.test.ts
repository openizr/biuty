/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import UITextfield from 'scripts/vue/Textfield.vue';
import { render, fireEvent } from '@testing-library/vue';

jest.mock('scripts/helpers/generateRandomId');

describe('vue/UITextfield', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', async () => {
    const { container } = render(UITextfield, { props: { name: 'test', modifiers: 'large', size: 100 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', async () => {
    const { container } = render(UITextfield, { props: { name: 'test', id: 'my-id', size: 100 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with autofocus', async () => {
    const { container } = render(UITextfield, { props: { name: 'test', autofocus: true, size: 100 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with type number', async () => {
    const { container } = render(UITextfield, {
      props: {
        name: 'test', type: 'number', min: 0, max: 30, step: 10, size: 100,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with left icon', () => {
    const { container } = render(UITextfield, { props: { name: 'test', icon: 'star', size: 100 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with right icon', () => {
    const { container } = render(UITextfield, {
      props: {
        name: 'test', icon: 'star', iconPosition: 'right', size: 100,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    const { container } = render(UITextfield, { props: { name: 'test', placeholder: 'test...', size: 100 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const { container } = render(UITextfield, { props: { name: 'test', label: '*Label*', size: 100 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const { container } = render(UITextfield, { props: { name: 'test', helper: '*Helper*', size: 100 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with value', async () => {
    jest.useFakeTimers();
    const { container, rerender } = render(UITextfield, { props: { name: 'test', size: 100 } });
    await rerender({ value: 'my value' });
    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
    // Covers default value's value.
    await rerender({ value: undefined });
    jest.runAllTimers();
  });

  test('renders correctly - with disabled', async () => {
    const onChange = jest.fn();
    const { container } = render(UITextfield, { props: { name: 'test', modifiers: 'disabled', size: 100 } });
    const input = container.getElementsByTagName('input')[0];
    await fireEvent.update(input, 'new value');
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders correctly - autocomplete off', () => {
    const { container } = render(UITextfield, { props: { name: 'test', autocomplete: 'off', size: 100 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - readonly', async () => {
    const onChange = jest.fn();
    const { container } = render(UITextfield, {
      props: {
        name: 'test', readonly: true, onChange, size: 100,
      },
    });
    const input = container.getElementsByTagName('input')[0];
    await fireEvent.keyDown(input, { key: 'A' });
    await fireEvent.keyDown(input, { key: 'a', ctrlKey: true });
    await fireEvent.keyDown(input, { key: 'a', shiftKey: true });
    await fireEvent.keyDown(input, { key: 'a', altKey: true });
    await fireEvent.keyDown(input, { key: 'a', metaKey: true });
    await fireEvent.update(input, 'new value');
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders correctly - with transform and allowedKeys', async () => {
    const onChange = jest.fn();
    const onKeyDown = jest.fn();
    const onPaste = jest.fn();
    const transform = (value: string): [string, number?] => [value.toUpperCase()];
    const { container, rerender } = render(UITextfield, {
      props: {
        name: 'test',
        size: 10,
        onChange,
        onKeyDown,
        onPaste,
        transform,
        allowedKeys: {
          default: /[a-z]/i,
          altKey: /[a-z]/i,
          shiftKey: /[a-z]/i,
          metaKey: /[a-z]/i,
          ctrlKey: /[a-z]/i,
        },
      },
    });
    const input = container.getElementsByTagName('input')[0];
    await fireEvent.keyDown(input, { key: 'A' });
    await fireEvent.keyDown(input, { key: '0' });
    await fireEvent.keyDown(input, { key: 'a', ctrlKey: true });
    await fireEvent.keyDown(input, { key: 'a', shiftKey: true });
    await fireEvent.keyDown(input, { key: 'a', altKey: true });
    await fireEvent.keyDown(input, { key: 'a', metaKey: true });
    await fireEvent.update(input, 'new 015 test');
    await fireEvent.paste(input, { clipboardData: { getData: jest.fn(() => 'and 89') } });
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalledTimes(5);
    expect(onKeyDown).toHaveBeenCalledWith(expect.any(Object));
    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(onPaste).toHaveBeenCalledWith(expect.any(Object));
    await rerender({
      name: 'test', size: 10, transform: null, allowedKeys: { default: /z/i },
    });
    await fireEvent.update(input, 'zzzzzzzzzzzz');
    await fireEvent.paste(input, { target: { selectionStart: 0 }, clipboardData: { getData: jest.fn(() => 'zzz') } });
    await fireEvent.update(input, 'qsdqsd');
    await fireEvent.paste(input, { target: { selectionStart: 0 }, clipboardData: { getData: jest.fn(() => 'sqdqsd') } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with listeners and debounce', async () => {
    jest.useFakeTimers();
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onChange = jest.fn();
    const onIconClick = jest.fn();
    const onIconKeyDown = jest.fn();
    const transform = (value: string): [string, number?] => [value.toUpperCase(), 1];
    const { container } = render(UITextfield, {
      props: {
        name: 'test',
        icon: 'star',
        onBlur,
        onFocus,
        onChange,
        onIconClick,
        transform,
        size: 100,
        debounceTimeout: 250,
        onIconKeyDown,
      },
    });
    const input = container.getElementsByTagName('input')[0];
    const icon = container.getElementsByTagName('i')[0];
    await fireEvent.focus(input);
    await fireEvent.blur(input);
    await fireEvent.keyDown(icon);
    await fireEvent.click(icon);
    await fireEvent.update(input, 'new 015 test');
    await fireEvent.paste(input, { clipboardData: { getData: jest.fn(() => 'and 89 OKOK') } });
    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith('', expect.any(Object));
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith('', expect.any(Object));
    expect(onIconClick).toHaveBeenCalledTimes(1);
    expect(onIconClick).toHaveBeenCalledWith(expect.any(Object));
    expect(onIconKeyDown).toHaveBeenCalledTimes(1);
    expect(onIconKeyDown).toHaveBeenCalledWith(expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('NAND 89 OKOKEW 015 TEST', expect.any(Object));
  });
});

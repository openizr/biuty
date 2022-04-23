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

import UITextfield from 'scripts/svelte/Textfield.svelte';
import { render, fireEvent } from '@testing-library/svelte';

jest.mock('scripts/helpers/generateRandomId');

describe('svelte/UITextfield', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', async () => {
    const { container } = render(UITextfield, { props: { name: 'test', modifiers: 'large' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', async () => {
    const { container } = render(UITextfield, { props: { name: 'test', id: 'my-id' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with type number', async () => {
    const { container } = render(UITextfield, {
      props: {
        name: 'test', type: 'number', min: 0, max: 30, step: 10,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with left icon', () => {
    const { container } = render(UITextfield, { props: { name: 'test', icon: 'star' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with right icon', () => {
    const { container } = render(UITextfield, {
      props: {
        name: 'test', icon: 'star', iconPosition: 'right',
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    const { container } = render(UITextfield, { props: { name: 'test', placeholder: 'test...' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const { container } = render(UITextfield, { props: { name: 'test', label: '*Label*' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const { container } = render(UITextfield, { props: { name: 'test', helper: '*Helper*' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    const { container } = render(UITextfield, { props: { name: 'test', value: 'my value' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with disabled', async () => {
    const onChange = jest.fn();
    const { container, component } = render(UITextfield, { props: { name: 'test', modifiers: 'disabled' } });
    component.$on('change', onChange);
    const input = container.getElementsByTagName('input')[0];
    await fireEvent.input(input, { value: 'new value' });
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders correctly - autocomplete off', () => {
    const { container } = render(UITextfield, { props: { name: 'test', autocomplete: 'off' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - readonly', async () => {
    const onChange = jest.fn();
    const { container, component } = render(UITextfield, { props: { name: 'test', readonly: true } });
    component.$on('change', onChange);
    const input = container.getElementsByTagName('input')[0];
    await fireEvent.keyDown(input, { key: 'A' });
    await fireEvent.keyDown(input, { key: 'a', ctrlKey: true });
    await fireEvent.keyDown(input, { key: 'a', shiftKey: true });
    await fireEvent.keyDown(input, { key: 'a', altKey: true });
    await fireEvent.keyDown(input, { key: 'a', metaKey: true });
    await fireEvent.input(input, { value: 'new value' });
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders correctly - with transform and allowedKeys', async () => {
    const onChange = jest.fn();
    const onKeyDown = jest.fn();
    const onPaste = jest.fn();
    const transform = (value: string): [string, number?] => [value.toUpperCase()];
    const { container, rerender, component } = render(UITextfield, {
      props: {
        name: 'test',
        size: 10,
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
    component.$on('paste', onPaste);
    component.$on('change', onChange);
    component.$on('keyDown', onKeyDown);
    const input = container.getElementsByTagName('input')[0];
    await fireEvent.keyDown(input, { key: 'A' });
    await fireEvent.keyDown(input, { key: '0' });
    await fireEvent.keyDown(input, { key: 'a', ctrlKey: true });
    await fireEvent.keyDown(input, { key: 'a', shiftKey: true });
    await fireEvent.keyDown(input, { key: 'a', altKey: true });
    await fireEvent.keyDown(input, { key: 'a', metaKey: true });
    await fireEvent.input(input, { value: 'new 015 test' });
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
    await fireEvent.input(input, { value: 'zzzzzzzzzzzz' });
    await fireEvent.paste(input, { target: { selectionStart: 0 }, clipboardData: { getData: jest.fn(() => 'zzz') } });
    await fireEvent.input(input, { value: 'qsdqsd' });
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
    const { container, component } = render(UITextfield, {
      props: {
        name: 'test',
        icon: 'star',
        transform,
        size: 100,
        debounceTimeout: 250,
      },
    });
    component.$on('blur', onBlur);
    component.$on('focus', onFocus);
    component.$on('change', onChange);
    component.$on('iconClick', onIconClick);
    component.$on('iconKeyDown', onIconKeyDown);
    const input = container.getElementsByTagName('input')[0];
    const icon = container.getElementsByTagName('i')[0];
    await fireEvent.focus(input);
    await fireEvent.blur(input);
    await fireEvent.keyDown(icon);
    await fireEvent.click(icon);
    await fireEvent.input(input, { value: 'new 015 test' });
    await fireEvent.paste(input, { clipboardData: { getData: jest.fn(() => 'and 89 OKOK') } });
    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(expect.any(Object));
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(expect.any(Object));
    expect(onIconClick).toHaveBeenCalledTimes(1);
    expect(onIconClick).toHaveBeenCalledWith(expect.any(Object));
    expect(onIconKeyDown).toHaveBeenCalledTimes(1);
    expect(onIconKeyDown).toHaveBeenCalledWith(expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import UITextarea from 'scripts/svelte/Textarea.svelte';
import { render, fireEvent } from '@testing-library/svelte';

jest.useFakeTimers();
jest.mock('scripts/helpers/generateRandomId');

describe('svelte/UITextarea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', async () => {
    const { container } = render(UITextarea, { props: { name: 'test', modifiers: 'large' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', async () => {
    const { container } = render(UITextarea, { props: { name: 'test', id: 'my-id' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with autofocus', async () => {
    const { container } = render(UITextarea, { props: { name: 'test', autofocus: true } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with cols and rows', async () => {
    const { container } = render(UITextarea, { props: { name: 'test', cols: 10, rows: 50 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with autoresize', async () => {
    const { container } = render(UITextarea, { props: { name: 'test', autoresize: true } });
    const textarea = container.getElementsByTagName('textarea')[0];
    await fireEvent.input(textarea, { target: { value: 'new\nvalue' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    const { container } = render(UITextarea, { props: { name: 'test', placeholder: 'test...' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const { container } = render(UITextarea, { props: { name: 'test', label: '*Label*' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const { container } = render(UITextarea, { props: { name: 'test', helper: '*Helper*' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    const { container } = render(UITextarea, { props: { name: 'test', value: 'my value' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - disabled', async () => {
    const onChange = jest.fn();
    const { container, component } = render(UITextarea, { props: { name: 'test', modifiers: 'disabled' } });
    component.$on('change', onChange);
    const textarea = container.getElementsByTagName('textarea')[0];
    await fireEvent.input(textarea, { value: 'new value' });
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders correctly - autocomplete off', () => {
    const { container } = render(UITextarea, { props: { name: 'test', autocomplete: 'off' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - readonly', async () => {
    const onChange = jest.fn();
    const { container, component } = render(UITextarea, { props: { name: 'test', readonly: true } });
    component.$on('change', onChange);
    const textarea = container.getElementsByTagName('textarea')[0];
    await fireEvent.input(textarea, { value: 'new value' });
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders correctly - with listeners and debounce', async () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onChange = jest.fn();
    const onPaste = jest.fn();
    const onKeyDown = jest.fn();
    const { container, component } = render(UITextarea, { props: { name: 'test', debounceTimeout: 250 } });
    component.$on('blur', onBlur);
    component.$on('focus', onFocus);
    component.$on('paste', onPaste);
    component.$on('change', onChange);
    component.$on('keydown', onKeyDown);
    const textarea = container.getElementsByTagName('textarea')[0];
    await fireEvent.focus(textarea);
    await fireEvent.blur(textarea);
    await fireEvent.keyDown(textarea, { key: 'a' });
    await fireEvent.input(textarea, { target: { value: 'new 015 test' } });
    await fireEvent.paste(textarea, { clipboardData: { getData: jest.fn(() => 'and 89 OKOK') } });
    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(expect.any(Object));
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith(expect.any(Object));
    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(onPaste).toHaveBeenCalledWith(expect.any(Object));
  });
});

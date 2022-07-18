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
import UITextarea from 'scripts/react/Textarea';
import { render, fireEvent } from '@testing-library/react';

jest.useFakeTimers();
jest.mock('scripts/helpers/generateRandomId');

const JSXUITextarea = UITextarea as JSXElement;

describe('react/UITextarea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', async () => {
    const { container } = render(<JSXUITextarea name="test" modifiers="large" autocomplete={null} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', async () => {
    const { container } = render(<JSXUITextarea name="test" id="my-id" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with cols and rows', async () => {
    const { container } = render(<JSXUITextarea name="test" cols={10} rows={50} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with autoresize', async () => {
    const { container } = render(<JSXUITextarea name="test" autoresize />);
    const textarea = container.getElementsByTagName('textarea')[0];
    fireEvent.change(textarea, { target: { value: 'new\nvalue' } });
    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    const { container } = render(<JSXUITextarea name="test" placeholder="test..." />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const { container } = render(<JSXUITextarea name="test" label="*Label*" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const { container } = render(<JSXUITextarea name="test" helper="*Helper*" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    const { container } = render(<JSXUITextarea name="test" value="my value" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - disabled', async () => {
    const onChange = jest.fn();
    const { container } = render(<JSXUITextarea name="test" modifiers="disabled" />);
    const textarea = container.getElementsByTagName('textarea')[0];
    fireEvent.change(textarea, { target: { value: 'new value' } });
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders correctly - autocomplete off', () => {
    const { container } = render(<JSXUITextarea name="test" autocomplete="off" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - readonly', async () => {
    const onChange = jest.fn();
    const { container } = render(<JSXUITextarea name="test" readonly onChange={onChange} />);
    const textarea = container.getElementsByTagName('textarea')[0];
    fireEvent.change(textarea, { target: { value: 'new value' } });
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders correctly - with listeners and debounce', async () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onChange = jest.fn();
    const onPaste = jest.fn();
    const onKeyDown = jest.fn();
    const { container } = render(<JSXUITextarea
      name="test"
      onBlur={onBlur}
      onFocus={onFocus}
      onPaste={onPaste}
      onChange={onChange}
      onKeyDown={onKeyDown}
      debounceTimeout={250}
    />);
    const textarea = container.getElementsByTagName('textarea')[0];
    fireEvent.focus(textarea);
    fireEvent.blur(textarea);
    fireEvent.keyDown(textarea, { key: 'a' });
    fireEvent.change(textarea, { target: { value: 'new 015 test', selectionStart: 100 } });
    fireEvent.paste(textarea, { clipboardData: { getData: jest.fn(() => 'and 89 OKOK') } });
    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith('', expect.any(Object));
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith('', expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new 015 test', expect.any(Object));
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith(expect.any(Object));
    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(onPaste).toHaveBeenCalledWith(expect.any(Object));
  });
});

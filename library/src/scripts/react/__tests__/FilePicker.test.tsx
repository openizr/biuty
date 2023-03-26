/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @vitest-environment jsdom
 */

import React from 'react';
import UIFilePicker from 'scripts/react/FilePicker';
import { render, fireEvent } from '@testing-library/react';

const JSXUIFilePicker = UIFilePicker as JSXElement;

vi.mock('scripts/helpers/generateRandomId');

describe('react/UIFilePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(<JSXUIFilePicker name="test" modifiers="large" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const { container } = render(<JSXUIFilePicker id="test" name="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    const { container } = render(<JSXUIFilePicker name="test" modifiers="disabled" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const { container } = render(<JSXUIFilePicker name="test" label="Label" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const { container } = render(<JSXUIFilePicker name="test" helper="Helper" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with left icon', () => {
    const { container } = render(<JSXUIFilePicker name="test" icon="star" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with right icon', () => {
    const { container } = render(<JSXUIFilePicker name="test" icon="star" iconPosition="right" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - multiple', () => {
    const { container } = render(<JSXUIFilePicker name="test" multiple />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    const { container } = render(<JSXUIFilePicker name="test" placeholder="Pick..." />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with accept', () => {
    const { container } = render(<JSXUIFilePicker name="test" accept="image/*" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with default value', () => {
    const { container } = render(<JSXUIFilePicker name="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    const { container } = render(<JSXUIFilePicker
      name="test"
      value={[
        {
          name: 'test.png',
          size: 1515,
          type: 'image/png',
          lastModified: Date.now(),
        },
      ]}
    />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with listeners', async () => {
    const onChange = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const { container } = render(<JSXUIFilePicker name="test" onChange={onChange} onFocus={onFocus} onBlur={onBlur} />);
    const input = container.getElementsByTagName('input')[0];
    fireEvent.focus(input);
    fireEvent.change(input, { target: { files: [{ name: '/path/to/file1.png' }] } });
    fireEvent.blur(input);
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ name: '/path/to/file1.png' }, expect.any(Object));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(undefined, expect.any(Object));
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith({ name: '/path/to/file1.png' }, expect.any(Object));
  });

  test('renders correctly - multiple with listeners', async () => {
    const onChange = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const { container } = render(<JSXUIFilePicker name="test" multiple value={new File([], '/path/to/file2.png')} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />);
    const input = container.getElementsByTagName('input')[0];
    fireEvent.focus(input);
    fireEvent.change(input, { target: { files: [{ name: '/path/to/file1.png' }] } });
    fireEvent.blur(input);
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([{ name: '/path/to/file1.png' }], expect.any(Object));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith([new File([], '/path/to/file2.png')], expect.any(Object));
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith([{ name: '/path/to/file1.png' }], expect.any(Object));
  });
});

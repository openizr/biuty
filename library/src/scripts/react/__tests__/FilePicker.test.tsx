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
import UIFilePicker from 'scripts/react/FilePicker';
import { render, fireEvent } from '@testing-library/react';

const JSXUIFilePicker = UIFilePicker as JSXElement;

jest.mock('scripts/helpers/generateRandomId');

describe('react/UIFilePicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { container } = render(<JSXUIFilePicker name="test" onChange={onChange} onFocus={onFocus} onBlur={onBlur} />);
    const input = container.getElementsByTagName('input')[0];
    await fireEvent.focus(input);
    await fireEvent.change(input, { target: { files: [{ name: '/path/to/file1.png' }] } });
    await fireEvent.blur(input);
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([{ name: '/path/to/file1.png' }], expect.any(Object));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith([], expect.any(Object));
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith([{ name: '/path/to/file1.png' }], expect.any(Object));
  });
});
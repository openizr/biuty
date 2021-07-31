/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import UIFileUploader from 'scripts/react/FileUploader';
import { render, unmountComponentAtNode } from 'react-dom';

let container = document.createElement('div');
jest.mock('scripts/helpers/markdown');
jest.mock('scripts/helpers/generateRandomId');

describe('react/UIFileUploader', () => {
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
      render(<UIFileUploader name="test" modifiers="large" />, container);
    });
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      input.focus();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Simulate.change(input, { target: { files: [] } } as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Simulate.change(input, { target: {} } as any);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    act(() => {
      render(<UIFileUploader id="test" name="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    act(() => {
      render(<UIFileUploader name="test" label="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with left icon', () => {
    act(() => {
      render(<UIFileUploader name="test" label="test" icon="star" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with right icon', () => {
    act(() => {
      render(<UIFileUploader name="test" label="test" icon="star" iconPosition="right" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    act(() => {
      render(<UIFileUploader name="test" helper="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - multiple', () => {
    act(() => {
      render(<UIFileUploader name="test" multiple />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    act(() => {
      render(<UIFileUploader name="test" placeholder="test" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with accept', () => {
    act(() => {
      render(<UIFileUploader name="test" accept="image/*" />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - with listeners', () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    act(() => {
      render(<UIFileUploader name="test" onChange={onChange} onFocus={onFocus} />, container);
    });
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Simulate.change(input, { target: { files: ['/path/to/file1.png'] } } as any);
      input.focus();
    });
    expect(container).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['/path/to/file1.png']);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});

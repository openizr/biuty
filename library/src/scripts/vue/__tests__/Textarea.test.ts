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

import UITextarea from 'scripts/vue/Textarea.vue';
import { render, fireEvent } from '@testing-library/vue';

jest.useFakeTimers();
jest.mock('scripts/helpers/generateRandomId');

describe('vue/UITextarea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', async () => {
    const { container } = render(UITextarea, {
      props: {
        name: 'test', modifiers: 'large', cols: 10, rows: 10,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', async () => {
    const { container } = render(UITextarea, {
      props: {
        name: 'test', id: 'my-id', cols: 10, rows: 10,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with autofocus', async () => {
    const { container } = render(UITextarea, {
      props: {
        name: 'test', autofocus: true, cols: 10, rows: 10,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with cols and rows', async () => {
    const { container } = render(UITextarea, { props: { name: 'test', cols: 10, rows: 50 } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with autoresize', async () => {
    const { container } = render(UITextarea, { props: { name: 'test', cols: 10, autoresize: true } });
    const textarea = container.getElementsByTagName('textarea')[0];
    await fireEvent.update(textarea, 'new\nvalue');
    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    const { container } = render(UITextarea, {
      props: {
        name: 'test', placeholder: 'test...', cols: 10, rows: 10,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const { container } = render(UITextarea, {
      props: {
        name: 'test', label: '*Label*', cols: 10, rows: 10,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const { container } = render(UITextarea, {
      props: {
        name: 'test', helper: '*Helper*', cols: 10, rows: 10,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    const { container } = render(UITextarea, {
      props: {
        name: 'test', value: 'my value', cols: 10, rows: 10,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - disabled', async () => {
    const onChange = jest.fn();
    const { container } = render(UITextarea, {
      props: {
        name: 'test', modifiers: 'disabled', cols: 10, rows: 10, onChange,
      },
    });
    const textarea = container.getElementsByTagName('textarea')[0];
    await fireEvent.update(textarea, 'new value');
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders correctly - autocomplete off', () => {
    const { container } = render(UITextarea, {
      props: {
        name: 'test', autocomplete: 'off', cols: 10, rows: 10,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - readonly', async () => {
    const onChange = jest.fn();
    const { container, rerender } = render(UITextarea, {
      props: {
        name: 'test', readonly: true, onChange, cols: 10, rows: 10,
      },
    });
    const textarea = container.getElementsByTagName('textarea')[0];
    await fireEvent.update(textarea, 'new value');
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
    await rerender({ value: 'new val' });
  });

  test('renders correctly - with listeners and debounce', async () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onChange = jest.fn();
    const onPaste = jest.fn();
    const onKeyDown = jest.fn();
    const { container } = render(UITextarea, {
      props: {
        name: 'test',
        onBlur,
        onFocus,
        onPaste,
        onChange,
        onKeyDown,
        cols: 10,
        rows: 10,
      },
    });
    const textarea = container.getElementsByTagName('textarea')[0];
    await fireEvent.focus(textarea);
    await fireEvent.blur(textarea);
    await fireEvent.keyDown(textarea, { key: 'a' });
    await fireEvent.update(textarea, 'new 015 test');
    await fireEvent.paste(textarea, { clipboardData: { getData: jest.fn(() => 'and 89 OKOK') } });
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

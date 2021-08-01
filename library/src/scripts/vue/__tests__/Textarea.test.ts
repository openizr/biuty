/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mount } from '@vue/test-utils';
import UITextarea from 'scripts/vue/Textarea.vue';

type component = any; // eslint-disable-line @typescript-eslint/no-explicit-any

jest.useFakeTimers();
jest.mock('scripts/helpers/markdown');
jest.mock('scripts/helpers/generateRandomId');

describe('vue/UITextarea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', modifiers: 'large' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', id: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with cols and rows', () => {
    const wrapper = mount(UITextarea, {
      propsData: {
        name: 'test', cols: 10, rows: 50,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', placeholder: 'text' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', helper: 'Text' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', label: 'Text' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with value', async () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', value: 'test' },
    });
    await wrapper.setProps({ value: 'new test' });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with maxlength', () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', maxlength: 10 },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with transform', async () => {
    const transform = jest.fn((value) => value.toUpperCase());
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', maxlength: 10, transform },
    });
    await wrapper.find('textarea').setValue('new test');
    expect(wrapper.html()).toMatchSnapshot();
    expect(transform).toHaveBeenCalledWith('new test');
  });

  test('renders correctly - disabled', () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', modifiers: 'disabled' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - autocomplete off', () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', autocomplete: 'off' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - readonly', () => {
    const wrapper = mount(UITextarea, {
      propsData: { name: 'test', readonly: true },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with listeners', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const onPaste = jest.fn();
    const onKeyDown = jest.fn();
    const wrapper = mount(UITextarea, {
      propsData: {
        name: 'test', value: 'test',
      },
      listeners: {
        focus: onFocus,
        blur: onBlur,
        change: onChange,
        paste: onPaste,
        keyDown: onKeyDown,
      },
    });
    await (wrapper.vm as component).focusField();
    await wrapper.find('textarea').setValue('new test');
    await wrapper.find('textarea').trigger('blur');
    await wrapper.find('textarea').trigger('paste');
    await wrapper.find('textarea').trigger('keydown');
    jest.runAllTimers();
    expect(wrapper.html()).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith('test');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new test');
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith('new test');
    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  test('renders correctly - with listener and debounce', async () => {
    const onChange = jest.fn();
    const wrapper = mount(UITextarea, {
      propsData: {
        name: 'test', value: 'test', debounceTimeout: 250,
      },
      listeners: {
        change: onChange,
      },
    });
    await wrapper.find('textarea').setValue('new test');
    jest.runAllTimers();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new test');
  });
});

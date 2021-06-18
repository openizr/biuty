/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mount } from '@vue/test-utils';
import UITextfield from 'scripts/vue/Textfield.vue';

type component = any; // eslint-disable-line @typescript-eslint/no-explicit-any

jest.useFakeTimers();
jest.mock('scripts/helpers/markdown');
jest.mock('scripts/helpers/generateRandomId');

describe('vue/UITextfield', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', modifiers: 'large' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', id: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with type number', () => {
    const wrapper = mount(UITextfield, {
      propsData: {
        name: 'test', type: 'number', min: 0, max: 30, step: 10,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with type text', () => {
    const wrapper = mount(UITextfield, {
      propsData: {
        name: 'test', type: 'text', maxlength: 10, size: 10,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', placeholder: 'text' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', helper: 'Text' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with transform', async () => {
    const transform = jest.fn((value) => value.toUpperCase());
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', maxlength: 10, transform },
    });
    await wrapper.find('input').setValue('new test');
    expect(wrapper.html()).toMatchSnapshot();
    expect(transform).toHaveBeenCalledWith('new test');
  });

  test('renders correctly - with label', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', label: 'Text' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with value', async () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', value: 'test' },
    });
    await wrapper.setProps({ value: 'new test' });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with left icon', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', icon: 'star' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with right icon', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', icon: 'star', iconPosition: 'right' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', modifiers: 'disabled' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - autocomplete off', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', autocomplete: 'off' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - readonly', () => {
    const wrapper = mount(UITextfield, {
      propsData: { name: 'test', readonly: true },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with listeners', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const onIconClick = jest.fn();
    const wrapper = mount(UITextfield, {
      propsData: {
        name: 'test', icon: 'star', value: 'test',
      },
      listeners: {
        focus: onFocus,
        blur: onBlur,
        iconClick: onIconClick,
        change: onChange,
      },
    });
    await wrapper.find('i').trigger('click');
    await (wrapper.vm as component).focusField();
    await wrapper.find('input').setValue('new test');
    await wrapper.find('input').trigger('blur');
    expect(wrapper.html()).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith('test');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new test');
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith('new test');
    expect(onIconClick).toHaveBeenCalledTimes(1);
  });

  test('renders correctly - with listener and debounce', async () => {
    const onChange = jest.fn();
    const wrapper = mount(UITextfield, {
      propsData: {
        name: 'test', value: 'test', debounceTimeout: 250,
      },
      listeners: {
        change: onChange,
      },
    });
    await wrapper.find('input').setValue('new test');
    jest.runAllTimers();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new test');
  });
});

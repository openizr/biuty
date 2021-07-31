/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mount } from '@vue/test-utils';
import UIFileUploader from 'scripts/vue/FileUploader.vue';

type component = any; // eslint-disable-line @typescript-eslint/no-explicit-any

jest.mock('scripts/helpers/markdown');
jest.mock('scripts/helpers/generateRandomId');

describe('vue/UIFileUploader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const wrapper = mount(UIFileUploader, {
      propsData: { name: 'test', modifiers: 'large' },
    });
    wrapper.find('input').trigger('focus');
    wrapper.find('input').trigger('change');
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const wrapper = mount(UIFileUploader, {
      propsData: { name: 'test', id: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with placeholder', () => {
    const wrapper = mount(UIFileUploader, {
      propsData: { name: 'test', placeholder: 'text' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with accept', () => {
    const wrapper = mount(UIFileUploader, {
      propsData: { name: 'test', accept: 'image/*' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const wrapper = mount(UIFileUploader, {
      propsData: { name: 'test', helper: 'Text' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const wrapper = mount(UIFileUploader, {
      propsData: { name: 'test', label: 'Text' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with left icon', () => {
    const wrapper = mount(UIFileUploader, {
      propsData: { name: 'test', icon: 'star' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with right icon', () => {
    const wrapper = mount(UIFileUploader, {
      propsData: { name: 'test', icon: 'star', iconPosition: 'right' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - multiple', () => {
    const wrapper = mount(UIFileUploader, {
      propsData: { name: 'test', multiple: true },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with listeners', async () => {
    const onFocus = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(UIFileUploader, {
      propsData: {
        name: 'test', icon: 'star', value: 'test',
      },
      listeners: {
        focus: onFocus,
        change: onChange,
      },
    });
    await (wrapper.vm as component).changeField({
      target: {
        files: [{ name: '/path/to/file1.png' }],
      },
    });
    await wrapper.vm.$nextTick();
    await (wrapper.vm as component).focusField();
    expect(wrapper.html()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([{ name: '/path/to/file1.png' }]);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(['/path/to/file1.png']);
  });
});

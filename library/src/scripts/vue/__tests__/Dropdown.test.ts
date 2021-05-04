/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mount } from '@vue/test-utils';
import UIDropdown from 'scripts/vue/Dropdown.vue';

type component = any; // eslint-disable-line @typescript-eslint/no-explicit-any

jest.mock('scripts/helpers/generateRandomId');

const options: { type: string; value?: string; label?: string; disabled?: boolean; }[] = [
  { type: 'option', value: 'option1', label: 'Option 1' },
  { type: 'divider' },
  { type: 'option', value: 'option2', label: 'Option 2' },
  { type: 'option', value: 'option3', label: 'Option 3' },
  { type: 'header' },
  { type: 'option', value: 'option4', label: 'Option 4' },
];

describe('vue/UIDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, modifiers: 'large' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, id: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, label: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, helper: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, value: ['option1', 'option3'] },
    });
    wrapper.setProps({ value: ['option1'] });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with icon', async () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, icon: 'star' },
    });
    wrapper.setProps({ value: ['option1'] });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    await wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - disabled with icon', async () => {
    const wrapper = mount(UIDropdown, {
      propsData: {
        name: 'test', options, icon: 'star', modifier: 'disabled',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, modifier: 'disabled' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - multiple', () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, multiple: true },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with option disabled', async () => {
    const onChange = jest.fn();
    const wrapper = mount(UIDropdown, {
      propsData: {
        name: 'test',
        options: [{
          type: 'option', value: 'option5', label: 'Option 5', disabled: true,
        }],
      },
      listeners: {
        change: onChange,
      },
    });
    await wrapper.find('li').trigger('click');
    expect(wrapper.html()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('renders correctly - expanded', async () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options },
    });
    await wrapper.find('input').trigger('mousedown');
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - expanded with no option and small viewport', async () => {
    window = Object.assign(window, { innerHeight: -1 }); // eslint-disable-line no-global-assign
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options: [] },
    });
    await wrapper.find('input').trigger('mousedown');
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(wrapper.html()).toMatchSnapshot();
    window = Object.assign(window, { innerHeight: 768 }); // eslint-disable-line no-global-assign
  });

  test('renders correctly - expanded with value', async () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, value: ['option1'] },
    });
    await wrapper.find('input').trigger('mousedown');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await wrapper.find('li').trigger('blur', {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('correctly handles keyboard navigation', async () => {
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, value: ['option1'] },
    });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'ArrowUp' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'ArrowDown' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'PageDown' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'End' });
    await wrapper.vm.$nextTick();
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'ArrowDown' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'PageUp' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'Home' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: ' ' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'Enter' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'Escape' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'Enter' });
    await wrapper.vm.$nextTick();
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'A' });
    (wrapper.vm as component).navigate({ preventDefault: jest.fn(), key: 'Enter' });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with listeners', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onIconClick = jest.fn();
    const wrapper = mount(UIDropdown, {
      propsData: { name: 'test', options, value: ['option1'] },
      listeners: {
        focus: onFocus,
        change: onChange,
        iconClick: onIconClick,
      },
    });
    await wrapper.find('input').trigger('mousedown');
    await wrapper.find('li').trigger('mousedown');
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith('option1');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['option1']);
  });

  test('renders correctly - multiple with listeners', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const wrapper = mount(UIDropdown, {
      propsData: {
        name: 'test', options, value: ['option2'], multiple: true,
      },
      listeners: {
        focus: onFocus,
        change: onChange,
      },
    });
    await wrapper.find('input').trigger('mousedown');
    await wrapper.find('li').trigger('mousedown');
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, ['option2', 'option1']);
    await wrapper.find('li').trigger('mousedown');
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(2);
    expect(onFocus).toHaveBeenNthCalledWith(1, 'option1');
    expect(onFocus).toHaveBeenNthCalledWith(2, 'option1');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(2, ['option2']);
  });
});

/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mount } from '@vue/test-utils';
import UIButton from 'scripts/vue/Button.vue';

describe('vue/UIButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const wrapper = mount(UIButton, {
      propsData: { label: 'Test', modifiers: 'large' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with id and listeners', () => {
    // See https://vue-test-utils.vuejs.org/api/wrapper/trigger.html.
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const wrapper = mount(UIButton, {
      attachTo: '#root',
      propsData: {
        id: 'test', label: 'Test', modifiers: 'large',
      },
      listeners: {
        focus: onFocus,
        click: onClick,
      },
    });
    wrapper.find('button').trigger('focus');
    wrapper.find('button').trigger('click');
    expect(wrapper.html()).toMatchSnapshot();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  test('renders correctly - no label', () => {
    const wrapper = mount(UIButton, {
      propsData: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - label with icon', () => {
    const wrapper = mount(UIButton, {
      propsData: { label: 'Test', icon: 'star' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - type submit', () => {
    const wrapper = mount(UIButton, {
      propsData: { label: 'Test', type: 'submit' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - icon only', () => {
    const wrapper = mount(UIButton, {
      propsData: { icon: 'star' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - right icon', () => {
    const wrapper = mount(UIButton, {
      propsData: { icon: 'star', iconPosition: 'right' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    const wrapper = mount(UIButton, {
      propsData: { modifiers: 'disabled' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

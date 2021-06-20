/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mount } from '@vue/test-utils';
import UILink from 'scripts/vue/Link.vue';

describe('vue/UILink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const wrapper = mount(UILink, {
      propsData: { label: 'Test', href: 'https://test.com', modifiers: 'large' },
    });
    wrapper.trigger('click');
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const wrapper = mount(UILink, {
      propsData: { label: 'Test', href: 'https://test.com', id: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with target', () => {
    const wrapper = mount(UILink, {
      propsData: { label: 'Test', href: 'https://test.com', target: '_blank' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with rel', () => {
    const wrapper = mount(UILink, {
      propsData: { label: 'Test', href: 'https://test.com', rel: 'no referrer' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with title', () => {
    const wrapper = mount(UILink, {
      propsData: { label: 'Test', href: 'https://test.com', title: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with listener', () => {
    const onClick = jest.fn();
    const wrapper = mount(UILink, {
      propsData: { label: 'Test', href: 'https://test.com' },
      listeners: { click: onClick },
    });
    wrapper.trigger('click');
    expect(wrapper.html()).toMatchSnapshot();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

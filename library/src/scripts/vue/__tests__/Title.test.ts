/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mount } from '@vue/test-utils';
import UITitle from 'scripts/vue/Title.vue';

describe('vue/UITitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const wrapper = mount(UITitle, {
      propsData: { level: '1', modifiers: 'large' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - modifier different than level', () => {
    const wrapper = mount(UITitle, {
      propsData: { label: 'Test', level: '1', modifiers: '5 large' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const wrapper = mount(UITitle, {
      propsData: { label: 'Test', id: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with itemprop', () => {
    const wrapper = mount(UITitle, {
      propsData: { label: '*Test*', itemProp: 'name' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

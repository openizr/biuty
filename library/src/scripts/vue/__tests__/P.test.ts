/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import UIP from 'scripts/vue/P.vue';
import { mount } from '@vue/test-utils';

describe('vue/UIP', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const wrapper = mount(UIP, {
      propsData: { label: 'Test', modifiers: 'large' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const wrapper = mount(UIP, {
      propsData: { label: 'Test', id: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with itemProp', () => {
    const wrapper = mount(UIP, {
      propsData: { label: 'Test', itemProp: 'description' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

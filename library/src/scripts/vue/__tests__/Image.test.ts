/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mount } from '@vue/test-utils';
import UIImage from 'scripts/vue/Image.vue';

describe('vue/UIImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const wrapper = mount(UIImage, {
      propsData: {
        alt: 'test', ratio: 'square', src: 'https://test.com/a.jpg', modifiers: 'large',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - custom ratio', () => {
    const wrapper = mount(UIImage, {
      propsData: { alt: 'test', ratio: '25:32', src: 'https://test.com/a.jpg' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with id', () => {
    const wrapper = mount(UIImage, {
      propsData: {
        id: 'test', alt: 'test', ratio: 'portrait', src: 'https://test.com/a.jpg',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - standard ratio with itemprop', () => {
    const wrapper = mount(UIImage, {
      propsData: {
        itemProp: 'image', alt: 'test', ratio: 'landscape', src: 'https://test.com/a.jpg',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - custom ratio with itemprop', () => {
    const wrapper = mount(UIImage, {
      propsData: {
        itemProp: 'image', alt: 'test', ratio: '1:5', src: 'https://test.com/a.jpg',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with panoramic ratio', () => {
    const wrapper = mount(UIImage, {
      propsData: { alt: 'test', ratio: 'panoramic', src: 'https://test.com/a.jpg' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

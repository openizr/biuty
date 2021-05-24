/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mount } from '@vue/test-utils';
import UIRadio from 'scripts/vue/Radio.vue';

type component = any; // eslint-disable-line @typescript-eslint/no-explicit-any

jest.mock('scripts/helpers/markdown');
jest.mock('scripts/helpers/generateRandomId');
const options: { value: string; label: string; disabled?: boolean; }[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

describe('vue/UIRadio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', (done) => {
    const wrapper = mount(UIRadio, {
      propsData: { name: 'test', options, modifiers: 'large' },
    });
    // Ensures value prop's reactivity.
    wrapper.setProps({ value: 'option1' });
    wrapper.vm.$nextTick().then(() => {
      wrapper.find('input').trigger('focus');
      wrapper.find('input').trigger('change');
      expect(wrapper.html()).toMatchSnapshot();
      done();
    });
  });

  test('renders correctly - with id', () => {
    const wrapper = mount(UIRadio, {
      propsData: { name: 'test', options, id: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with label', () => {
    const wrapper = mount(UIRadio, {
      propsData: { name: 'test', options, label: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with helper', () => {
    const wrapper = mount(UIRadio, {
      propsData: { name: 'test', options, helper: 'test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with value', () => {
    const wrapper = mount(UIRadio, {
      propsData: { name: 'test', value: 'option1', options },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    const wrapper = mount(UIRadio, {
      propsData: { name: 'test', modifiers: 'disabled', options },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders correctly - with option disabled', () => {
    const onChange = jest.fn();
    const wrapper = mount(UIRadio, {
      propsData: {
        name: 'test', onChange, modifiers: 'disabled', options: [{ value: 'option5', label: 'Option 5', disabled: true }],
      },
    });
    wrapper.find('input').trigger('change');
    expect(wrapper.html()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('renders correctly - with listeners', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const wrapper = mount(UIRadio, {
      propsData: {
        name: 'test', options, value: 'option2',
      },
      listeners: {
        focus: onFocus,
        change: onChange,
      },
    });
    await (wrapper.vm as component).focusField('option2');
    wrapper.find('input').setChecked(true);
    expect(wrapper.html()).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith('option2');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('option1');
  });
});

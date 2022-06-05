/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import UIOptions from 'scripts/svelte/Options.svelte';
import { render, fireEvent } from '@testing-library/svelte';

jest.mock('scripts/helpers/generateRandomId');

const selectOptions: { type: string; value?: string; label?: string; disabled?: boolean; }[] = [
  { type: 'option', value: 'option1', label: 'Option 1' },
  { type: 'divider' },
  { type: 'option', value: 'option2', label: 'Option 2' },
  { type: 'option', value: 'option3', label: 'Option 3' },
  { type: 'header' },
  { type: 'option', value: 'option4', label: 'Option 4' },
];

const options: { type: string; value?: string; label?: string; disabled?: boolean; }[] = [
  { type: 'option', value: 'option1', label: 'Option 1' },
  { type: 'option', value: 'option2', label: 'Option 2' },
  { type: 'option', value: 'option3', label: 'Option 3' },
  { type: 'option', value: 'option4', label: 'Option 4' },
];

const nextTick = (): Promise<void> => new Promise((resolve) => { setTimeout(resolve, 50); });

describe('svelte/UIOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic select', async () => {
    const { container } = render(UIOptions, {
      props: {
        name: 'test', modifiers: 'large', select: true, options: selectOptions,
      },
    });
    await fireEvent.mouseDown(container.getElementsByTagName('button')[0]);
    await fireEvent.mouseDown(container.getElementsByTagName('li')[0]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with id', () => {
    const { container } = render(UIOptions, {
      props: {
        name: 'test', id: 'test', select: true, options: selectOptions,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with label', () => {
    const { container } = render(UIOptions, {
      props: {
        name: 'test', label: 'test', select: true, options: selectOptions,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with helper', () => {
    const { container } = render(UIOptions, {
      props: {
        name: 'test', helper: 'test', select: true, options: selectOptions,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with value', () => {
    const { container } = render(UIOptions, {
      props: {
        name: 'test', value: ['option1', 'option3'], select: true, options: selectOptions,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select disabled', () => {
    const { container } = render(UIOptions, {
      props: {
        name: 'test', modifiers: 'disabled', select: true, options: selectOptions,
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with option disabled', async () => {
    const onChange = jest.fn();
    const { container, component } = render(UIOptions, {
      props: {
        name: 'test',
        select: true,
        options: [{
          type: 'option', value: 'option5', label: 'Option 5', disabled: true,
        }],
      },
    });
    component.$on('change', onChange);
    await fireEvent.change(container.getElementsByTagName('button')[0]);
    expect(onChange).not.toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select expanded', async () => {
    const { container } = render(UIOptions, { props: { name: 'test', select: true, options: selectOptions } });
    await fireEvent.mouseDown(container.getElementsByTagName('button')[0]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select changing options', async () => {
    const { container } = render(UIOptions, { props: { name: 'test', select: true, options: selectOptions } });
    await fireEvent.keyDown(container.getElementsByTagName('button')[0], { key: 'End' });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select expanded with no option and small viewport', async () => {
    Object.assign(window, { innerHeight: -1 });
    const { container } = render(UIOptions, { props: { name: 'test', select: true, options: [] } });
    await fireEvent.mouseDown(container.getElementsByTagName('button')[0]);
    expect(container.firstChild).toMatchSnapshot();
    Object.assign(window, { innerHeight: 768 });
  });

  test('renders correctly - select expanded with value', async () => {
    const { container } = render(UIOptions, {
      props: {
        name: 'test', select: true, options: selectOptions, value: ['option1'],
      },
    });
    await fireEvent.mouseDown(container.getElementsByTagName('button')[0]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('correctly handles select keyboard navigation', async () => {
    const { container } = render(UIOptions, {
      props: {
        name: 'test', select: true, options: selectOptions, value: ['option1'],
      },
    });
    const button = container.getElementsByTagName('button')[0];
    await fireEvent.focus(button);
    await fireEvent.keyDown(button, { key: 'ArrowUp' });
    await fireEvent.keyDown(button, { key: 'ArrowDown' });
    await fireEvent.keyDown(button, { key: 'PageDown' });
    await fireEvent.keyDown(button, { key: 'End' });
    await fireEvent.keyDown(button, { key: 'ArrowDown' });
    await fireEvent.keyDown(button, { key: 'PageUp' });
    await fireEvent.keyDown(button, { key: 'Home' });
    await fireEvent.keyDown(button, { key: ' ' });
    await fireEvent.keyDown(button, { key: 'Enter' });
    await fireEvent.keyDown(button, { key: 'Escape' });
    await fireEvent.keyDown(button, { key: 'Enter' });
    await fireEvent.keyDown(button, { key: 'A' });
    await fireEvent.keyDown(button, { key: 'Enter' });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - select with listeners', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const { container, component } = render(UIOptions, {
      props: {
        name: 'test', select: true, options: selectOptions, value: 'option2',
      },
    });
    component.$on('change', onChange);
    component.$on('focus', onFocus);
    const li = container.getElementsByTagName('li')[0];
    const button = container.getElementsByTagName('button')[0];
    await fireEvent.focus(button);
    await fireEvent.mouseDown(button);
    await fireEvent.mouseDown(li);
    await nextTick();
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('renders correctly - multiple select with listeners', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const { container, component } = render(UIOptions, {
      props: {
        name: 'test', select: true, options: selectOptions, value: 'option2', multiple: true,
      },
    });
    component.$on('change', onChange);
    component.$on('focus', onFocus);
    const li = container.getElementsByTagName('li')[0];
    const button = container.getElementsByTagName('button')[0];
    await fireEvent.focus(button);
    await fireEvent.mouseDown(button);
    await fireEvent.mouseDown(li);
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(1);
    await fireEvent.mouseDown(li);
    await nextTick();
    expect(onFocus).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('select correctly focuses last available option when narrowing options down', async () => {
    const onFocus = jest.fn();
    const { container, component, rerender } = render(UIOptions, {
      props: {
        name: 'test', select: true, options: selectOptions, value: 'option3', multiple: true,
      },
    });
    const li = container.getElementsByTagName('li')[3];
    const button = container.getElementsByTagName('button')[0];
    component.$on('focus', onFocus);
    await fireEvent.focus(button);
    await nextTick();
    await fireEvent.mouseDown(button);
    await nextTick();
    await fireEvent.focus(li);
    await nextTick();
    await fireEvent.mouseDown(button);
    await nextTick();
    await fireEvent.focus(button);
    await nextTick();
    component.$set({ options: selectOptions.slice(0, 2) });
    await nextTick();
    await rerender({
      name: 'test', select: true, options: selectOptions.slice(0, 2), value: null, multiple: true,
    });
    await nextTick();
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(5);
  });

  test('select correctly updates current value when changing value and multiple props', async () => {
    const { container, rerender } = render(UIOptions, {
      props: {
        name: 'test', select: true, options: selectOptions, value: ['option3'], multiple: true,
      },
    });
    await rerender({
      name: 'test', select: true, options: selectOptions, value: ['option1', 'option2'], multiple: true,
    });
    await nextTick();
    expect(container.firstChild).toMatchSnapshot();
    await rerender({
      name: 'test', select: true, options: selectOptions, value: [], multiple: true,
    });
    await nextTick();
    expect(container.firstChild).toMatchSnapshot();
    await rerender({
      name: 'test', select: true, options: selectOptions, value: ['option1'], multiple: false,
    });
    await nextTick();
    expect(container.firstChild).toMatchSnapshot();
    await rerender({
      name: 'test', select: true, multiple: true, options: selectOptions, value: undefined,
    });
    await nextTick();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio basic', () => {
    const { container } = render(UIOptions, { props: { name: 'test', options, modifiers: 'large' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with id', () => {
    const { container } = render(UIOptions, { props: { name: 'test', id: 'test', options } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with label', () => {
    const { container } = render(UIOptions, { props: { name: 'test', label: 'test', options } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with helper', () => {
    const { container } = render(UIOptions, { props: { name: 'test', helper: 'test', options } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with value', () => {
    const { container } = render(UIOptions, { props: { name: 'test', options, value: ['option1'] } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio disabled', () => {
    const { container } = render(UIOptions, { props: { name: 'test', options, modifiers: 'disabled' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio with option disabled', () => {
    const { container } = render(UIOptions, { props: { name: 'test', options: [{ value: 'option5', label: 'Option 5', disabled: true }] } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - radio  with listeners', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const { container, component } = render(UIOptions, { props: { name: 'test', options } });
    const input = container.getElementsByTagName('input')[2];
    component.$on('focus', onFocus);
    component.$on('change', onChange);
    await fireEvent.focus(input);
    await fireEvent.click(input);
    await nextTick();
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('correctly handles checkboxes keyboard navigation', async () => {
    const { container } = render(UIOptions, { props: { name: 'test', multiple: true, options } });
    const input = container.getElementsByTagName('input')[1];
    await fireEvent.keyDown(input, { key: 'ArrowLeft' });
    await fireEvent.keyDown(input, { key: 'ArrowRight' });
    await fireEvent.focus(container.getElementsByTagName('input')[0]);
    await fireEvent.keyDown(input, { key: ' ' });
    expect(container.firstChild).toMatchSnapshot();
  });
});

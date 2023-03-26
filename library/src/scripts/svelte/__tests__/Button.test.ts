/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @vitest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import UIButton from 'scripts/svelte/Button.svelte';

describe('svelte/UIButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(UIButton, { props: { label: 'Test', modifiers: 'large' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - with id', async () => {
    const { container } = render(UIButton, { props: { id: 'test', label: 'Test', modifiers: 'large' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - no label', () => {
    const { container } = render(UIButton, { props: {} });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - label with icon', () => {
    const { container } = render(UIButton, { props: { label: 'Test', icon: 'star' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - type submit', () => {
    const { container } = render(UIButton, { props: { label: 'Test', type: 'submit' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - icon only', () => {
    const { container } = render(UIButton, { props: { icon: 'star' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - right icon', () => {
    const { container } = render(UIButton, { props: { icon: 'star', iconPosition: 'right' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - disabled', () => {
    const { container } = render(UIButton, { props: { disabled: true } });
    expect(container.firstChild).toMatchSnapshot();
  });
});

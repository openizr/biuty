/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable max-classes-per-file */

declare module 'biuty/svelte' {
  import type { SvelteComponentTyped } from 'svelte';

  /**
   * Builds a complete class name from the given array of modifiers.
   *
   * @param {string} baseClass Base class to prefix any modifier with.
   *
   * @param {string} [modifiers = ''] Modifiers to apply to the base class.
   *
   * @returns {string} Generated modifiers list.
   */
  export function buildClass(baseClass: string, modifiers?: string): string;

  /**
   * Generates a random HTML id.
   *
   * @returns {string} The generated id.
   */
  export function generateRandomId(): string;

  /**
   * Parses the given markdown-flavored string into HTML.
   *
   * @param {string} text Markdown to parse into HTML.
   *
   * @param {boolean} [light = true] Wether to parse complexe tags (images, blockquotes, ...).
   *
   * @return {string} Generated HTML.
   */
  export function markdown(text: string, light?: boolean): string;

  /**
   * Paragraph.
   */
  export class UIP extends SvelteComponentTyped<{
    label: string;
    id?: string;
    itemProp?: string;
    modifiers?: string;
  }> { }

  /**
   * Basic icon.
   */
  export class UIIcon extends SvelteComponentTyped<{
    id?: string;
    name: string;
    modifiers?: string;
  }> { }

  /**
   * Title.
   */
  export class UITitle extends SvelteComponentTyped<{
    id?: string;
    label: string;
    itemProp?: string;
    modifiers?: string;
    level?: '1' | '2' | '3' | '4' | '5' | '6';
  }> { }

  /**
   * Hyperlink.
   */
  export class UILink extends SvelteComponentTyped<{
    id?: string;
    href: string;
    rel?: string;
    label: string;
    title?: string;
    target?: string;
    itemProp?: string;
    modifiers?: string;
  }> { }

  /**
   * Button.
   */
  export class UIButton extends SvelteComponentTyped<{
    id?: string;
    icon?: string;
    label?: string;
    modifiers?: string;
    type?: 'button' | 'submit';
    iconPosition?: 'left' | 'right';
  }> { }

  /**
   * Tooltip wrapper, for accessibility.
   */
  export class UITooltip extends SvelteComponentTyped<{
    label: string;
    modifiers?: string;
    description?: string;
  }> { }

  /**
   * Image.
   */
  export class UIImage extends SvelteComponentTyped<{
    src: string;
    alt: string;
    ratio: string;
    id?: string;
    modifiers?: string;
    itemProp?: string;
  }> { }

  /**
   * Selectable option.
   */
  export interface Option {
    value?: string;
    label?: string;
    disabled?: boolean;
    type?: 'header' | 'divider' | 'option';
  }

  /**
   * Set of selectable options.
   */
  export class UIOptions extends SvelteComponentTyped<{
    id?: string;
    name: string;
    label?: string;
    helper?: string;
    select?: boolean;
    options: Option[];
    multiple?: boolean;
    modifiers?: string;
    value?: string | string[];
  }> { }

  /**
   * Text field.
   */
  export class UITextfield extends SvelteComponentTyped<{
    id?: string;
    min?: number;
    max?: number;
    name: string;
    step?: number;
    icon?: string;
    size?: number;
    value?: string;
    label?: string;
    helper?: string;
    readonly?: boolean;
    maxlength?: number;
    modifiers?: string;
    autofocus?: boolean;
    placeholder?: string;
    autocomplete?: 'on' | 'off';
    iconPosition?: 'left' | 'right';
    allowedKeys?: {
      altKey?: RegExp;
      metaKey?: RegExp;
      ctrlKey?: RegExp;
      default?: RegExp;
      shiftKey?: RegExp;
    };
    debounceTimeout?: number;
    type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
    transform?: (value: string, selectionStart: number) => [string, number?];
  }> { }

  /**
   * Text area.
   */
  export class UITextarea extends SvelteComponentTyped<{
    id?: string;
    cols?: number;
    rows?: number;
    name: string;
    value?: string;
    label?: string;
    helper?: string;
    readonly?: boolean;
    maxlength?: number;
    modifiers?: string;
    placeholder?: string;
    debounceTimeout?: number;
    autocomplete?: 'on' | 'off';
  }> { }

  /**
   * File picker.
   */
  export class UIFilePicker extends SvelteComponentTyped<{
    id?: string;
    name: string;
    icon?: string;
    label?: string;
    accept?: string;
    value?: File[];
    helper?: string;
    modifiers?: string;
    multiple?: boolean;
    placeholder?: string;
    iconPosition?: 'left' | 'right';
  }> { }
}

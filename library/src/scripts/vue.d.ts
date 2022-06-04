/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type Generic = Record<string, any>;

declare module 'biuty/vue' {
  import type { DefineComponent } from 'vue';

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
  export const UIP: DefineComponent<{
    id?: string;
    label: string;
    itemProp?: string;
    modifiers?: string;
  }>;

  /**
   * Basic icon.
   */
  export const UIIcon: DefineComponent<{
    id?: string;
    name: string;
    modifiers?: string;
  }>;

  /**
   * Title.
   */
  export const UITitle: DefineComponent<{
    id?: string;
    label: string;
    itemProp?: string;
    modifiers?: string;
    level?: '1' | '2' | '3' | '4' | '5' | '6';
  }>;

  /**
  * Hyperlink.
  */
  export const UILink: DefineComponent<{
    id?: string;
    rel?: string;
    href: string;
    label: string;
    title?: string;
    target?: string;
    modifiers?: string;
  }>;

  /**
   * Button.
   */
  export const UIButton: DefineComponent<{
    id?: string;
    icon?: string;
    label?: string;
    modifiers?: string;
    type?: 'button' | 'submit';
    iconPosition?: 'left' | 'right';
  }>;

  /**
   * Image.
   */
  export const UIImage: DefineComponent<{
    src: string;
    alt: string;
    ratio: string;
    id?: string;
    modifiers?: string;
    itemProp?: string;
  }>;

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
  export const UIOptions: DefineComponent<{
    id?: string;
    name: string;
    label?: string;
    helper?: string;
    select?: boolean;
    options: Option[];
    multiple?: boolean;
    modifiers?: string;
    value?: string | string[];
  }>;

  /**
   * Text field.
   */
  export const UITextfield: DefineComponent<{
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
  }>;

  /**
   * Text area.
   */
  export const UITextarea: DefineComponent<{
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
  }>;

  /**
   * File picker.
   */
  export const UIFilePicker: DefineComponent<{
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
  }>;
}

/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Generic = Record<string, any>;

declare module 'sonar-ui' {
  /**
   * Builds a complete class name from the given array of modifiers.
   *
   * @param {string} baseClass Base class to prefix any modifier with.
   *
   * @param {string[]} modifiers Modifiers to apply to the base class.
   *
   * @returns {string} Generated modifiers list.
   */
  export function buildClass(baseClass: string, modifiers: string[]): string;

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
   *
   */
  export function markdown(text: string, light?: boolean): string;
}

declare module 'sonar-ui/vue' {
  import Vue from 'vue';
  import { ExtendedVue } from 'vue/types/vue.d';

  /**
   * Builds a complete class name from the given array of modifiers.
   *
   * @param {string} baseClass Base class to prefix any modifier with.
   *
   * @param {string[]} modifiers Modifiers to apply to the base class.
   *
   * @returns {string} Generated modifiers list.
   */
  export function buildClass(baseClass: string, modifiers: string[]): string;

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
   *
   */
  export function markdown(text: string, light?: boolean): string;

  /**
   * Dropdown.
   */
  export const UIDropdown: ExtendedVue<Vue, Generic, Generic, Generic, {
    id: string;
    icon: string;
    label: string;
    multiple: boolean;
    helper: string;
    modifiers: string;
    name: string;
    value: string | string[];
    options: {
      type: 'header' | 'divider' | 'option';
      value?: string;
      label?: string;
      disabled?: boolean;
    }[];
  }>;

  /**
   * Button.
   */
  export const UIButton: ExtendedVue<Vue, Generic, Generic, Generic, {
    id: string | null;
    modifiers: string;
    icon: string | null;
    label: string | null;
    type: 'button' | 'submit';
    iconPosition: 'left' | 'right';
  }>;

  /**
   * Checkbox.
   */
  export const UICheckbox: ExtendedVue<Vue, Generic, Generic, Generic, {
    id: string;
    name: string;
    label: string;
    helper: string;
    value: string[];
    modifiers: string;
    options: { value: string; label: string; disabled?: boolean; }[];
  }>;

  /**
   * File uploader.
   */
  export const UIFileUploader: ExtendedVue<Vue, Generic, Generic, Generic, {
    id: string;
    name: string;
    icon: string;
    label: string;
    accept: string;
    value: File[];
    helper: string;
    modifiers: string;
    multiple: boolean;
    placeholder: string;
    iconPosition: 'left' | 'right';
  }>;

  /**
   * Image.
   */
  export const UIImage: ExtendedVue<Vue, Generic, Generic, Generic, {
    src: string;
    alt: string;
    ratio: string;
    id: string | null;
    modifiers: string;
    itemProp: string | null;
  }>;

  /**
   * Link.
   */
  export const UILink: ExtendedVue<Vue, Generic, Generic, Generic, {
    id: string;
    rel: string;
    href: string;
    title: string;
    label: string;
    target: string;
    modifiers: string;
  }>;

  /**
   * P.
   */
  export const UIP: ExtendedVue<Vue, Generic, Generic, Generic, {
    id: string;
    label: string;
    itemProp: string;
    modifiers: string;
  }>;

  /**
   * Radio.
   */
  export const UIRadio: ExtendedVue<Vue, Generic, Generic, Generic, {
    name: string;
    id: string | null;
    modifiers: string;
    label: string | null;
    helper: string | null;
    value: string | null;
    options: { value: string; label: string; disabled?: boolean; }[];
  }>;

  /**
   * Textarea.
   */
  export const UITextarea: ExtendedVue<Vue, Generic, Generic, Generic, {
    id: string;
    name: string;
    cols: number;
    rows: number;
    value: string;
    label: string;
    helper: string;
    maxlength: number;
    modifiers: string;
    readonly: boolean;
    placeholder: string;
    autocomplete: string;
    debounceTimeout: number;
  }>;

  /**
   * Textfield.
   */
  export const UITextfield: ExtendedVue<Vue, Generic, Generic, Generic, {
    name: string;
    value: string;
    min: number;
    max: number;
    step: number;
    size: number;
    icon: string;
    id: string;
    label: string;
    helper: string;
    maxlength: number;
    modifiers: string;
    readonly: boolean;
    placeholder: string;
    autocomplete: string;
    debounceTimeout: number;
    allowedPattern: RegExp;
    iconPosition: 'left' | 'right';
    transform: (value: string) => string;
    type: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
  }>;

  /**
   * Title.
   */
  export const UITitle: ExtendedVue<Vue, Generic, Generic, Generic, {
    level: string;
    id: string | null;
    modifiers: string;
    label: string | null;
    itemProp: string | null;
  }>;
}

declare module 'sonar-ui/react' {
  import { MouseEvent } from 'react';
  import * as PropTypes from 'prop-types';

  /**
   * Builds a complete class name from the given array of modifiers.
   *
   * @param {string} baseClass Base class to prefix any modifier with.
   *
   * @param {string[]} modifiers Modifiers to apply to the base class.
   *
   * @returns {string} Generated modifiers list.
   */
  export function buildClass(baseClass: string, modifiers: string[]): string;

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
   *
   */
  export function markdown(text: string, light?: boolean): string;

  /**
   * Button.
   */
  export function UIButton(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    icon: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    onClick: PropTypes.Requireable<(event: React.MouseEvent<HTMLButtonElement>) => void>;
    onFocus: PropTypes.Requireable<(event: React.MouseEvent<HTMLAnchorElement>) => void>;
    modifiers: PropTypes.Requireable<string>;
    type: PropTypes.Requireable<string>;
    iconPosition: PropTypes.Requireable<string>;
  }>): JSX.Element;

  /**
   * Checkbox.
   */
  export function UICheckbox(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    helper: PropTypes.Requireable<string>;
    onChange: PropTypes.Requireable<(value: string[]) => void>;
    onFocus: PropTypes.Requireable<(value: string) => void>;
    modifiers: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
    value: PropTypes.Requireable<string[]>;
    options: PropTypes.InferProps<{
      value: PropTypes.Validator<string>;
      label: PropTypes.Validator<string>;
      disabled: PropTypes.Requireable<boolean>;
    }>[];
  }>): JSX.Element;

  /**
   * Dropdown.
   */
  export function UIDropdown(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    icon: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    onFocus: PropTypes.Requireable<(value?: string) => void>;
    multiple: PropTypes.Requireable<boolean>;
    onChange: PropTypes.Requireable<(value: (string | string[])) => void>;
    helper: PropTypes.Requireable<string>;
    modifiers: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
    value: PropTypes.Requireable<string | string[]>
    options: PropTypes.InferProps<{
      type: PropTypes.Validator<string>;
      value: PropTypes.Requireable<string>;
      label: PropTypes.Requireable<string>;
      disabled: PropTypes.Requireable<boolean>;
    }>[];
  }>): JSX.Element;

  /**
   * File uploader.
   */
  export function UIFileUploader(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    icon: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    onFocus: PropTypes.Requireable<(value: string[]) => void>;
    helper: PropTypes.Requireable<string>;
    accept: PropTypes.Requireable<string>;
    value: PropTypes.Requireable<File[]>;
    onChange: PropTypes.Requireable<(value: File[]) => void>;
    multiple: PropTypes.Requireable<boolean>;
    modifiers: PropTypes.Requireable<string>;
    placeholder: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
    iconPosition: PropTypes.Requireable<string>;
  }>): JSX.Element;

  /**
   * Image.
   */
  export function UIImage(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    itemProp: PropTypes.Requireable<string>;
    modifiers: PropTypes.Requireable<string>;
    src: PropTypes.Validator<string>;
    alt: PropTypes.Validator<string>;
    ratio: PropTypes.Validator<string>;
  }>): JSX.Element;

  /**
   * Link.
   */
  export function UILink(props: PropTypes.InferProps<{
    rel: PropTypes.Requireable<string>;
    id: PropTypes.Requireable<string>;
    title: PropTypes.Requireable<string>;
    onClick: PropTypes.Requireable<(event: MouseEvent<HTMLAnchorElement>) => void>;
    modifiers: PropTypes.Requireable<string>;
    href: PropTypes.Validator<string>;
    label: PropTypes.Validator<string>;
    target: PropTypes.Requireable<string>;
  }>): JSX.Element;

  /**
   * Paragraph.
   */
  export function UIP(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    modifiers: PropTypes.Requireable<string>;
    label: PropTypes.Validator<string>;
    itemProp: PropTypes.Requireable<string>;
  }>): JSX.Element;

  /**
   * Radio.
   */
  export function UIRadio(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    value: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    onFocus: PropTypes.Requireable<(value: string) => void>;
    helper: PropTypes.Requireable<string>;
    onChange: PropTypes.Requireable<(value: string) => void>;
    modifiers: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
    options: PropTypes.InferProps<{
      value: PropTypes.Validator<string>;
      label: PropTypes.Validator<string>;
      disabled: PropTypes.Requireable<boolean>;
    }>[];
  }>): JSX.Element;

  /**
   * Textarea.
   */
  export function UITextarea(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    cols: PropTypes.Requireable<number>;
    rows: PropTypes.Requireable<number>;
    onBlur: PropTypes.Requireable<(value: string) => void>;
    onFocus: PropTypes.Requireable<(value: string) => void>;
    onChange: PropTypes.Requireable<(value: string) => void>;
    value: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    helper: PropTypes.Requireable<string>;
    readonly: PropTypes.Requireable<boolean>;
    maxlength: PropTypes.Requireable<number>;
    modifiers: PropTypes.Requireable<string>;
    placeholder: PropTypes.Requireable<string>;
    autocomplete: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
    debounceTimeout: PropTypes.Requireable<number>;
  }>): JSX.Element;

  /**
   * Textfield.
   */
  export function UITextfield(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    min: PropTypes.Requireable<number>;
    max: PropTypes.Requireable<number>;
    step: PropTypes.Requireable<number>;
    icon: PropTypes.Requireable<string>;
    size: PropTypes.Requireable<number>;
    value: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    helper: PropTypes.Requireable<string>;
    readonly: PropTypes.Requireable<boolean>;
    maxlength: PropTypes.Requireable<number>;
    modifiers: PropTypes.Requireable<string>;
    onIconClick: PropTypes.Requireable<() => void>;
    onBlur: PropTypes.Requireable<(value: string) => void>;
    onFocus: PropTypes.Requireable<(value: string) => void>;
    onChange: PropTypes.Requireable<(value: string) => void>;
    placeholder: PropTypes.Requireable<string>;
    autocomplete: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
    iconPosition: PropTypes.Requireable<string>;
    type: PropTypes.Requireable<string>;
    allowedPattern: PropTypes.Requireable<RegExp>;
    debounceTimeout: PropTypes.Requireable<number>;
    transform: PropTypes.Requireable<(value: string) => string>;
  }>): JSX.Element;

  /**
   * Title.
   */
  export function UITitle(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    itemProp: PropTypes.Requireable<string>;
    modifiers: PropTypes.Requireable<string>;
    label: PropTypes.Validator<string>;
    level: PropTypes.Requireable<string>;
  }>): JSX.Element;
}

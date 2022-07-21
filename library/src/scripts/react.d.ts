/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare module 'biuty/react' {
  import { MouseEvent } from 'react';
  import * as PropTypes from 'prop-types';

  export * from 'biuty';

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
   * Basic icon.
   */
  export function UIIcon(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
    modifiers: PropTypes.Requireable<string>;
  }>): JSX.Element;

  /**
   * Title.
   */
  export function UITitle(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    itemProp: PropTypes.Requireable<string>;
    modifiers: PropTypes.Requireable<string>;
    label: PropTypes.Validator<string>;
    level: PropTypes.Requireable<'1' | '2' | '3' | '4' | '5' | '6'>;
  }>): JSX.Element;

  /**
   * Hyperlink.
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
   * Button.
   */
  export function UIButton(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    icon: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    onClick: PropTypes.Requireable<(event: MouseEvent<HTMLButtonElement>) => void>;
    onFocus: PropTypes.Requireable<(event: MouseEvent<HTMLButtonElement>) => void>;
    modifiers: PropTypes.Requireable<string>;
    type: PropTypes.Requireable<'button' | 'submit'>;
    iconPosition: PropTypes.Requireable<'left' | 'right'>;
  }>): JSX.Element;

  /**
   * Tooltip wrapper, for accessibility.
   */
  export function UITooltip(props: PropTypes.InferProps<{
    modifiers: PropTypes.Requireable<string>;
    label: PropTypes.Validator<string>;
    description: PropTypes.Requireable<string>;
    children: PropTypes.Validator<
      boolean |
      PropTypes.ReactElementLike
      | (boolean | PropTypes.ReactElementLike | null | undefined)[]
    >;
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
   * Selectable option.
   */
  export interface Option {
    value: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    disabled: PropTypes.Requireable<boolean>;
    modifiers: PropTypes.Requireable<string>;
    type: PropTypes.Requireable<'header' | 'divider' | 'option'>;
  }

  /**
   * Set of selectable options.
   */
  export function UIOptions(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
    label: PropTypes.Requireable<string>;
    helper: PropTypes.Requireable<string>;
    modifiers: PropTypes.Requireable<string>;
    multiple: PropTypes.Requireable<boolean>;
    select: PropTypes.Requireable<boolean>;
    value: PropTypes.Requireable<string | string[]>;
    selectPosition: PropTypes.Requireable<'top' | 'bottom'>;
    onFocus: PropTypes.Requireable<(value: string, event: React.FocusEvent<HTMLElement>) => void>;
    onChange: PropTypes.Requireable<
      (value: string | string[], event: React.ChangeEvent<HTMLElement>) => void
    >;
    options: PropTypes.InferProps<Option>[];
  }>): JSX.Element;

  /**
   * Text field.
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
    autofocus: PropTypes.Requireable<boolean>
    placeholder: PropTypes.Requireable<string>;
    autocomplete: PropTypes.Requireable<'on' | 'off'>;
    name: PropTypes.Validator<string>;
    iconPosition: PropTypes.Requireable<'left' | 'right'>;
    allowedKeys: PropTypes.Requireable<PropTypes.InferProps<{
      altKey: PropTypes.Requireable<RegExp>;
      metaKey: PropTypes.Requireable<RegExp>;
      ctrlKey: PropTypes.Requireable<RegExp>;
      default: PropTypes.Requireable<RegExp>;
      shiftKey: PropTypes.Requireable<RegExp>;
    }>>;
    debounceTimeout: PropTypes.Requireable<number>;
    type: PropTypes.Requireable<'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url'>;
    transform: PropTypes.Requireable<(value: string, selectionStart: number) => [string, number?]>;
    onIconClick: PropTypes.Requireable<(event: MouseEvent<HTMLElement>) => void>;
    onIconKeyDown: PropTypes.Requireable<(event: React.KeyboardEvent<HTMLElement>) => void>;
    onPaste: PropTypes.Requireable<(event: React.ClipboardEvent<HTMLInputElement>) => void>;
    onKeyDown: PropTypes.Requireable<(event: React.KeyboardEvent<HTMLInputElement>) => void>;
    onBlur: PropTypes.Requireable<
      (value: string, event: React.FocusEvent<HTMLInputElement>) => void
    >;
    onFocus: PropTypes.Requireable<
      (value: string, event: React.FocusEvent<HTMLInputElement>) => void
    >;
    onChange: PropTypes.Requireable<
      (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
    >;
  }>): JSX.Element;

  /**
   * Text area.
   */
  export function UITextarea(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    cols: PropTypes.Requireable<number>;
    rows: PropTypes.Requireable<number>;
    value: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    helper: PropTypes.Requireable<string>;
    readonly: PropTypes.Requireable<boolean>;
    maxlength: PropTypes.Requireable<number>;
    modifiers: PropTypes.Requireable<string>;
    autofocus: PropTypes.Requireable<boolean>
    autoresize: PropTypes.Requireable<boolean>
    placeholder: PropTypes.Requireable<string>;
    autocomplete: PropTypes.Requireable<'on' | 'off'>;
    name: PropTypes.Validator<string>;
    debounceTimeout: PropTypes.Requireable<number>;
    onPaste: PropTypes.Requireable<(event: React.ClipboardEvent<HTMLTextAreaElement>) => void>;
    onKeyDown: PropTypes.Requireable<(event: React.KeyboardEvent<HTMLTextAreaElement>) => void>;
    onBlur: PropTypes.Requireable<
      (value: string, event: React.FocusEvent<HTMLTextAreaElement>) => void
    >;
    onFocus: PropTypes.Requireable<
      (value: string, event: React.FocusEvent<HTMLTextAreaElement>) => void
    >;
    onChange: PropTypes.Requireable<
      (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
    >;
  }>): JSX.Element;

  /**
   * File picker.
   */
  export function UIFilePicker(props: PropTypes.InferProps<{
    id: PropTypes.Requireable<string>;
    icon: PropTypes.Requireable<string>;
    label: PropTypes.Requireable<string>;
    helper: PropTypes.Requireable<string>;
    accept: PropTypes.Requireable<string>;
    value: PropTypes.Requireable<File[]>;
    multiple: PropTypes.Requireable<boolean>;
    modifiers: PropTypes.Requireable<string>;
    placeholder: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
    iconPosition: PropTypes.Requireable<'left' | 'right'>;
    onBlur: PropTypes.Requireable<
      (value: File[], event: React.FocusEvent<HTMLInputElement>) => void
    >;
    onFocus: PropTypes.Requireable<
      (value: File[], event: React.FocusEvent<HTMLInputElement>) => void
    >;
    onChange: PropTypes.Requireable<
      (value: File[], event: React.ChangeEvent<HTMLInputElement>) => void
    >;
  }>): JSX.Element;
}

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare module 'biuty/react' {
  import * as React from 'react';
  import type {
    UIPProps,
    UILinkProps,
    UIIconProps,
    UITitleProps,
    UIImageProps,
    UIButtonProps,
    UITooltipProps,
    UIOptionsProps,
    UITextareaProps,
    UITextfieldProps,
    UIFilePickerProps,
  } from 'biuty';

  export * from 'biuty';

  /**
   * Paragraph.
   */
  export function UIP(props: UIPProps): JSX.Element;

  /**
   * Basic icon.
   */
  export function UIIcon(props: UIIconProps): JSX.Element;

  /**
   * Title.
   */
  export function UITitle(props: UITitleProps): JSX.Element;

  /**
   * Hyperlink.
   */
  export function UILink(props: UILinkProps & {
    /** `click` event handler. */
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }): JSX.Element;

  /**
   * Button.
   */
  export function UIButton(props: UIButtonProps & {
    /** `click` event handler. */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;

    /** `focus` event handler. */
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  }): JSX.Element;

  /**
   * Tooltip wrapper, for accessibility.
   */
  export function UITooltip(props: UITooltipProps): JSX.Element;

  /**
   * Image.
   */
  export function UIImage(props: UIImageProps): JSX.Element;

  /**
   * Set of selectable options.
   */
  export function UIOptions(props: UIOptionsProps & {
    /** `focus` event handler. */
    onFocus?: React.FocusEventHandler<HTMLElement>;

    /** `change` event handler. */
    onChange?: React.ChangeEventHandler<HTMLElement>;
  }): JSX.Element;

  /**
   * Text field.
   */
  export function UITextfield(props: UITextfieldProps & {
    /** `focus` event handler. */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;

    /** `change` event handler. */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;

    /** `blur` event handler. */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;

    /** `paste` event handler. */
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;

    /** `keyDown` event handler. */
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

    /** `iconKeyDown` event handler. */
    onIconKeyDown?: React.KeyboardEventHandler<HTMLElement>;

    /** `iconClick` event handler. */
    onIconClick?: React.MouseEventHandler<HTMLElement>;
  }): JSX.Element;

  /**
   * Text area.
   */
  export function UITextarea(props: UITextareaProps & {
    /** `focus` event handler. */
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;

    /** `change` event handler. */
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;

    /** `blur` event handler. */
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;

    /** `paste` event handler. */
    onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>;

    /** `keyDown` event handler. */
    onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  }): JSX.Element;

  /**
   * File picker.
   */
  export function UIFilePicker(props: UIFilePickerProps & {
    /** `blur` event handler. */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;

    /** `focus` event handler. */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;

    /** `change` event handler. */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }): JSX.Element;
}

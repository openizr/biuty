/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare module 'biuty/svelte' {
  import type { SvelteComponentTyped } from 'svelte';
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
  export class UIP extends SvelteComponentTyped<UIPProps> { }

  /**
   * Basic icon.
   */
  export class UIIcon extends SvelteComponentTyped<UIIconProps> { }

  /**
   * Title.
   */
  export class UITitle extends SvelteComponentTyped<UITitleProps> { }

  /**
   * Hyperlink.
   */
  export class UILink extends SvelteComponentTyped<UILinkProps> { }

  /**
   * Button.
   */
  export class UIButton extends SvelteComponentTyped<UIButtonProps> { }

  /**
   * Tooltip wrapper, for accessibility.
   */
  export class UITooltip extends SvelteComponentTyped<UITooltipProps> { }

  /**
   * Image.
   */
  export class UIImage extends SvelteComponentTyped<UIImageProps> { }

  /**
   * Set of selectable options.
   */
  export class UIOptions extends SvelteComponentTyped<UIOptionsProps> { }

  /**
   * Text field.
   */
  export class UITextfield extends SvelteComponentTyped<UITextfieldProps> { }

  /**
   * Text area.
   */
  export class UITextarea extends SvelteComponentTyped<UITextareaProps> { }

  /**
   * File picker.
   */
  export class UIFilePicker extends SvelteComponentTyped<UIFilePickerProps> { }
}

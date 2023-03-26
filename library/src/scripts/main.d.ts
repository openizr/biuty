/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare module 'biuty' {
  /**
   * Builds a complete class name from the given array of modifiers.
   *
   * @param baseClass Base class to prefix any modifier with.
   *
   * @param modifiers Modifiers to apply to the base class. Defaults to `''`.
   *
   * @returns Generated modifiers list.
   */
  export function buildClass(baseClass: string, modifiers?: string): string;

  /**
   * Generates a random HTML id.
   *
   * @returns The generated id.
   */
  export function generateRandomId(): string;

  /**
   * Parses the given markdown-flavored string into HTML.
   *
   * @param text Markdown to parse into HTML.
   *
   * @param light Wether to parse complexe tags (images, blockquotes, ...). Defaults to `true`.
   *
   * @returns Generated HTML.
   */
  export function markdown(text: string, light?: boolean): string;

  /**
   * UIP component props.
   */
  export interface UIPProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** Paragraph content. Supports biuty light markdown. */
    label: string;

    /** `itemprop` HTML attribute to set to the element. */
    itemProp?: string;

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;
  }

  /**
   * UIIcon component props.
   */
  export interface UIIconProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** Icon's name. */
    name: string;

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;
  }

  /**
   * UITitle component props.
   */
  export interface UITitleProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** Heading's content. Supports biuty light markdown. */
    label: string;

    /** `itemprop` HTML attribute to set to the element. */
    itemProp?: string;

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;

    /** Heading HTML level (1 to 6). This will determine which HTML tag to use. Defaults to "1". */
    level?: '1' | '2' | '3' | '4' | '5' | '6';
  }

  /**
   * UILink component props.
   */
  export interface UILinkProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** Hyperlink's content. Supports biuty light markdown. */
    label: string;

    /** `rel` HTML attribute to set to the element. */
    rel?: string;

    /** `target` HTML attribute to set to the element. */
    target?: string;

    /** `href` HTML attribute to set to the element. */
    href: string;

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;
  }

  /**
   * UIButton component props.
   */
  export interface UIButtonProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** Button's content. */
    label?: string;

    /** Name of the icon to set to the element. */
    icon?: string;

    /** `type` HTML attribute to set to the element. Defaults to "button". */
    type?: 'button' | 'submit';

    /** Position of the icon relatively to the label. Defaults to "left". */
    iconPosition?: 'left' | 'right';

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;

    /** `click` event handler. */
    onClick?: (event: MouseEvent) => void;

    /** `focus` event handler. */
    onFocus?: (event: FocusEvent) => void;
  }

  /**
   * UITooltip component props.
   */
  export interface UITooltipProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** `aria-label` HTML attribute to set to the element. */
    label?: string;

    /**
     * Description to display instead of the label (toggletip mode). In this mode, the label prop
     * will still be displayed on hover/focus, but this time, as soon as the user clicks or presses
     * a key on the tooltip children, label will be replaced by the description prop.
     * See https://inclusive-components.design/tooltips-toggletips/
     */
    description?: string;

    /** List of modifiers to apply to the element. Defaults to `"top"`. */
    modifiers?: string;
  }

  /**
   * UIImage component props.
   */
  export interface UIImageProps {
    /** Aspect ratio to apply to the image. */
    ratio: string;

    /** `src` HTML attribute to set to the element. */
    src: string;

    /** `alt` HTML attribute to set to the element. */
    alt: string;

    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** `itemProp` HTML attribute to set to the element. */
    itemProp?: string;

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;
  }

  /**
   * Selectable option.
   */
  export interface Option {
    /**
     * Option's value (HTML value attribute).
     * Required when type is neither `header` nor `divider`.
     */
    value?: string;

    /** Option's label. Required when type is not `divider`. */
    label?: string;

    /** Whether the option can be selected. Defaults to `true`. */
    disabled?: boolean;

    /** List of modifiers to pass to the option. */
    modifiers?: string;

    /** Option's type. Determines how the option will be displayed. Required only for drop-downs. */
    type?: 'header' | 'divider' | 'option';
  }

  /**
   * UIOptions component props.
   */
  export interface UIOptionsProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** `name` HTML attribute to set to the element. */
    name: string;

    /** Element's label. Supports biuty light markdown. */
    label?: string;

    /** Element's helper. Supports biuty light markdown. */
    helper?: string;

    /** Whether to display options as a select (=drop-down). Defaults to `false`. */
    select?: boolean;

    /** List of options to display in the component. */
    options: Option[];

    /**
     * Whether user can select several options. Determines how the component will be displayed.
     * `false` will display options as radio buttons, `true` will display them as check-boxes,
     * and `true` along with `select` set to `true` will display a multi-choices drop-down.
     * Defaults to `false`.
     * */
    multiple?: boolean;

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;

    /**
     * Initial value (pre-selected options).
     * Updating this prop with a new value will replace the current value by the one passed.
     * Defaults to `[]`.
     */
    value?: string | string[];

    /**
     * Pass this prop if you want to force options list positionning in `select` mode.
     * Defaults to `"bottom"`.
     */
    selectPosition?: 'top' | 'bottom';
  }

  /**
   * UITextfield component props.
   */
  export interface UITextfieldProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** `min` HTML attribute to set to the element. */
    min?: number;

    /** `max` HTML attribute to set to the element. */
    max?: number;

    /** `name` HTML attribute to set to the element. */
    name: string;

    /** `step` HTML attribute to set to the element. */
    step?: number;

    /** Name of the icon to set to the element. */
    icon?: string;

    /** `site` HTML attribute to set to the element. */
    size?: number;

    /**
     * Input's value. Updating this prop with a new value will replace the current value by
     * the one passed.
     */
    value?: string;

    /** Element's label. Supports biuty light markdown. */
    label?: string;

    /** Element's helper. Supports biuty light markdown. */
    helper?: string;

    /** `readonly` HTML attribute to set to the element. Defaults to `false`. */
    readonly?: boolean;

    /** `maxlength` HTML attribute to set to the element. */
    maxlength?: number;

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;

    /** `autofocus` HTML attribute to set to the element. Defaults to `false`. */
    autofocus?: boolean;

    /** `placeholder` HTML attribute to set to the element. Defaults to `false`. */
    placeholder?: string;

    /** `autocomplete` HTML attribute to set to the element. Defaults to `on`. */
    autocomplete?: 'on' | 'off';

    /** Position of the icon relatively to the label. */
    iconPosition?: 'left' | 'right';

    /**
     * List of RegExp patterns used to filter user inputs and keep only authorized characters.
     * Useful for purpose-specific inputs, like phone numbers (you only want to allow digits).
     * `default` is used to filter all inputs, and the others keys are used to allow specific
     * patterns when holding special keys, like `Ctrl`.
     */
    allowedKeys?: {
      altKey?: RegExp;
      metaKey?: RegExp;
      ctrlKey?: RegExp;
      default?: RegExp;
      shiftKey?: RegExp;
    };

    /**
     * Number of milliseconds to wait before triggering the `change` event. If user changes the
     * input value during that time, the timeout is reset. This is especially useful to limit the
     * number of triggers, if you want to use this component as an autocomplete performing HTTP
     * requests on user inputs, for instance. Defaults to `0`.
     */
    debounceTimeout?: number;

    /** `type` HTML attribute to set to the element. Defaults to `text`. */
    type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';

    /**
     * Transformation function that will format input value.
     * This is especially useful for purpose-specific inputs, like phone numbers (you want to format
     * the number to something like (XXX) XXX-XXXX).
     *
     * @param value Input value to transform.
     *
     * @param selectionStart Current cursor position in the input.
     *
     * @returns An array of at least the formatted value, and optionally the new cursor position
     * after formatting.
     */
    transform?: (value: string, selectionStart: number) => [string, number?];
  }

  /**
   * UITextarea component props.
   */
  export interface UITextareaProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** `cols` HTML attribute to set to the element. */
    cols?: number;

    /** `rows` HTML attribute to set to the element. */
    rows?: number;

    /** `name` HTML attribute to set to the element. */
    name: string;

    /**
     * Textarea's value. Updating this prop with a new value will replace the current value by
     * the one passed.
     */
    value?: string;

    /** Element's label. Supports biuty light markdown. */
    label?: string;

    /** Element's helper. Supports biuty light markdown. */
    helper?: string;

    /** `readonly` HTML attribute to set to the element. Defaults to `false`. */
    readonly?: boolean;

    /** `maxlength` HTML attribute to set to the element. */
    maxlength?: number;

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;

    /** `autofocus` HTML attribute to set to the element. Defaults to `false`. */
    autofocus?: boolean;

    /** `placeholder` HTML attribute to set to the element. */
    placeholder?: string;

    /** `autocomplete` HTML attribute to set to the element. Defaults to `on`. */
    autocomplete?: 'on' | 'off';

    /**
     * Wether to automatically resize textarea's height when user puts line-breaks.
     * Defaults to `false`.
     */
    autoresize?: boolean;

    /**
     * Number of milliseconds to wait before triggering the `change` event. If user changes the
     * textarea value during that time, the timeout is reset. This is especially useful to limit the
     * number of triggers, if you want to use this component as an autocomplete performing HTTP
     * requests on user inputs, for instance. Defaults to `0`.
     */
    debounceTimeout?: number;
  }

  /**
   * UIFilePicker component props.
   */
  export interface UIFilePickerProps {
    /** `id` HTML attribute to set to the element. */
    id?: string;

    /** `name` HTML attribute to set to the element. */
    name: string;

    /** `accept` HTML attribute to set to the element. */
    accept?: string;

    /** Name of the icon to set to the element. */
    icon?: string;

    /** `multiple` HTML attribute to set to the element. Defaults to `false`. */
    multiple?: boolean;

    /** Position of the icon relatively to the label. */
    iconPosition?: 'left' | 'right';

    /**
     * File picker's value. Updating this prop with a new value will replace the current value by
     * the one passed.
     */
    value?: File[];

    /** Element's label. Supports biuty light markdown. */
    label?: string;

    /** Element's helper. Supports biuty light markdown. */
    helper?: string;

    /** List of modifiers to apply to the element. Defaults to `""`. */
    modifiers?: string;

    /** Element's placeholder. */
    placeholder?: string;

    /** `blur` event handler. */
    onBlur?: (value: File[], event: FocusEvent) => void;

    /** `focus` event handler. */
    onFocus?: (value: File[], event: FocusEvent) => void;

    /** `change` event handler. */
    onChange?: (value: File[], event: InputEvent) => void;
  }
}

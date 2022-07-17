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
}

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Generic = Record<string, any>;

declare module 'biuty' {
  /**
   * Builds a complete class name from the given array of modifiers.
   *
   * @param {string} baseClass Base class to prefix any modifier with.
   *
   * @param {string} [modifiers = ''] Modifiers to apply to the base class.
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
   */
  export function markdown(text: string, light?: boolean): string;
}

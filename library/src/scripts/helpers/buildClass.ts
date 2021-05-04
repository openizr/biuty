/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Builds a complete class name from the given array of modifiers.
 *
 * @param {string} baseClass Base class to prefix any modifier with.
 *
 * @param {string[]} modifiers Modifiers to apply to the base class.
 *
 * @returns {string} Generated modifiers list.
 */
export default function buildClass(baseClass: string, modifiers: string[]): string {
  const chainedModifiers = [...new Set(modifiers)].map((modifier) => (
    (modifier === '') ? '' : `--${modifier}`)).join('');
  return `${baseClass}${(chainedModifiers !== '') ? ` ${baseClass}${chainedModifiers}` : ''}`;
}

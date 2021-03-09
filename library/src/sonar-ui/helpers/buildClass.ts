/**
 * Copyright (c) KivFinance, Inc.
 * All rights reserved.
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

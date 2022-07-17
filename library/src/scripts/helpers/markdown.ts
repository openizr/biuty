/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const parsers = [
  // tab
  { regexp: /^[\t ]+|[\t ]$/gm, template: '' },
  // strong
  { regexp: /(?:(?<!\\)\*\*)([^*\n]+?)(?:(?<!\\)\*\*)/g, template: '<strong class="ui-markdown ui-markdown--strong">$1</strong>' },
  // emphasis
  { regexp: /(?:(?<!\\)\*)([^*\n]+?)(?:(?<!\\)\*)/g, template: '<span class="ui-markdown ui-markdown--emphasis">$1</span>' },
  // underline
  { regexp: /(?:(?<!\\)_)([^_\n]+?)(?:(?<!\\)_)/g, template: '<span class="ui-markdown ui-markdown--underline">$1</span>' },
  // italic
  { regexp: /(?:(?<!\\)~)([^~\n]+?)(?:(?<!\\)~)/g, template: '<span class="ui-markdown ui-markdown--italic">$1</span>' },
  // image
  {
    regexp: /!\[(.*)\]\((.*)\)/g,
    template: (_match: string, group1: string, group2: string): string => {
      const src = group2;
      const alt = group1;
      return `<img class="ui-image" src="${src}" alt="${alt}" />`;
    },
  },
  // links
  {
    regexp: /\[([^\]]*)\]\(([^\t\n |]*)(?:\|([^|)]*))?(?:\|([^|)]*))?\)/g,
    template: (...args: string[]): string => {
      const label = args[1];
      const link = args[2];
      const rel = (args[3] !== undefined) ? ` rel="${args[3]}"` : '';
      const target = (args[4] !== undefined) ? ` target="${args[4]}"` : '';
      return `<a class="ui-link" href="${link}"${rel}${target}>${label}</a>`;
    },
  },
  // blockquote
  { regexp: /^[ \t]*&gt; (.*)/gm, template: '<blockquote class="ui-blockquote">$1</blockquote>' },
  // headings
  {
    regexp: /^(?<!\\)(#{1,6})\s+(.*)/gm,
    template: (_match: string, hash: string, content: string): string => {
      const { length } = hash;
      return `<h${length} class="ui-title ui-title--${length}">${content}</h${length}>`;
    },
  },
  // horizontal rule
  { regexp: /^\n--\n$/gm, template: '<hr />' },
  // unordered list
  { regexp: /^[\t ]*?(?:-) (.*)/gm, template: '<ul class="ui-list ui-list--unordered"><li>$1</li></ul>' },
  { regexp: /(<\/ul>\n(.*)<ul[^>]+>*)+/g, template: '' },
  // ordered list
  { regexp: /^[\t ]*?(?:\d(?:\)|\.)) (.*)/gm, template: '<ol class="ui-list ui-list--ordered"><li>$1</li></ol>' },
  { regexp: /(<\/ol>\n(.*)<ol[^>]+>*)+/g, template: '' },
  // linebreak
  { regexp: /([^\n])\n([^\n])/gm, template: '$1<br />$2' },
  // paragraph
  { regexp: /^(?!<h|<br|<blockquote|<img)([^\n]+)/gm, template: '<p class="ui-p">$1</p>' },
  // inline code
  { regexp: /(?<!\\)`([^`]+?)(?<!\\)`/g, template: (_match: string, group1: string): string => `<code class="ui-markdown ui-markdown--code">${group1}</code>` },
  // escape char
  { regexp: /(?<!\\)\\/g, template: '' },
];

function sanitize(str: string): string {
  return str
    .replace(/&/mg, '&amp;')
    .replace(/</mg, '&lt;')
    .replace(/>/mg, '&gt;')
    .replace(/"/mg, '&quot;')
    .replace(/'/mg, '&#039;');
}

/**
 * Parses the given markdown-flavored string into HTML.
 *
 * @param text Markdown to parse into HTML.
 *
 * @param light Wether to parse complexe tags (images, blockquotes, ...). Defaults to `true`.
 *
 * @returns Generated HTML.
 */
export default function markdown(text: string, light = true): string {
  let newStr = sanitize(text);
  for (let i = 0; i < parsers.length; i += 1) {
    if ((light === true && i !== 5 && i !== 8 && i !== 9 && i !== 15) || light === false) {
      newStr = newStr.replace(parsers[i].regexp, parsers[i].template as string);
    }
  }
  // line breaks
  newStr = newStr.replace(/\n/gm, (light === true) ? '<br />' : '');

  return newStr.trim();
}

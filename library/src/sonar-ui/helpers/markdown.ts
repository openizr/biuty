/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const unicodes: { [char: string]: string; } = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '&': '&amp;',
  '[': '&#91;',
  ']': '&#93;',
  '(': '&#40;',
  ')': '&#41;',
};

const resc = /[<>&()[]"']/g;

function unicode(char: string): string { return unicodes[char] || char; }

const parsers = [
  // tab
  { regexp: /^[\t ]+|[\t ]$/gm, template: '' },
  // strong
  { regexp: /(?:\*\*)([^*\n]+?)(?:\*\*)/g, template: '<strong class="ui-markdown--strong">$1</strong>' },
  // emphasis
  { regexp: /(?:\*)([^*\n]+?)(?:\*)/g, template: '<span class="ui-markdown--emphasis">$1</span>' },
  // underline
  { regexp: /(?:_)([^_\n]+?)(?:_)/g, template: '<span class="ui-markdown--underline">$1</span>' },
  // italic
  { regexp: /(?:~)([^~\n]+?)(?:~)/g, template: '<span class="ui-markdown--italic">$1</span>' },
  // links
  {
    regexp: /\[(.*?)\]\(([^\t\n |]*)(?:\|&quot;(.*)&quot;)\)+/gm,
    template: (_match: string, group1: string, group2: string, group3: string): string => {
      const link = group2.replace(resc, unicode);
      const text = group1.replace(resc, unicode);
      const title = group3 ? ` title="${group3.replace(resc, unicode)}"` : '';
      return `<a class="ui-link" href="${link}"${title}>${text}</a>`;
    },
  },
  // blockquote
  { regexp: /^[ \t]*&gt; (.*)/gm, template: '<blockquote>$1</blockquote>' },
  // image
  {
    regexp: /!\[(.*)\]\((.*)\)/g,
    template: (_match: string, group1: string, group2: string): string => {
      const src = group2.replace(resc, unicode);
      const alt = group1.replace(resc, unicode);

      return `<img class="ui-image" src="${src}" alt="${alt}" />`;
    },
  },
  // headings
  {
    regexp: /^(#{1,6})\s+(.*)/gm,
    template: (_match: string, hash: string, content: string): string => {
      const { length } = hash;
      return `<h${length} class="ui-title ui-title--${length}">${content}</h${length}>`;
    },
  },
  // horizontal rule
  { regexp: /^\n(--)\n$/gm, template: '<hr />' },
  // unordered list
  { regexp: /^[\t ]*?(?:-) (.*)/gm, template: '<ul><li>$1</li></ul>' },
  { regexp: /(<\/ul>\n(.*)<ul>*)+/g, template: '' },
  // ordered list
  { regexp: /^[\t ]*?(?:\d(?:\)|\.)) (.*)/gm, template: '<ol><li>$1</li></ol>' },
  { regexp: /(<\/ol>\n(.*)<ol>*)+/g, template: '' },
  // linebreak
  { regexp: /([^\n])\n([^\n])/gm, template: '$1<br />$2' },
  // paragraph
  { regexp: /^(?!<h|<br|<blockquote|<img)([^\n]+)/gm, template: '<p class="ui-p">$1</p>' },
  // inline code
  { regexp: /`([^`]+?)`/g, template: (_match: string, group1: string): string => `<code>${group1.replace(resc, unicode)}</code>` },
  // line break
  { regexp: /\n/g, template: '' },
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
 * markdown parser
 *
 * @param  {string} markdown
 * @return {string}
 */
export default function markdown(str: string, light = true): string {
  // const code = [];
  // const index = 0;

  let newStr = sanitize(str);
  const maxIndex = (light === false) ? parsers.length : parsers.length - 1;
  for (let i = 0; i < maxIndex; i += 1) {
    if ((light === true && i !== 7 && i !== 8 && i !== 9 && i !== 15) || light === false) {
      newStr = newStr.replace(parsers[i].regexp, parsers[i].template as any);
    }
  }
  if (light === true) {
    newStr = newStr.replace(/\n\n/gm, '<br />');
    newStr = newStr.replace(parsers[maxIndex].regexp, parsers[maxIndex].template as any);
  }
  // newStr = (

  //   // // collect code blocks and replace with placeholder
  //   // // we do this to avoid code blocks matching the paragraph regexp
  //   // .replace(blockCodeRegExp, (match, lang, block) => {
  //   //   const placeholder = `{code-block-${index}}`;
  //   //   const regex = new RegExp(`{code-block-${index}}`, 'g');

  //   //   code[index++] = { lang, block: block.replace(resc, unicode), regex };

  //   //   return placeholder;
  //   // })

  // );

  // // replace code block placeholders
  // for (let i = 0; i < index; i++) {
  //   const item = code[i];
  //   var { lang } = item;
  //   var { block } = item;

  //   markdown = markdown.replace(item.regex, (match) => `<pre><code class="language-${lang}">$
  // {block}</code></pre>`);
  // }

  return newStr.trim();
}

/*!
 *             __
 *   __ _  ___/ /
 *  /  ' \/ _  /
 * /_/_/_/\_,_/
 *
 * md.js is a lightweight markdown parser
 * https://github.com/thysultan/md.js
 *
 * @licence MIT
 */
const unicodes = {
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

function unicode(char) { return unicodes[char] || char; }

// const XSSFilterRegExp = /<(script)[^\0]*?>([^\0]+?)<\/(script)>/gmi;
// const XSSFilterTemplate = '&lt;$1&gt;$2&lt;/$3&gt;';

// const XSSFilterInlineJSRegExp = /(<.*? [^\0]*?=[^\0]*?)(javascript:.*?)(.*>)/gmi;
// const XSSFilterInlineJSTemplate = '$1#$2&#58;$3';

// const XSSFilterImageRegExp = /<img([^\0]*?onerror=)([^\0]*?)>/gmi;
// const XSSFilterImageTemplate = (match, group1, group2) => `<img${group1}${group2.replace(resc,
// unicode)}>`;

// const removeTabsRegExp = /^[\t ]+|[\t ]$/gm;

// const htmlFilterRegExp = /(<.*>[\t ]*\n^.*)/gm;
// const htmlFilterTemplate = (match, group1) => group1.replace(/^\n|$\n/gm, '');

// const cssFilterRegExp = /(<style>[^]*<\/style>)/gm;
// const cssFilterTemplate = htmlFilterTemplate;

// const eventsFilterRegExp = /(<[^]+?)(on.*?=.*?)(.*>)/gm;
// const eventsFilterTemplate = '$1$3';

// const blockQuotesRegExp = /^[ \t]*> (.*)/gm;
// const blockQuotesTemplate = '<blockquote>$1</blockquote>';

const inlineCodeRegExp = /`([^`]+?)`/g;
const inlineCodeTemplate = (match, group1) => `<code>${group1.replace(resc, unicode)}</code>`;

const blockCodeRegExp = /```(.*)\n([^\0]+?)```(?!```)/gm;

// const imagesRegExp = /!\[(.*)\]\((.*)\)/g;
// const imagesTemplate = (match, group1, group2) => {
//   const src = group2.replace(resc, unicode);
//   const alt = group1.replace(resc, unicode);

//   return `<img src="${src}" alt="${alt}">`;
// };

// const headingsRegExp = /^(#+) +(.*)/gm;
// const headingsTemplate = (match, hash, content) => {
//   const { length } = hash; return `<h${length}>${content}</h${length}>`;
// };

// const headingsCommonh2RegExp = /^([^\n\t ])(.*)\n----+/gm;
// const headingsCommonh1RegExp = /^([^\n\t ])(.*)\n====+/gm;
// const headingsCommonh1Template = '<h1>$1$2</h1>';
// const headingsCommonh2Template = '<h2>$1$2</h2>';

// const paragraphsRegExp = /^([^-><#\d+_*\t\n[! {])([^\n]*?)(| {2})(?:\n\n)/gm;
// const paragraphsTemplate = (match, group1, group2) => {
//   const leadingCharater = group1;
//   const body = group2;

//   // const trailingSpace = group3 ? '\n<br>\n' : '\n';
//   console.log('RES', `<p>${leadingCharater}${body}</p>`, '---');
//   return `<p>${leadingCharater}${body}</p>`;
// };

const horizontalRegExp = /^.*?(?:---|\*\*\*|- - -|\* \* \*)/gm;
const horizontalTemplate = '<hr/>';

const strongRegExp = /(?:\*)([^*\n]+?)(?:\*)/g;
const strongTemplate = '<strong class="ui-markdown--strong">$1</strong>';

const italicRegExp = /(?:_)([^\n_]+?)(?:_)/g;
const italicTemplate = '<i class="ui-markdown--italic">$1</i>';

const underlineRegExp = /(?:~)([^~\n]+?)(?:~)/g;
const underlineTemplate = '<u class="ui-markdown--underline">$1</u>';

const linksRegExp = /\[(.*?)\]\(([^\t\n ]*)(?:| "(.*)")\)+/gm;
const linksTemplate = (match, group1, group2, group3) => {
  const link = group2.replace(resc, unicode);
  const text = group1.replace(resc, unicode);
  const title = group3 ? ` title="${group3.replace(resc, unicode)}"` : '';

  return `<a class="ui-markdown--link" href="${link}"${title}>${text}</a>`;
};

const listUlRegExp1 = /^[\t ]*?(?:-|\+|\*) (.*)/gm;
const listUlRegExp2 = /(<\/ul>\n(.*)<ul>*)+/g;
const listUlTemplate = '<ul><li>$1</li></ul>';

const listOlRegExp1 = /^[\t ]*?(?:\d(?:\)|\.)) (.*)/gm;
const listOlRegExp2 = /(<\/ol>\n(.*)<ol>*)+/g;
const listOlTemplate = '<ol><li>$1</li></ol>';

const lineBreaksRegExp = /\n/gm;
const lineBreaksTemplate = '<br/>';

const checkBoxesRegExp = /\[( |x)\]/g;
const checkBoxesTemplate = (match, group1) => `<input type="checkbox" disabled${(
  group1.toLowerCase() === 'x'
    ? ' checked'
    : ''
)}>`;

/**
 * markdown parser
 *
 * @param  {string} markdown
 * @return {string}
 */
export default function md(markdown) {
  if (!markdown) {
    return '';
  }

  let parsedMarkdown = markdown;

  const code = [];
  let index = 0;
  // const { length } = parsedMarkdown;

  // to allow matching trailing paragraphs
  // if (parsedMarkdown[length - 1] !== '\n' && parsedMarkdown[length - 2] !== '\n') {
  //   parsedMarkdown += '\n\n';
  // }

  // format, removes tabs, leading and trailing spaces
  parsedMarkdown = (
    parsedMarkdown
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      // collect code blocks and replace with placeholder
      // we do this to avoid code blocks matching the paragraph regexp
      .replace(blockCodeRegExp, (match, lang, block) => {
        const placeholder = `{code-block-${index}}`;
        const regex = new RegExp(`{code-block-${index}}`, 'g');

        code[index] = { lang, block: block.replace(resc, unicode), regex };
        index += 1;
        return placeholder;
      })
      // // XSS script tags
      // .replace(XSSFilterRegExp, XSSFilterTemplate)
      // // XSS image onerror
      // .replace(XSSFilterImageRegExp, XSSFilterImageTemplate)
      // // filter events
      // .replace(eventsFilterRegExp, eventsFilterTemplate)
      // // tabs
      // .replace(removeTabsRegExp, '')
      // // blockquotes
      // .replace(blockQuotesRegExp, blockQuotesTemplate)
      // // images
      // .replace(imagesRegExp, imagesTemplate)
      // // headings
      // .replace(headingsRegExp, headingsTemplate)
      // // headings h1 (commonmark)
      // .replace(headingsCommonh1RegExp, headingsCommonh1Template)
      // // headings h2 (commonmark)
      // .replace(headingsCommonh2RegExp, headingsCommonh2Template)
      // horizontal rule
      .replace(horizontalRegExp, horizontalTemplate)
      // checkboxes
      .replace(checkBoxesRegExp, checkBoxesTemplate)
      // // filter html
      // .replace(htmlFilterRegExp, htmlFilterTemplate)
      // // filter css
      // .replace(cssFilterRegExp, cssFilterTemplate)
      // paragraphs
      // .replace(paragraphsRegExp, paragraphsTemplate)
      // inline code
      .replace(inlineCodeRegExp, inlineCodeTemplate)
      // links
      .replace(linksRegExp, linksTemplate)
      // unorderd lists
      .replace(listUlRegExp1, listUlTemplate)
      .replace(listUlRegExp2, '')
      // ordered lists
      .replace(listOlRegExp1, listOlTemplate)
      .replace(listOlRegExp2, '')
      // strong
      .replace(strongRegExp, strongTemplate)
      // italic
      .replace(italicRegExp, italicTemplate)
      // underline
      .replace(underlineRegExp, underlineTemplate)
      // line breaks
      .replace(lineBreaksRegExp, lineBreaksTemplate)

    // // filter inline js
    // .replace(XSSFilterInlineJSRegExp, XSSFilterInlineJSTemplate)
  );

  // replace code block placeholders
  for (let i = 0; i < index; i += 1) {
    const item = code[i];
    const { lang } = item;
    const { block } = item;

    parsedMarkdown = parsedMarkdown.replace(item.regex, () => (
      `<pre><code class="language-${lang}">${block}</code></pre>`
    ));
  }

  // console.log('PARSED', parsedMarkdown);
  return parsedMarkdown.trim();
}

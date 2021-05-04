/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import markdown from 'scripts/helpers/markdown';

describe('markdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('light', () => {
    test('sanitize', () => {
      expect(markdown('<script type="test/script">console.log(\'ok\');</script>')).toBe('&lt;script type=&quot;test/script&quot;&gt;console.log(&#039;ok&#039;);&lt;/script&gt;');
    });

    test('tab', () => {
      // eslint-disable-next-line no-tabs
      expect(markdown('	 	 	 	  test\n	 	 	 	  test')).toBe('test<br />test');
    });

    test('strong', () => {
      expect(markdown('**test**')).toBe('<strong class="ui-markdown--strong">test</strong>');
    });

    test('emphasis', () => {
      expect(markdown('*test*')).toBe('<span class="ui-markdown--emphasis">test</span>');
    });

    test('underline', () => {
      expect(markdown('_test_')).toBe('<span class="ui-markdown--underline">test</span>');
    });

    test('italic', () => {
      expect(markdown('~test~')).toBe('<span class="ui-markdown--italic">test</span>');
    });

    test('blockquote', () => {
      expect(markdown('> test')).toBe('<blockquote>test</blockquote>');
    });

    test('image', () => {
      expect(markdown('![title](https://path/to/image)')).toBe('!<a class="ui-link" href="https://path/to/image">title</a>');
    });

    test('headings', () => {
      expect(markdown('# test')).toBe('# test');
      expect(markdown('## test')).toBe('## test');
      expect(markdown('### test')).toBe('### test');
      expect(markdown('#### test')).toBe('#### test');
      expect(markdown('##### test')).toBe('##### test');
      expect(markdown('###### test')).toBe('###### test');
      expect(markdown('####### test')).toBe('####### test');
    });

    test('hr', () => {
      expect(markdown('\n--\n')).toBe('--');
    });

    test('p', () => {
      expect(markdown('test\n\ntest\ntest\n\ntest')).toBe('test<br />test<br />test<br />test');
    });

    test('inline code', () => {
      expect(markdown('test `code` test')).toBe('test <code>code</code> test');
    });

    test('link', () => {
      expect(markdown('[Test O\'Brian](/test|Test O\'Brian) ')).toBe('<a class="ui-link" href="/test" title="Test O&#039;Brian">Test O&#039;Brian</a>');
      expect(markdown('[Test](/test|Title|no referer) ')).toBe('<a class="ui-link" href="/test" title="Title" rel="no referer">Test</a>');
      expect(markdown('[Test](/test|Title|no referer) ')).toBe('<a class="ui-link" href="/test" title="Title" rel="no referer">Test</a>');
      expect(markdown('[Test](/test|Title|no referer|_blank) ')).toBe('<a class="ui-link" href="/test" title="Title" rel="no referer" target="_blank">Test</a>');
      expect(markdown('test [my link](https://test.com|my title) test [my other link](https://test2.com|my other title)')).toBe('test <a class="ui-link" href="https://test.com" title="my title">my link</a> test <a class="ui-link" href="https://test2.com" title="my other title">my other link</a>');
    });

    test('unordered list', () => {
      expect(markdown('test:\n - first\n - second\n - third')).toBe('test:<br /><ul><li>first</li><li>second</li><li>third</li></ul>');
    });

    test('ordered list', () => {
      expect(markdown('test:\n 1. first\n 2. second\n 3. third')).toBe('test:<br /><ol><li>first</li><li>second</li><li>third</li></ol>');
    });
  });

  describe('full', () => {
    test('sanitize', () => {
      expect(markdown('<script type="test/script">console.log(\'ok\');</script>', false)).toBe('<p class="ui-p">&lt;script type=&quot;test/script&quot;&gt;console.log(&#039;ok&#039;);&lt;/script&gt;</p>');
    });

    test('tab', () => {
      // eslint-disable-next-line no-tabs
      expect(markdown('	 	 	 	  test\n	 	 	 	  test', false)).toBe('<p class="ui-p">test<br />test</p>');
    });

    test('strong', () => {
      expect(markdown('**test**', false)).toBe('<p class="ui-p"><strong class="ui-markdown--strong">test</strong></p>');
    });

    test('emphasis', () => {
      expect(markdown('*test*', false)).toBe('<p class="ui-p"><span class="ui-markdown--emphasis">test</span></p>');
    });

    test('underline', () => {
      expect(markdown('_test_', false)).toBe('<p class="ui-p"><span class="ui-markdown--underline">test</span></p>');
    });

    test('italic', () => {
      expect(markdown('~test~', false)).toBe('<p class="ui-p"><span class="ui-markdown--italic">test</span></p>');
    });

    test('blockquote', () => {
      expect(markdown('> test', false)).toBe('<blockquote>test</blockquote>');
    });

    test('image', () => {
      expect(markdown('![title](https://path/to/image)', false)).toBe('<img class="ui-image" src="https://path/to/image" alt="title" />');
    });

    test('headings', () => {
      expect(markdown('# test', false)).toBe('<h1 class="ui-title ui-title--1">test</h1>');
      expect(markdown('## test', false)).toBe('<h2 class="ui-title ui-title--2">test</h2>');
      expect(markdown('### test', false)).toBe('<h3 class="ui-title ui-title--3">test</h3>');
      expect(markdown('#### test', false)).toBe('<h4 class="ui-title ui-title--4">test</h4>');
      expect(markdown('##### test', false)).toBe('<h5 class="ui-title ui-title--5">test</h5>');
      expect(markdown('###### test', false)).toBe('<h6 class="ui-title ui-title--6">test</h6>');
      expect(markdown('####### test', false)).toBe('<p class="ui-p">####### test</p>');
    });

    test('hr', () => {
      expect(markdown('\n--\n', false)).toBe('<hr />');
    });

    test('p', () => {
      expect(markdown('test\n\ntest\ntest\n\ntest', false)).toBe('<p class="ui-p">test</p><p class="ui-p">test<br />test</p><p class="ui-p">test</p>');
    });

    test('inline code', () => {
      expect(markdown('test `code` test', false)).toBe('<p class="ui-p">test <code>code</code> test</p>');
    });

    test('link', () => {
      expect(markdown('test [my link](https://test.com|my title) test', false)).toBe('<p class="ui-p">test <a class="ui-link" href="https://test.com" title="my title">my link</a> test</p>');
    });

    test('unordered list', () => {
      expect(markdown('test:\n - first\n - second\n - third', false)).toBe('<p class="ui-p">test:<br /><ul><li>first</li><li>second</li><li>third</li></ul></p>');
    });

    test('ordered list', () => {
      expect(markdown('test:\n 1. first\n 2. second\n 3. third', false)).toBe('<p class="ui-p">test:<br /><ol><li>first</li><li>second</li><li>third</li></ol></p>');
    });
  });
});

import { inspectBlockquoteContent, inspectFencedCodeContent } from '../src/index';
import MarkdownIt from 'markdown-it';
import { test } from 'vitest';

const md = new MarkdownIt();

test('inspectBlockquoteContent should return an empty string if there is no content', ({ expect }) => {
    const markdownString = '> ';
    const tokens = md.parse(markdownString, {});
    const result = inspectBlockquoteContent(tokens, 0);
    expect(result).toBe('');
});

test('inspectBlockquoteContent should return content from tokens', ({ expect }) => {
    const markdownString = '> Hello';
    const tokens = md.parse(markdownString, {});
    const result = inspectBlockquoteContent(tokens, 0);
    expect(result).toBe('Hello\n');
});

test('inspectBlockquoteContent should preserve newlines', ({ expect }) => {
    const markdownString = '> [!note]\nHello World\nNice to see you';
    const tokens = md.parse(markdownString, {});
    const result = inspectBlockquoteContent(tokens, 0);
    expect(result).toBe('[!note]\nHello World\nNice to see you\n');
    expect(tokens[0].attrGet('data-callout')).toBe('note');
});

test('inspectBlockquoteContent should handle paragraphs', ({ expect }) => {
    const markdownString = `
> Hello World
>
> A paragraph
`;
    const tokens = md.parse(markdownString, {});
    const result = inspectBlockquoteContent(tokens, 0);
    expect(result).toBe('Hello World\nA paragraph\n');
    expect(tokens[0].attrs).toBeFalsy();
});

test('inspectBlockquoteContent should ignore nested blockquotes', ({ expect }) => {
    const markdownString = `
> [!note] Nested blockquote
> Before content
>
> > [!info] Nested blockquote
>
> After content
`;
    const tokens = md.parse(markdownString, {});
    const result = inspectBlockquoteContent(tokens, 0);
    expect(result).toBe('[!note] Nested blockquote\nBefore content\nAfter content\n');
    expect(tokens[0].attrGet('data-callout')).toBe('note');
});

test('inspectBlockquoteContent should ignore nested fences', ({ expect }) => {
    const markdownString = `
> [!note] Nested fence
> Before content
>
> \`\`\`ad-stuff
> nested fence
> \`\`\`
>
> After content
`;
    const tokens = md.parse(markdownString, {});
    const result = inspectBlockquoteContent(tokens, 0);
    expect(result).toBe('[!note] Nested fence\nBefore content\nAfter content\n');
    expect(tokens[0].attrGet('data-callout')).toBe('note');
});

// -------- FENCED CONTENT ------------

test('inspectFencedContent should return an empty string if there is no content', ({ expect }) => {
    const markdownString = '```language-ad-info\n```';
    const tokens = md.parse(markdownString, {});
    inspectFencedCodeContent(tokens[0], md, md.options, {});
    expect(tokens[0].attrGet('data-callout')).toBe('info');
    expect(tokens[0].attrGet('data-callout-title')).toBeFalsy();
    expect(tokens[0].content).toBe('');
});

test('inspectFencedContent should return content from tokens', ({ expect }) => {
    const markdownString = '```language-ad-info\nHello\n```';
    const tokens = md.parse(markdownString, {});
    inspectFencedCodeContent(tokens[0], md, md.options, {});
    expect(tokens[0].attrGet('data-callout')).toBe('info');
    expect(tokens[0].attrGet('data-callout-title')).toBeFalsy();
    expect(tokens[0].content).toBe('<p>Hello</p>\n');
});

test('inspectFencedContent should preserve newlines', ({ expect }) => {
    const markdownString = '```language-ad-info\nHello World\nNice to see you\n```';
    const tokens = md.parse(markdownString, {});
    inspectFencedCodeContent(tokens[0], md, md.options, {});
    expect(tokens[0].attrGet('data-callout')).toBe('info');
    expect(tokens[0].attrGet('data-callout-title')).toBeFalsy();
    expect(tokens[0].content).toBe('<p>Hello World\nNice to see you</p>\n');
});

test('inspectFencedContent should handle paragraphs', ({ expect }) => {
    const markdownString = '```language-ad-info\nHello World\n\nA paragraph\n```';
    const tokens = md.parse(markdownString, {});
    inspectFencedCodeContent(tokens[0], md, md.options, {});
    expect(tokens[0].attrGet('data-callout')).toBe('info');
    expect(tokens[0].attrGet('data-callout-title')).toBeFalsy();
    expect(tokens[0].content).toBe('<p>Hello World</p>\n<p>A paragraph</p>\n');
});

test('inspectFencedContent should use a title', ({ expect }) => {
    const markdownString = '```language-ad-info\ntitle: Hello World\n\nA paragraph\n```';
    const tokens = md.parse(markdownString, {});
    inspectFencedCodeContent(tokens[0], md, md.options, {});
    expect(tokens[0].attrGet('data-callout')).toBe('info');
    expect(tokens[0].attrGet('data-callout-title')).toBe('Hello World');
    expect(tokens[0].content).toBe('<p>A paragraph</p>\n');
});

test('inspectFencedContent should ignore collapse but handle options', ({ expect }) => {
    const markdownString = '```language-ad-info\ncollapse: true\ncolor: #555\nicon: name\nHello World\n\nA paragraph\n```';
    const tokens = md.parse(markdownString, {});
    inspectFencedCodeContent(tokens[0], md, md.options, {});
    expect(tokens[0].attrGet('data-callout')).toBe('info');
    expect(tokens[0].attrGet('data-callout-title')).toBeFalsy();
    expect(tokens[0].attrGet('data-callout-color')).toBe('#555');
    expect(tokens[0].attrGet('data-callout-icon')).toBe('name');
    expect(tokens[0].content).toBe('<p>Hello World</p>\n<p>A paragraph</p>\n');
});

test('inspectFencedContent should format nested blockquotes', ({ expect }) => {
    // Note that the plugin is not registered on this instance of md.. so it will not
    // parse the nested blockquote as a callout
    const markdownString = '```language-ad-info\nNested blockquote\nBefore content\n\n> [!warning] Nested blockquote\n\nAfter content\n```';
    const tokens = md.parse(markdownString, {});
    inspectFencedCodeContent(tokens[0], md, md.options, {});
    expect(tokens[0].attrGet('data-callout')).toBe('info');
    expect(tokens[0].attrGet('data-callout-title')).toBeFalsy();
    expect(tokens[0].content).toBe('<p>Nested blockquote\nBefore content</p>\n<blockquote>\n<p>[!warning] Nested blockquote</p>\n</blockquote>\n<p>After content</p>\n');
});

test('inspectFencedContent should ignore nested fences', ({ expect }) => {
    const markdownString = '~~~language-ad-info\nNested fence\nBefore content\n\n```ad-stuff\nnested fence\n```\n\nAfter content\n~~~';
    const tokens = md.parse(markdownString, {});
    inspectFencedCodeContent(tokens[0], md, md.options, {});
    expect(tokens[0].attrGet('data-callout')).toBe('info');
    expect(tokens[0].attrGet('data-callout-title')).toBeFalsy();
    expect(tokens[0].content).toBe('<p>Nested fence\nBefore content</p>\n<pre><code class="language-ad-stuff">nested fence\n</code></pre>\n<p>After content</p>\n');
});

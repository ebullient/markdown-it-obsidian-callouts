import { test } from 'vitest'
import MarkdownIt from 'markdown-it'
import mdItObsidianCallouts from '../src/index'

const md = new MarkdownIt()
md.use(mdItObsidianCallouts)

test('mdItObsidianCallouts normal blockquote unchanged', ({ expect }) => {
    const normalBlockquoteResult = md.render('> This is a normal blockquote')
    // console.log(normalBlockquoteResult)
    expect(normalBlockquoteResult).not.toContain('class="callout"');
    expect(normalBlockquoteResult).not.toContain('class="callout-title"');
    expect(normalBlockquoteResult).not.toContain('class="callout-title-inner"');
});

test('mdItObsidianCallouts callout', ({ expect }) => {
    const blockquoteResult = md.render(`
> [!note]
> This is a note
`);
    // console.log(blockquoteResult)
    expect(blockquoteResult).not.toContain('<blockquote')
    expect(blockquoteResult).toContain('class="callout"');
    expect(blockquoteResult).toContain('class="callout-title"');
    expect(blockquoteResult).toContain('class="callout-title-inner"');
});

test('mdItObsidianCallouts callout with trailing whitespace', ({ expect }) => {
    const blockquoteResult = md.render(`
> [!whitespace]  
> Callout with trailing whitespace
`);
    // console.log(blockquoteResult)
    expect(blockquoteResult).not.toContain('<blockquote')
    expect(blockquoteResult).toContain('class="callout"');
    expect(blockquoteResult).toContain('class="callout-title"');
    expect(blockquoteResult).toContain('class="callout-title-inner"');
});

test('mdItObsidianCallouts callout with title', ({ expect }) => {
    const blockquoteResult = md.render(`
> [!warning] Title
> This is a callout with a title
`);
    // console.log(blockquoteResult)
    expect(blockquoteResult).not.toContain('<blockquote')
    expect(blockquoteResult).toContain('class="callout"');
    expect(blockquoteResult).toContain('class="callout-title"');
    expect(blockquoteResult).toContain('class="callout-title-inner"');
});

test('mdItObsidianCallouts callout with title and trailing whitespace', ({ expect }) => {
    const blockquoteResult = md.render(`
> [!whitespace] Title and whitespace  
> This is a callout with a title that has trailing whitespace
`);
    // console.log(blockquoteResult)
    expect(blockquoteResult).not.toContain('<blockquote')
    expect(blockquoteResult).toContain('class="callout"');
    expect(blockquoteResult).toContain('class="callout-title"');
    expect(blockquoteResult).toContain('class="callout-title-inner"');
});
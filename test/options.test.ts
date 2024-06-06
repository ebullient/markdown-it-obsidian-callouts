import { test } from 'vitest'
import MarkdownIt from 'markdown-it'
import mdItObsidianCallouts from '../src/index'

const md = new MarkdownIt()
md.use(mdItObsidianCallouts, {
    icons: {
        caution:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    }
})

test('unknown, use icon from default', ({ expect }) => {
    const blockquoteResult = md.render(`
> [!whitespace]
> Unknown: use note
`);
    console.log(blockquoteResult)
    expect(blockquoteResult).toContain('lucide-pencil');
});

test('warning icon from default', ({ expect }) => {
    const blockquoteResult = md.render(`
> [!warning]
> warning, from defaults
`);
    console.log(blockquoteResult)
    expect(blockquoteResult).toContain('lucide-alert-triangle');
});

test('caution icon from config', ({ expect }) => {
    const blockquoteResult = md.render(`
> [!caution]
> caution, from options
`);
    console.log(blockquoteResult)
    expect(blockquoteResult).toContain('lucide-zap');
});
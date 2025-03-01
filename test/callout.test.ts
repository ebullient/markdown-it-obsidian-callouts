import MarkdownIt from "markdown-it";
import { test } from "vitest";
import mdItObsidianCallouts from "../src/index";

const md = new MarkdownIt();
md.use(mdItObsidianCallouts);

test("mdItObsidianCallouts normal blockquote unchanged", ({ expect }) => {
    const normalBlockquoteResult = md.render("> This is a normal blockquote");
    // console.log(normalBlockquoteResult)
    expect(normalBlockquoteResult).not.toContain('class="callout"');
    expect(normalBlockquoteResult).not.toContain('class="callout-title"');
    expect(normalBlockquoteResult).not.toContain('class="callout-title-inner"');
});

test("mdItObsidianCallouts callout", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!note]
> This is a note
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!note]");
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="note">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">Note</div>',
    );
    expect(blockquoteResult).toContain('class="callout-title-inner"');
});

test("mdItObsidianCallouts callout with fold", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!note]-
> This is a note
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!note]");
    expect(blockquoteResult).toContain(
        '<details class="callout" data-callout="note" data-callout-fold="-">',
    );
    expect(blockquoteResult).toContain('<summary class="callout-title">');
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">Note</div>',
    );
    expect(blockquoteResult).toContain('class="callout-title-inner"');
    expect(blockquoteResult).toContain('<div class="callout-fold">');
    expect(blockquoteResult).toContain("</div></details>");
});

test("mdItObsidianCallouts callout with fold and title", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!note]+ Title
> This is a note
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!note]");
    expect(blockquoteResult).toContain(
        '<details class="callout" data-callout="note" data-callout-fold="+" open>',
    );
    expect(blockquoteResult).toContain('<summary class="callout-title">');
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">Title</div>',
    );
    expect(blockquoteResult).toContain('class="callout-title-inner"');
    expect(blockquoteResult).toContain("</div></details>");
});

test("mdItObsidianCallouts callout with trailing whitespace", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!whitespace]
> Callout with trailing whitespace
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!whitespace]");
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="whitespace">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">Whitespace</div>',
    );
    expect(blockquoteResult).toContain('class="callout-title-inner"');
    expect(blockquoteResult).toContain("</div></div>");
});

test("mdItObsidianCallouts callout with title", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!warning] Title
> This is a callout with a title
`);
    // console.log(blockquoteResult)
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!warning] Title");
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="warning">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">Title</div>',
    );

    expect(blockquoteResult).toContain('class="callout-title-inner"');
    expect(blockquoteResult).toContain("</div></div>");
});

test("mdItObsidianCallouts callout with title and trailing whitespace", ({
    expect,
}) => {
    const blockquoteResult = md.render(`
> [!whitespace] Title and whitespace
> This is a callout with a title that has trailing whitespace
`);
    // console.log(blockquoteResult)
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain(
        "[!whitespace] Title and whitespace",
    );
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="whitespace">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">Title and whitespace</div>',
    );
    expect(blockquoteResult).toContain('class="callout-title-inner"');
});

test("mdItObsidianCallouts nested callout", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!note] title
> Hello *World*!
> > [!WARNING] a warning
> > This is a nested **warning** callout
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!note] title");
    expect(blockquoteResult).not.toContain("[!WARNING] a warning");
    expect(blockquoteResult).toContain('<div class="callout-title">');
    expect(blockquoteResult).toContain('<div class="callout-title-icon">');
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="note">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="warning">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">title</div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>Hello <em>World</em>!</p>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">a warning</div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>This is a nested <strong>warning</strong> callout</p>',
    );
});

test("mdItObsidianCallouts nested callout with markdown", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!note] **a strong title**
> Hello *World*!
> > [!WARNING] ***a strong and italic warning***
> > This is a nested **warning** callout
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner"><strong>a strong title</strong></div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>Hello <em>World</em>!</p>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner"><em><strong>a strong and italic warning</strong></em></div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>This is a nested <strong>warning</strong> callout</p>',
    );
});

test("mdItObsidianCallouts nested callout with inner fold", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!note] title
> Hello *World*!
> > [!WARNING]- a warning
> > This is a nested folded **warning** callout
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!note] title");
    expect(blockquoteResult).not.toContain("[!WARNING] a warning");
    expect(blockquoteResult).toContain('<div class="callout-title">');
    expect(blockquoteResult).toContain('<div class="callout-title-icon">');
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="note">',
    );
    expect(blockquoteResult).toContain(
        '<details class="callout" data-callout="warning" data-callout-fold="-">',
    );
    expect(blockquoteResult).toContain('<summary class="callout-title">');
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">title</div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>Hello <em>World</em>!</p>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">a warning</div>',
    );
    expect(blockquoteResult).toContain('<div class="callout-fold">');
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>This is a nested folded <strong>warning</strong> callout</p>',
    );
    expect(blockquoteResult).toContain("</div></details>");
    expect(blockquoteResult).toContain("</div></div>");
});

test("mdItObsidianCallouts nested code-block admonition", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!note] title
> Hello World!
> ~~~ad-warning
> title: a warning
> This is a nested warning callout
> ~~~
`);
    //console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!note] title");
    expect(blockquoteResult).toContain('<div class="callout-title">');
    expect(blockquoteResult).toContain('<div class="callout-title-icon">');
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="note">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="warning">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">title</div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>Hello World!</p>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">a warning</div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>This is a nested warning callout</p>',
    );
});

test("mdItObsidianCallouts folded nested code-block admonition", ({
    expect,
}) => {
    const blockquoteResult = md.render(`
> [!note]+ title
> Hello World from inside!
> ~~~ad-warning
> title: a warning
> This is a nested warning callout
> ~~~
`);
    //console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!note]+ title");
    expect(blockquoteResult).toContain('<summary class="callout-title">');
    expect(blockquoteResult).toContain('<div class="callout-title-icon">');
    expect(blockquoteResult).toContain(
        '<details class="callout" data-callout="note" data-callout-fold="+" open>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="warning">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">title</div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>Hello World from inside!</p>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">a warning</div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>This is a nested warning callout</p>',
    );
});

test("mdItGitHubCallouts nested code-block admonition", ({ expect }) => {
    const blockquoteResult = md.render(`
> [!NOTE]
> Hello World!
> ~~~ad-warning
> title: a warning
> This is a nested warning callout
> ~~~
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!NOTE]");
    expect(blockquoteResult).not.toContain("ad-warning");
    expect(blockquoteResult).not.toContain("title: a warning");
    expect(blockquoteResult).toContain('<div class="callout-title">');
    expect(blockquoteResult).toContain('<div class="callout-title-icon">');
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="note">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout" data-callout="warning">',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">Note</div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>Hello World!</p>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-title-inner">a warning</div>',
    );
    expect(blockquoteResult).toContain(
        '<div class="callout-content"><p>This is a nested warning callout</p>',
    );
});

test("mdItObsidianCallouts indented callout", ({ expect }) => {
    const blockquoteResult = md.render(`
1. Here is a list

    > [!WARNING]
    > This is an indented warning

    2. Here is a list
        > [!NOTE]
        > This is an indented note

More text

## A heading

> [!TIP]
> This is a tip

Some other text
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!NOTE]");
    expect(blockquoteResult).not.toContain("[!WARNING]");
    expect(blockquoteResult).not.toContain("[!TIP]");
    expect(blockquoteResult).toContain(
        'class="callout" data-callout="warning"',
    );
    expect(blockquoteResult).toContain('class="callout" data-callout="note"');
    expect(blockquoteResult).toContain('class="callout" data-callout="tip"');
    expect(blockquoteResult).toContain('class="callout-title"');
    expect(blockquoteResult).toContain('class="callout-title-inner">Warning<');
    expect(blockquoteResult).toContain('class="callout-title-inner">Note<');
    expect(blockquoteResult).toContain('class="callout-title-inner">Tip<');
});

test("mdItObsidianCallouts indented folded callout", ({ expect }) => {
    const blockquoteResult = md.render(`
1. Here is a list

    > [!WARNING]-
    > This is an hidden indented warning

    2. Here is a list
        > [!NOTE]+ Indented
        > This is an indented note

More text

## A heading

> [!TIP]-
> This is a hidden tip

Some other text
`);
    console.log(blockquoteResult);
    expect(blockquoteResult).not.toContain("blockquote");
    expect(blockquoteResult).not.toContain("[!NOTE]");
    expect(blockquoteResult).not.toContain("[!WARNING]");
    expect(blockquoteResult).not.toContain("[!TIP]");
    expect(blockquoteResult).toContain(
        'class="callout" data-callout="warning"',
    );
    expect(blockquoteResult).toContain('class="callout" data-callout="note"');
    expect(blockquoteResult).toContain('class="callout" data-callout="tip"');
    expect(blockquoteResult).toContain('class="callout-title"');
    expect(blockquoteResult).toContain('class="callout-title-inner">Warning<');
    expect(blockquoteResult).toContain('class="callout-title-inner">Indented<');
    expect(blockquoteResult).toContain('class="callout-title-inner">Tip<');
    expect(blockquoteResult).toContain("</div></details>");
    expect(blockquoteResult).not.toContain("</div></div>");
});

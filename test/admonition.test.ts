import MarkdownIt from "markdown-it";
import { test } from "vitest";
import mdItObsidianCallouts from "../src/index";

const md = new MarkdownIt();
md.use(mdItObsidianCallouts);

test("normal fenced block remains unchanged", ({ expect }) => {
    const normalCodeResult = md.render(
        '```js\nconsole.log("Hello, world!");\n```',
    );
    console.log(normalCodeResult);
    expect(normalCodeResult).toContain("<pre>");
    expect(normalCodeResult).not.toContain('class="callout"');
});

test("admonition has a title, content is rendered", ({ expect }) => {
    const codeblockResult = md.render(`
\`\`\`ad-note
title: title
Hello World!
\`\`\`
`);
    console.log(codeblockResult);
    expect(codeblockResult).not.toContain("<pre>");
    expect(codeblockResult).toContain('<div class="callout-title">');
    expect(codeblockResult).toContain('<div class="callout-title-icon">');
    expect(codeblockResult).toContain(
        '<div class="callout" data-callout="note">',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-title-inner">title</div>',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-content"><p>Hello World!</p>',
    );
});

test("admonition has a nested callout, content is rendered", ({ expect }) => {
    const codeblockResult = md.render(`
~~~ad-note
title: title
Hello World!
> [!warning] a warning
> This is a nested warning callout
~~~
`);
    console.log(codeblockResult);
    expect(codeblockResult).not.toContain("<pre>");
    expect(codeblockResult).toContain('<div class="callout-title">');
    expect(codeblockResult).toContain('<div class="callout-title-icon">');
    expect(codeblockResult).toContain(
        '<div class="callout" data-callout="note">',
    );
    expect(codeblockResult).toContain(
        '<div class="callout" data-callout="warning">',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-title-inner">title</div>',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-content"><p>Hello World!</p>',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-title-inner">a warning</div>',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-content"><p>This is a nested warning callout</p>',
    );
});

test("admonition has a nested admonition, content is rendered", ({
    expect,
}) => {
    const codeblockResult = md.render(`
~~~~ad-note
title: title
Hello World!
~~~ad-warning
title: a warning
This is a nested warning callout
~~~
~~~~
`);
    console.log(codeblockResult);
    expect(codeblockResult).not.toContain("<pre>");
    expect(codeblockResult).toContain('<div class="callout-title">');
    expect(codeblockResult).toContain('<div class="callout-title-icon">');
    expect(codeblockResult).toContain(
        '<div class="callout" data-callout="note">',
    );
    expect(codeblockResult).toContain(
        '<div class="callout" data-callout="warning">',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-title-inner">title</div>',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-content"><p>Hello World!</p>',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-title-inner">a warning</div>',
    );
    expect(codeblockResult).toContain(
        '<div class="callout-content"><p>This is a nested warning callout</p>',
    );
});

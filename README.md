# markdown-it-obsidian-callouts

Plugin for markdown-it to support GitHub and Obsidian callouts, 
as well as codeblock admonitions supported by the [Admonition plugin](https://github.com/javalent/admonitions).

It uses Obsidian default icons and callout flavors out of the gate.

## Usage

```javascript
const markdownIt = require('markdown-it');
const mdItObsidianCallouts = require('markdown-it-obsidian-callouts');

const md = new MarkdownIt()
md.use(mdItObsidianCallouts);
```

## Callouts and Admonitions

The following four variations will produce the same html.

Callout:

```md
> [!note] title
> Hello World!
> > [!warning] a warning
> > This is a nested warning callout
```

A callout with nested code-block admonition:

```md
> [!note] title
> Hello World!
> ~~~ad-warning
> title: a warning
> This is a nested warning callout
> ~~~
```

Code-block admonition with nested callout: 

```md
~~~ad-note
title: title
Hello World!
> [!warning] a warning
> This is a nested warning callout
~~~
```

Code-block admonition with nested code-block admonition: 

```md
~~~~ad-note
title: title
Hello World!
~~~ad-warning
title: a warning
This is a nested warning callout
~~~
~~~~
```

The above nested admonition will generate the following html (it will sadly be less tidy):

```html
<div class="callout" data-callout="note">
  <div class="callout-title">
    <div class="callout-title-icon">
      <svg ... class="lucide lucide-pencil"> ... </svg>
    </div>
    <div class="callout-title-inner">title</div>
  </div>
  <div class="callout-content">
    <p>Hello World!</p>
    <div class="callout" data-callout="warning">
      <div class="callout-title">
        <div class="callout-title-icon">
          <svg ... class="lucide lucide-alert-triangle"> ... </svg>
        </div>
        <div class="callout-title-inner">a warning</div>
      </div>
      <div class="callout-content">
        <p>This is a nested warning callout</p>
      </div>
    </div>
  </div>
</div>
```

This emulates Obsidian callout behavior. The element structure amd CSS classes are the same, some mechanics are different.

## Icons

Default icons are as used by obsidian, and come from [lucide.dev](https://lucide.dev/)

Version 0.268.0  
ISC License  
Copyright (c) 2020, Lucide Contributors  

## Similar plugins

- https://github.com/alexjv89/markdown-it-obsidian - add suport for obsidian wikilinks
- https://github.com/glitchassassin/markdown-it-obsidian-images - add support for obsidian wikilinks for images
- https://github.com/antfu/markdown-it-github-alerts - support for github alerts as annotated blockquote
- https://github.com/commenthol/markdown-it-admon - rST-style admonitions
- https://github.com/docarys/markdown-it-admonition - Docarys admonitions
- https://github.com/mdit-plugins/mdit-plugins - collection of plugins for markdown-it, including callout-style admonitions
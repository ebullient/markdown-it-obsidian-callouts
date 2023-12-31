// Import the MarkdownIt type from 'markdown-it'
import MarkdownIt, { Token } from 'markdown-it'

const DEFAULT_OBSIDIAN_ICONS: Record<string, string> = {
  abstract: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>',
  bug: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bug"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>',
  danger: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  example: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>',
  failure: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  note: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>',
  question: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
  quote: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>',
  success: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>',
  tip: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  todo: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
}
// Aliases
DEFAULT_OBSIDIAN_ICONS.attention = DEFAULT_OBSIDIAN_ICONS.warning;
DEFAULT_OBSIDIAN_ICONS.caution = DEFAULT_OBSIDIAN_ICONS.warning;
DEFAULT_OBSIDIAN_ICONS.check = DEFAULT_OBSIDIAN_ICONS.success;
DEFAULT_OBSIDIAN_ICONS.cite = DEFAULT_OBSIDIAN_ICONS.quote;
DEFAULT_OBSIDIAN_ICONS.done = DEFAULT_OBSIDIAN_ICONS.success;
DEFAULT_OBSIDIAN_ICONS.error = DEFAULT_OBSIDIAN_ICONS.danger;
DEFAULT_OBSIDIAN_ICONS.fail = DEFAULT_OBSIDIAN_ICONS.failure;
DEFAULT_OBSIDIAN_ICONS.faq = DEFAULT_OBSIDIAN_ICONS.success;
DEFAULT_OBSIDIAN_ICONS.help = DEFAULT_OBSIDIAN_ICONS.question;
DEFAULT_OBSIDIAN_ICONS.hint = DEFAULT_OBSIDIAN_ICONS.tip;
DEFAULT_OBSIDIAN_ICONS.important = DEFAULT_OBSIDIAN_ICONS.tip;
DEFAULT_OBSIDIAN_ICONS.missing = DEFAULT_OBSIDIAN_ICONS.failure;
DEFAULT_OBSIDIAN_ICONS.summary = DEFAULT_OBSIDIAN_ICONS.abstract;
DEFAULT_OBSIDIAN_ICONS.tldr = DEFAULT_OBSIDIAN_ICONS.abstract;

export interface MdItObsidianCalloutsOptions {
  /**
   * CSS language prefix for fenced blocks.
   * Can be useful for external highlighters.
   */
  langPrefix?: string | '';

  /**
   * Custom icons for each marker. The key is the marker name, and the value is the html script represent the icon.
   * The key is always lowercase.
   *
   * @default inline svg icons from Obsidian (lucide) or the note icon if not found
   */
  icons?: Record<string, string>
}

// Define your plugin
function mdItObsidianCallouts(md: MarkdownIt, options: MdItObsidianCalloutsOptions): void {
  console.log('mdItObsidianCallouts plugin loaded', options);
  
  // Save the original rule
  const bqOpenRender = md.renderer.rules.blockquote_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  const bqCloseRender = md.renderer.rules.blockquote_close || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  const fencedblockRenderer = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  }

  md.renderer.rules.blockquote_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    inspectBlockquoteContent(tokens, idx);
    const result = renderCalloutPrefix(token);
    if (result) {
      return result;
    }
    return bqOpenRender(tokens, idx, options, env, self);
  }

  md.renderer.rules.blockquote_close = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const callout = token.attrGet('data-callout');
    if (callout) {
      return '</div></div>';
    }
    return bqCloseRender(tokens, idx, options, env, self);
  }

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    inspectFencedCodeContent(token, md, options, env);
    let result = renderCalloutPrefix(token);
    if (result) {
      result += `${token.content}\n</div>\n</div>`;
      return result;
    }
    return fencedblockRenderer(tokens, idx, options, env, self);
  }
}

export function inspectFencedCodeContent(token: Token, md: MarkdownIt, options: MdItObsidianCalloutsOptions, env: any) {
  if (!token.info) {
    return '';
  }
  const admonition = /^ad-([^\s]+) */;
  const admonitionHeader = /^(title|collapse|icon|color):(.*)/;
  const headerToAttr: Record<string, string> = {
    title: 'data-callout-title',
    icon: 'data-callout-icon',
    color: 'data-callout-color'
  };

  const match = token.info.replace(options.langPrefix || '', '').match(admonition);
  if (match) {
    token.attrPush(['class', 'callout']);
    token.attrPush(['data-callout', match[1]]);

    // Split the content by newline
    // Iterate over lines: 
    // if the line matches an admontion header, add the attribute and remove the line
    // otherwise, stop iterating
    let lines = token.content.split('\n');
    while (lines.length > 0 && admonitionHeader.test(lines[0])) {
      const match = lines[0].match(admonitionHeader);
      if (match) {
        const attrName = headerToAttr[match[1].trim().toLowerCase()];
        if (attrName) {
          token.attrPush([attrName, match[2].trim()]);
        }
        lines = lines.slice(1);
      } else {
        break;
      }
    }

    token.content = md.render(lines.join('\n'), {});;
  }
}

export function inspectBlockquoteContent(tokens: any, startIdx: number): string {
  const callout = /^\[!([^\]]+)\][- ]*(.*)? */;
  let content = '';
  let blockquoteDepth = 0;
  let bq_open = tokens[startIdx];
  let bq_close;

  // Iterate over the tokens starting from startIdx
  for (let i = startIdx; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'blockquote_open') {
      blockquoteDepth++;
    } else if (token.type === 'blockquote_close') {
      bq_close = token;
      blockquoteDepth--;
    }

    if (blockquoteDepth == 0) {
      break;
    } else if (blockquoteDepth > 1) {
      continue;
    }

    // If the token is a text token, append its content to content
    if (token.type === 'inline' && token.children) {
      for (let j = 0; j < token.children.length; j++) {
        const child = token.children[j];

        // If the child is a text token, append its content to content
        if (child.type === 'text') {
          content += child.content;
        } else if (child.type === 'softbreak') {
          // If the child is a softbreak token, append a newline to content
          content += '\n';
        } else if (child.type === 'hardbreak') {
          // If the child is a softbreak token, append a newline to content
          content += '  \n';
        }
      }
    }

    // If the token is a paragraph_close token, append a newline to content
    if (token.type === 'paragraph_close') {
      content += '\n';
    }
  }

  const match = content.match(callout);
  if (match) {
    bq_open.attrPush(['class', 'callout']);
    bq_open.attrPush(['data-callout', match[1]]);
    bq_close.attrPush(['data-callout', match[1]]);
    if (match[2]) {
      bq_open.attrPush(['data-callout-title', match[2]]);
    }

    // Find the inline token that contains the matching line
    for (let i = startIdx + 1; i < tokens.length; i++) {
      if (tokens[i].type === 'inline' && tokens[i].content.startsWith(match[0])) {
        if (tokens[i].children) {
          // Remove the first two children
          tokens[i].children = tokens[i].children.slice(2);
          tokens[i].content = tokens[i].children
            .map((child: Token) =>
              child.type == "hardbreak" ? "\n" : child.content)
            .join('');
        }
      }
    }
  }
  return content;
}

function renderCalloutPrefix(token: Token): string {
  const callout = token.attrGet('data-callout');
  if (callout) {
    return `
<div class="callout" data-callout="${callout}">
<div class="callout-title">
<div class="callout-title-icon">
  ${getIcon(token)}
</div>
<div class="callout-title-inner">${getTitle(token)}</div>
</div>
<div class="callout-content">`;
  }
  return '';
}

function getIcon(token: Token) {
  const icon = token.attrGet('data-callout-icon');
  if (icon) {
    return icon.trim();
  }
  const callout = token.attrGet('data-callout');
  if (callout) {
    return DEFAULT_OBSIDIAN_ICONS[callout] || DEFAULT_OBSIDIAN_ICONS.note;
  }
  return '';
}

function getTitle(token: Token) {
  const title = token.attrGet('data-callout-title');
  if (title) {
    return title.trim();
  }
  const callout = token.attrGet('data-callout');
  if (callout) {
    return toTitleCase(callout);
  }
  return '';
}

function toTitleCase(str: string) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Export your plugin as the default export
export default mdItObsidianCallouts
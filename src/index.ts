// Import the MarkdownIt type from 'markdown-it'
import MarkdownIt from 'markdown-it'
import { MdItObsidianCalloutsOptions } from './@types';
import { inspectBlockquoteContent, inspectFencedCodeContent, renderCalloutPrefix } from './inspect';

// Define your plugin
export default function mdItObsidianCallouts(md: MarkdownIt, options: MdItObsidianCalloutsOptions = {}): void {
    console.log('mdItObsidianCallouts plugin loaded with options', options);

    md.core.ruler.after('block', 'obsidian-callouts', (state) => {
        const tokens = state.tokens;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.type === 'blockquote_open') {
                inspectBlockquoteContent(tokens, i);
            }
            if (token.type === 'fence') {
                inspectFencedCodeContent(tokens, i, md, options);
            }
        }
    });

    md.renderer.rules.callout_open = function (tokens, idx) {
        const token = tokens[idx];
        return renderCalloutPrefix(token);
    }

    md.renderer.rules.admonition_block = function (tokens, idx) {
        const token = tokens[idx];
        return renderCalloutPrefix(token)
            + `${token.content}\n</div>\n</div>`;
    }

    md.renderer.rules.callout_close = function (tokens, idx) {
        return '</div></div>';
    }
}
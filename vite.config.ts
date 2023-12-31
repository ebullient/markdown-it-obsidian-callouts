import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MdItObsidianCallouts',
      fileName: (format) => `mdit-obsidian-callouts.${format}.js`
    },
    rollupOptions: {
      // Ensure that your library is compatible with other packages
      external: ['markdown-it'],
      output: {
        // Provide global variables to other scripts
        globals: {
          'markdown-it': 'markdownIt'
        }
      }
    }
  }
})
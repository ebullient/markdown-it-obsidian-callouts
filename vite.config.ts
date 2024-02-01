import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MdItObsidianCallouts',
      formats: ['es', 'cjs'],
      fileName: (format) => format == 'es'
        ? `mdit-obsidian-callouts.js`
        : `mdit-obsidian-callouts.cjs`,
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
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'source-entry',
      transformIndexHtml(html) {
        return mode === 'source'
          ? html.replace('<script defer src="/exact-local.js"></script>', '<script type="module" src="/src/index.jsx"></script>')
          : html;
      },
      closeBundle() {
        if (mode !== 'source') return;
        const dir = path.resolve('dist-source');
        const from = path.join(dir, 'source-index.html');
        if (fs.existsSync(from)) fs.renameSync(from, path.join(dir, 'index.html'));
      },
    },
  ],
  resolve: { alias: { '@': path.resolve('src') } },
  build: mode === 'source' ? { rollupOptions: { input: path.resolve('source-index.html') } } : {},
}));

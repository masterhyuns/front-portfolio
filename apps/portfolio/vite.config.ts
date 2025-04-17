import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { netlifyPlugin } from '@netlify/remix-adapter/plugin';

import path from 'path';

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  root: __dirname,
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    netlifyPlugin(),
    nxViteTsPaths(),
    vanillaExtractPlugin({ identifiers: 'short' }),
  ],
  resolve: {
    alias: {
      '@portfolio/theme': path.resolve(__dirname, '../../libs/theme/src'),
      '@portfolio/ui': path.resolve(__dirname, '../../libs/ui/src'),
      '@portfolio/shared': path.resolve(
        __dirname,
        '../../libs/shared/src/index.ts'
      ),
      '@portfolio/shared-server': path.resolve(
        __dirname,
        '../../libs/shared/src/server.index.ts'
      ),
      '"@portfolio/ui/styles/*': path.resolve(
        __dirname,
        '../../libs/ui/src/styles/*'
      ),
    },
  },
});

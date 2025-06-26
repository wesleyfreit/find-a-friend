import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    pool: 'threads',
    projects: [
      {
        extends: true,
        test: {
          globals: true,
          name: 'e2e',
          include: ['src/http/controllers/**/*.spec.ts'],
          environment: 'prisma',
          root: './',
        },
      },
      {
        extends: true,
        test: {
          globals: true,
          name: 'unit',
          include: ['src/use-cases/**/*.spec.ts'],
          root: './',
        },
      },
    ],
  },
});

// Learn more about Vitest configuration options at https://vitest.dev/config/

import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

// workaround for resolving Error: Failed to resolve import "zone.js/testing" from "init-testbed.js".
const zoneTestingStub: Plugin = {
  name: 'stub-zone-testing',
  resolveId(id) {
    return id === 'zone.js/testing' ? '\0zone-testing-stub' : undefined;
  },
  load(id) {
    return id === '\0zone-testing-stub' ? '' : undefined;
  },
};

export default defineConfig({
  plugins: [zoneTestingStub],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['setup-vitest.ts'],
  },
});

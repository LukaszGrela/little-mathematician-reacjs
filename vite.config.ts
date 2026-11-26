/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // The app is hosted under https://greladesign.co/little-mathematician
  // (package.json "homepage", public/.htaccess RewriteBase), so emitted asset
  // URLs must be absolute under that path. src/main.tsx derives the router
  // basename from the resulting import.meta.env.BASE_URL.
  base: "/little-mathematician/",

  plugins: [react()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setup-test.ts"],
    css: {
      include: [/\.s?css$/],
    },
    deps: {
      web: {
        transformCss: true,
      },
    },
    testTimeout: 20000,
    hookTimeout: 25000,
    exclude: [
      "**/types.ts",
      "src/tests/**",
      "src/types/**",
      "src/setup-test.ts",
      "mock/**",
      "**/__mocks__/**",
      "scripts/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/stories/**",
      "**/cypress/**",
      "**/test/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
    ],
    coverage: {
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: [
        "src/__tests/**",
        "src/**/stories/**",
        "**/*.scss",
        "**/types.ts",
        "**/*.d.ts",
        "**/__test__",
        "**/test/**",
        "**/stories",
        "src/types",
        "src/main.ts",
      ],
    },
  },
});

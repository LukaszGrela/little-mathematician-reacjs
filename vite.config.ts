/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const BASE_URL = "/little-mathematician/";

/**
 * Returns the redirect target when `reqUrl` is the base without its trailing
 * slash ("/little-mathematician"), otherwise null.
 */
const bareBaseTarget = (reqUrl: string | undefined): string | null => {
  const bare = BASE_URL.replace(/\/+$/, "");
  const url = reqUrl ?? "";
  const queryIndex = url.indexOf("?");
  const pathname = queryIndex === -1 ? url : url.slice(0, queryIndex);

  if (bare === "" || pathname !== bare) return null;

  return queryIndex === -1 ? BASE_URL : BASE_URL + url.slice(queryIndex);
};

/**
 * `vite` serves only URLs that start with `base`, so a request for the bare
 * base answers 404 with a "did you mean ..." hint. The router drops the
 * trailing slash when it navigates back to the start page, and reloading that
 * URL ended on the 404 page. Apache gets this for free from DirectorySlash and
 * public/.htaccess, the dev and preview servers need the redirect spelled out.
 */
const trailingSlashRedirect: Plugin = {
  name: "little-mathematician:trailing-slash-redirect",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const target = bareBaseTarget(req.url);
      if (!target) return next();
      res.statusCode = 301;
      res.setHeader("Location", target);
      res.end();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const target = bareBaseTarget(req.url);
      if (!target) return next();
      res.statusCode = 301;
      res.setHeader("Location", target);
      res.end();
    });
  },
};

export default defineConfig({
  // The app is hosted under https://greladesign.co/little-mathematician
  // (package.json "homepage", public/.htaccess RewriteBase), so emitted asset
  // URLs must be absolute under that path. src/main.tsx derives the router
  // basename from the resulting import.meta.env.BASE_URL.
  base: BASE_URL,

  plugins: [react(), trailingSlashRedirect],

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

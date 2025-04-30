// @ts-check
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_SITE_URL } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: false,
      apiVersion: "2025-04-30",
      studioBasePath: "/admin",
      studioRouterHistory: "hash",
    }),
    react(),
  ],
  trailingSlash: "never",
  output: "static",
  site: PUBLIC_SITE_URL,
  image: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [{ protocol: "https" }],
  },
  env: {
    schema: {
      // sanity
      PUBLIC_SANITY_PROJECT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_SANITY_DATASET: envField.string({
        context: "client",
        access: "public",
        default: "production",
      }),
      SANITY_API_READ_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      // misc
      PUBLIC_SITE_URL: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
});

import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema-types";
import { structure } from "./src/sanity/structure";

const devPlugins = [visionTool({ title: "API" })];

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  title: "JOYPIC",
  plugins: [
    structureTool({
      structure,
    }),
    ...(isDev ? devPlugins : []),
  ],
  schema: {
    types: schemaTypes,
  },
});

import type { SchemaTypeDefinition } from "sanity";
import { photographerType } from "./photographer";
import { pictureType } from "./picture";
import { richTextType } from "./rich-text";

export const schemaTypes: SchemaTypeDefinition[] = [photographerType, pictureType, richTextType];

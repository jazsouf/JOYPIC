import { defineQuery } from "groq";

export const ALL_PHOTOGRAPHERS_QUERY = defineQuery(`
  *[_type == "photographer" && defined(slug.current)]{
  ...,
  }
`);

export const ALL_PICTURES_QUERY = defineQuery(`
  *[_type == "picture" && defined(slug.current)]{
  ...,
  }
`);

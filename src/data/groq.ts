import { defineQuery } from "groq";

const pictureBaseFields = /* groq */ `
  "id": slug.current,
  _id,
  _type,
  _createdAt,
  _updatedAt,
  "status": select(_id in path("drafts.**") => "draft", "published"),
  "slug": slug.current,
  name,
  date,
  imageWithAlt {
    "ref": asset._ref,
    alt,
  },
`;

const photographerBaseFields = /* groq */ `
  "id": slug.current,
  _id,
  _type,
  _createdAt,
  _updatedAt,
  "status": select(_id in path("drafts.**") => "draft", "published"),
  "slug": slug.current,
  "name": coalesce(name, "Untitled"),
  imageWithAlt {
    "ref": asset._ref,
    alt,
  },
  bio,
`;

export const ALL_PICTURES_QUERY = defineQuery(`
  *[_type == "picture"] {
    ${pictureBaseFields}
    "photographer" : photographer->.slug.current,
  }
`);

export const ALL_PHOTOGRAPHERS_QUERY = defineQuery(`
  *[_type == "photographer"] {
    ${photographerBaseFields}
    "pictures": *[_type == "picture" && photographer._ref == ^._id].slug.current,
  }
`);

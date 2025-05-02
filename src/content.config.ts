import { defineCollection, reference, z } from "astro:content";

import { getAllPhotographers, getAllPictures } from "./data";

const pictures = defineCollection({
  loader: async () => {
    const result = await getAllPictures();
    return result.data;
  },
  schema: z.object({
    _id: z.string(),
    _type: z.string(),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    status: z.string(),
    slug: z.string(),
    name: z.string(),
    date: z.string().optional(),
    imageWithAlt: z.object({
      ref: z.string(),
      alt: z.string(),
    }),
    photographer: reference("photographers"),
  }),
});

const photographers = defineCollection({
  loader: async () => {
    const result = await getAllPhotographers();
    return result.data;
  },
  schema: z.object({
    _id: z.string(),
    _type: z.string(),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    status: z.string(),
    slug: z.string(),
    name: z.string(),
    imageWithAlt: z.object({
      ref: z.string(),
      alt: z.string(),
    }),
    bio: z.array(z.unknown()),
    pictures: z.array(reference("pictures")),
  }),
});

// Export all collections
export const collections = { pictures, photographers };

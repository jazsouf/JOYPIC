import { ALL_PHOTOGRAPHERS_QUERY, ALL_PICTURES_QUERY } from "./groq";
import { sanityFetch } from "./sanity-fetch";

export async function getAllPhotographers() {
  return sanityFetch<({ id: string } & Record<string, unknown>)[]>({
    query: ALL_PHOTOGRAPHERS_QUERY,
  });
}

export async function getAllPictures() {
  return sanityFetch<({ id: string } & Record<string, unknown>)[]>({
    query: ALL_PICTURES_QUERY,
  });
}

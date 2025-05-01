import { ALL_PHOTOGRAPHERS_QUERY, ALL_PICTURES_QUERY } from "./groq";

import type { QueryParams } from "@sanity/client";

import { sanityClient as client } from "sanity:client";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}) {
  const { result } = await client.fetch<QueryResponse>(query, params ?? {}, {
    perspective: "published",
    filterResponse: false,
    resultSourceMap: false,
  });

  return {
    data: result,
  };
}

export async function getAllCreators() {
  return sanityFetch<({ id: string } & Record<string, unknown>)[]>({
    query: ALL_PHOTOGRAPHERS_QUERY,
  });
}

export async function getAllProducts() {
  return sanityFetch<({ id: string } & Record<string, unknown>)[]>({
    query: ALL_PICTURES_QUERY,
  });
}

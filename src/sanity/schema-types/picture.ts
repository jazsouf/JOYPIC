import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const pictureType = defineType({
  name: "picture",
  type: "document",
  __experimental_formPreviewTitle: false,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "picture" }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "date",
      type: "datetime",
    }),
    defineField({
      name: "photographer",
      type: "reference",
      to: [{ type: "photographer" }],
      options: {
        disableNew: true,
      },
      title: "Photographer",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageWithAlt",
      type: "image",
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.imageWithAlt as any)?.asset?._ref && !alt) {
                return "Required";
              }
              return true;
            });
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "imageWithAlt",
    },
  },
});

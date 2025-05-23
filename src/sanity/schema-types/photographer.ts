import { defineField, defineType } from "sanity";

export const photographerType = defineType({
  name: "photographer",
  type: "document",
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
        maxLength: 96,
      },
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
    defineField({
      name: "bio",
      type: "richText",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "imageWithAlt",
    },
  },
});

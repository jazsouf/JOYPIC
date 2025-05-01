import { ImageIcon, SortIcon, UserIcon } from "@sanity/icons";

import type { StructureResolver } from "sanity/structure";

import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("CONTENT")
    .items([
      S.documentTypeListItem("photographer").title("Photographers").icon(UserIcon),
      S.divider(),
      S.documentTypeListItem("picture").title("Pictures").icon(ImageIcon),
      orderableDocumentListDeskItem({
        type: "picture",
        title: "Order Your Pictures",
        icon: SortIcon,
        S,
        context,
        createIntent: false,
      }),
    ]);

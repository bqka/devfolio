import { visit } from "unist-util-visit";
import type { Root, Paragraph, Text, Image } from "mdast";
import type { Parent } from "unist";

interface Options {
  section: string;
  slug: string;
}

export function remarkObsidianImages({ section, slug }: Options) {
  return function transformer(tree: Root) {
    visit(tree, "paragraph", (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.children.length !== 1) return;

      const child = node.children[0];
      if (child.type !== "text") return;

      const match = child.value.match(/^!\[\[(.+?)\]\]$/);
      if (!match) return;

      const filename = match[1];

      parent.children[index] = {
        type: "image",
        url: `/images/${section}/${slug}/attachments/${filename}`,
        alt: filename,
      };
    });
  };
}
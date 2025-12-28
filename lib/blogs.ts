import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import rehypeHighlight from "rehype-highlight";
import { remarkObsidianImages } from "./remarkObsidianImages";

const blogSectionDirectory = path.join(process.cwd(), "/content");
const blogsDirectory = path.join(process.cwd(), "/content");

type SectionMeta = {
  title: string,
  description: string
}

export async function getBlogSections() {
  const f = await fs.readdir(blogSectionDirectory, { withFileTypes: true });
  const files = f.filter((file) => file.isDirectory() && !file.name.startsWith("."));

  return Promise.all(
    files.map(async (entry) => {
      const slug = entry.name;
      const meta = JSON.parse(
        await fs.readFile(path.join(blogSectionDirectory, slug, "meta.json"), 'utf8')
      ) as SectionMeta;
      return {slug, ...meta};
    })
  )
}

export async function getBlogsBySection(section: string): Promise<BlogMeta[]> {
  const sectionDirs = await fs.readdir(blogsDirectory);
  const dirname = sectionDirs.filter(dir => dir.toLowerCase() === section.toLowerCase())[0];
  const dir = await fs.readdir(path.join(blogsDirectory, dirname), { withFileTypes: true });
  console.log(dir)

  return Promise.all(dir
    .filter(slug => slug.isDirectory())
    .map(async (entry) => {
      const slug = entry.name;

      const filePath = path.join(blogsDirectory, section, slug, "content.md");
      const fileContents = await fs.readFile(filePath, "utf8");

      const { data } = matter(fileContents);
      const frontmatter = data as BlogFrontmatter;

      return {
        slug,
        ...frontmatter,
      };
    }));
}

export async function getBlogBySlug(section: string, slug: string) {
  const fullPath = path.join(blogsDirectory, section, slug, `content.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogFrontmatter;
  const processed = await remark()
    .use(html)
    .use(remarkObsidianImages, { section, slug })
    .use(rehypeHighlight)
    .process(content);
    console.log(processed)

  return {
    slug,
    metadata: frontmatter,
    content: processed.toString(),
  };
}

import { getBlogsBySection, getBlogSections } from "@/lib/blogs";
import ExpandableCardDemo from "./ExpandableCardsGrid";

export default async function BlogsSection() {
  const sections = await getBlogSections();

  const data: Section[] = await Promise.all(
    sections.map(async (section) => {
      const blogs = await getBlogsBySection(section.slug);

      return {
        sectionslug: section.slug,
        title: section.title,
        description: section.description,
        coverImage: `/images/${section.slug}/sectioncover.png`,
        blogs: blogs.map((blog) => ({
          slug: blog.slug,
          sectionslug: section.slug,
          title: blog.title,
          description: blog.description,
          coverImage: `/images/${section.slug}/${blog.slug}/cover.png`,
        })),
      };
    })
  );

  return <ExpandableCardDemo data={data} />;
}

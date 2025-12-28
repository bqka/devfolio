import { getBlogsBySection, getBlogSections } from "@/lib/blogs";
import ExpandableCardsGrid from "./ExpandableCardsGrid";
import FadeIn from "./FadeIn";

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

  return (
    <section className="mt-12 flex flex-col gap-8">
      <FadeIn delay={350}>
        <h1 className="text-2xl">things i've been up to</h1>
      </FadeIn>
      <ExpandableCardsGrid data={data} />
    </section>
  );
}

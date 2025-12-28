import { getBlogBySlug } from "@/lib/blogs";
import "./blogs.css";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ section: string, slug: string }>;
}

export default async function BlogPage({ params }: Props) {
  const { section, slug } = await params;
  const blog = await getBlogBySlug(section, slug);

  return (
    <article className="blog max-w-2xl pt-8 flex flex-col gap-4">
      <a className="flex items-center self-start gap-2 hover:cursor-pointer text-muted hover:text-primary hover:scale-105 transition-all duration-200" href="/">
        <ArrowLeft size={20} /> Back
      </a>
      <h1>{blog.metadata.title}</h1>
      <p className="text-muted">{blog.metadata.date.toDateString()}</p>

      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        className="blog-content"
      />
    </article>
  );
}

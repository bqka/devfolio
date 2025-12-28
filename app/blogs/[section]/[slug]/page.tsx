import { getBlogBySlug } from "@/lib/blogs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./blogs.css";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const blog = await getBlogBySlug(section, slug);

  return (
    <main className="blog flex flex-col max-w-2xl w-full mb-20 pt-20 px-6">
      <Link
        href="/"
        className="flex flex-row items-center gap-1 text-muted text-sm font-medium hover:cursor-pointer hover:scale-102 animate-all duration-200 hover:text-primary/80"
      >
        <ArrowLeft className="inline-block" size={18} />
        <span>Back to Home</span>
      </Link>
      <article
        className="prose dark:prose-invert blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </main>
  );
}

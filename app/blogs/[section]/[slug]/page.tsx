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
    <main className="blog mx-auto mb-20 flex w-full max-w-2xl flex-col px-6 pt-20">
      <Link
        href="/"
        className="text-muted animate-all hover:text-primary/80 flex flex-row items-center gap-1 text-sm font-medium duration-200 hover:scale-102 hover:cursor-pointer"
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

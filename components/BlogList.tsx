"use client";

import Link from "next/link";

export function BlogList({ blogs }: { blogs: BlogPreview[] }) {
  return (
    <div className="rounded-lg space-y-2">
      {blogs.map((blog) => (
        <Link
          key={blog.slug}
          href={`/blogs/${blog.sectionslug}/${blog.slug}`}
          className="block"
        >
          <div className="flex gap-4 items-start rounded-md p-2 transition-colors hover:bg-muted/50">
            <div className="w-40 flex-none">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-auto object-cover rounded"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{blog.title}</h3>
              <p className="text-sm text-muted">
                {blog.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
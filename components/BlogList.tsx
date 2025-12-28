"use client";

import Link from "next/link";

export function BlogList({ blogs }: { blogs: BlogPreview[] }) {
  return (
    <div className="rounded-lg space-y-2 w-full">
      {blogs.map((blog) => (
        <Link
          key={blog.slug}
          href={`/blogs/${blog.sectionslug}/${blog.slug}`}
          className="block w-full"
          scroll={false}
        >
          <div
            className="relative rounded-lg p-3 overflow-hidden bg-cover bg-no-repeat cursor-pointer"
            style={{ backgroundImage: `url(${blog.coverImage})` }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[5px]" />

            <div className="relative z-10 hover:scale-102 animate-all duration-200 p-2">
              <h3 className="text-white font-semibold text-base">
                {blog.title}
              </h3>
              <p className="text-white/80 text-sm line-clamp-2">
                {blog.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

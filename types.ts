interface BlogFrontmatter {
  title: string;
  date: Date;
  description: string;
  draft?: boolean;
}

interface BlogMeta extends BlogFrontmatter {
    slug: string;
}

interface BlogPost {
    slug: string;
    metadata: BlogFrontmatter;
    content: string;
}


interface BlogPreview {
  slug: string;
  sectionslug: string;
  title: string;
  description: string;
  coverImage: string;
}

interface Section {
  sectionslug: string;
  title: string;
  description: string;
  coverImage: string;
  blogs: BlogPreview[];
}
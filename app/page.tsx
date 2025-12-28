import BlogsSection from "@/components/BlogSection";
import { content } from "./data/content";

export default function Home() {
  const { profile, links, points } = content;

  return (
    <main className="flex flex-col w-[40%] pt-16">
      <header>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-6 items-center">
            <div className="size-18 rounded-full bg-slate-600" />

            <span className="text-5xl">{profile.name}</span>
          </div>

          <p>{profile.bio}</p>
        </div>
      </header>

      <section className="flex flex-row gap-6 mt-10">
        {links.map((link) => (
          <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer"   className="inline-block text-muted text-sm hover:text-primary hover:scale-105 transition-all duration-200">
            {link.label}
          </a>
        ))}
      </section>

      <section className="mt-14">
        <ul className="list-disc list-inside space-y-5">
          {points.map((point) => (
            <li key={point} className="text-muted text-sm hover:text-primary hover:scale-105 transition-all duration-200">{point}</li>
          ))}
        </ul>
      </section>

      <BlogsSection />
    </main>
  );
}

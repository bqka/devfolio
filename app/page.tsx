import BlogsSection from "@/components/BlogSection";
import { content } from "./data/content";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  const { profile, links, points } = content;
  const [firstName, lastName] = profile.name.split(" ");

  return (
    <main className="mx-auto mb-20 flex max-w-2xl flex-col pt-20">
      <header>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-6">
            {/* Profile Image */}
            <FadeIn delay={150}>
              <div className="size-18 rounded-full bg-slate-600" />
            </FadeIn>

            <div className="flex flex-row gap-2">
              <div className="overflow-hidden pb-[0.15rem]">
                <FadeIn delay={100} duration={200}>
                  <span className="animate-in slide-in-from-right-100 cubic-bezier(0.22, 1, 0.36, 1) inline-block text-5xl leading-tight duration-1100">
                    {firstName}
                  </span>
                </FadeIn>
              </div>
              <div className="relative overflow-hidden pb-[0.15rem]">
                <div className="absolute inset-0 z-0 bg-purple-300/20" />
                <FadeIn delay={200} duration={200}>
                  <span className="animate-in slide-in-from-right-100 relative z-10 inline-block text-5xl leading-tight duration-1600">
                    {lastName}
                  </span>
                </FadeIn>
              </div>
            </div>
          </div>

          <FadeIn>
            <p>{profile.bio}</p>
          </FadeIn>
        </div>
      </header>

      <section className="mt-10 flex flex-row gap-6">
        {links.map((link, i) => (
          <FadeIn key={link.href} delay={150 + i * 80}>
            <a
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary inline-block text-sm transition-all duration-200 hover:scale-105"
            >
              {link.label}
            </a>
          </FadeIn>
        ))}
      </section>

      <section className="mt-14">
        <ul className="list-inside list-disc space-y-5">
          {points.map((point, i) => (
            <FadeIn key={point} delay={100 + i * 100}>
              <li
                key={point}
                className="text-muted hover:text-primary text-sm transition-all duration-200 hover:scale-105"
              >
                {point}
              </li>
            </FadeIn>
          ))}
        </ul>
      </section>

      <BlogsSection />
    </main>
  );
}

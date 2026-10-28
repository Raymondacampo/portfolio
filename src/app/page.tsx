import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { iconFill, iconGlow, stackIcons } from "@/content/icons";
import { site, type Project } from "@/content/site";
import { Button } from "@/components/button";
import { ProjectSummary } from "@/components/project-summary";

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.repoUrl) {
    return null;
  }

  return (
    <Button className="mt-3 text-black/90">
      {project.liveUrl ? (
        <ExternalLink href={project.liveUrl}>Live site</ExternalLink>
      ) : null}
      {project.repoUrl ? (
        <ExternalLink href={project.repoUrl}>Repository</ExternalLink>
      ) : null}
    </Button>
  );
}

function StackMark({ name }: { name: string }) {
  const icon = stackIcons[name];

  if (!icon) {
    return <span>{name}</span>;
  }

  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/5 py-1.5 pr-3.5 pl-1.5">
      <span
        className="grid size-8 place-items-center rounded-full border border-white/15 bg-[#0c1428]"
        style={{ boxShadow: iconGlow(icon.hex) }}
      >
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path d={icon.path} fill={iconFill(icon.hex)} />
        </svg>
      </span>
      {name}
    </span>
  );
}

export default function Home() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-[46rem] px-6 pt-[var(--header-height,5.5rem)] pb-24">
      <SiteHeader name={site.name} />

      <main>
        <section id="top" className="scroll-mt-[calc(var(--header-height,5.5rem)+0.5rem)] pb-8 pt-6">
          <h1 className="text-5xl font-medium tracking-tight sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-4 text-sm text-lime">{site.role}</p>
          <p className="mt-6 max-w-[36rem] text-lg leading-8 text-pretty text-foreground/90">
            {site.headline}
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-base sm:flex-row sm:flex-wrap sm:gap-x-6">
            <li>
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li className="link">
              <ExternalLink href={site.githubUrl}>GitHub</ExternalLink>
            </li>
          </ul>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="scroll-mt-[calc(var(--header-height,5.5rem)+0.5rem)] py-12"
        >
          <h2 id="projects-heading" className="text-2xl font-medium tracking-tight">
            Projects
          </h2>
          <div className="mt-8 space-y-8">
            {site.projects.map((project, index) => (
              <article key={project.name} className="panel panel-hover overflow-hidden">
                <div className="relative aspect-[16/9] bg-[#0c1428]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} homepage`}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(min-width: 768px) 736px, 100vw"
                    />
                  ) : (
                    <div className="placeholder-grid h-full w-full" />
                  )}
                </div>
                <div className="px-6 py-6 sm:px-7">
                  <h3 className="text-3xl font-semibold tracking-tight">{project.name}</h3>
                  <ProjectSummary summary={project.summary} />
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {project.stack.join(", ")}
                  </p>
                  <ProjectLinks project={project} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" aria-labelledby="stack-heading" className="scroll-mt-[calc(var(--header-height,5.5rem)+0.5rem)] py-12">
          <h2 id="stack-heading" className="text-2xl font-medium tracking-tight">
            Stack
          </h2>
          <div className="panel mt-8 space-y-8 px-6 py-7 sm:px-7">
            {site.stack.map((group) => (
              <div key={group.group}>
                <h3 className="text-sm text-muted">{group.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2.5 text-sm">
                  {group.items.map((item) => (
                    <li key={item}>
                      <StackMark name={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="about" aria-labelledby="about-heading" className="scroll-mt-[calc(var(--header-height,5.5rem)+0.5rem)] py-12">
          <h2 id="about-heading" className="text-2xl font-medium tracking-tight">
            About
          </h2>
          <div className="panel mt-8 space-y-5 px-6 py-7 leading-7 text-pretty sm:px-7">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="scroll-mt-[calc(var(--header-height,5.5rem)+0.5rem)] min-h-[calc(100dvh-var(--header-height,5.5rem)-0.5rem)] py-12"
        >
          <h2 id="contact-heading" className="text-2xl font-medium tracking-tight">
            Contact
          </h2>
          <ul className="panel mt-8 space-y-3 px-6 py-7 leading-7 sm:px-7">
            <li>
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li className="link">
              <ExternalLink href={site.githubUrl} >GitHub</ExternalLink>
            </li>
            {/* <li>
              <Button>
                Resume
              </Button>
            </li> */}
          </ul>
        </section>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteHeader({ name }: { name: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.offsetHeight}px`,
      );
    };

    setHeight();
    const resizeObserver = new ResizeObserver(setHeight);
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const viewTop = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const hero = document.getElementById("top");
      if (hero && hero.getBoundingClientRect().bottom > viewTop) {
        setActiveId(null);
        return;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const probe = viewTop + (window.innerHeight - viewTop) * 0.6;
      let current: string | null = null;

      if (atBottom) {
        for (const section of [...sections].reverse()) {
          const element = document.getElementById(section.id);
          if (!element) continue;
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > viewTop) {
            current = section.id;
            break;
          }
        }
      } else {
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (!element) continue;
          const rect = element.getBoundingClientRect();
          if (rect.top <= probe && rect.bottom > probe) {
            current = section.id;
          }
        }
      }

      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[#070b16]"
    >
      <div className="mx-auto flex w-full max-w-[46rem] flex-col items-start gap-3 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between">
        <a className="nav-link text-sm" href="#top">
          {name}
        </a>
        <nav aria-label="Sections">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base font-medium">
            {sections.map((section) => {
              const active = activeId === section.id;
              return (
                <li key={section.id}>
                  <a
                    className={
                      active
                        ? "text-link underline decoration-link underline-offset-[0.2em]"
                        : "nav-link"
                    }
                    href={`#${section.id}`}
                    aria-current={active ? "location" : undefined}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

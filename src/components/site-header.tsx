"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

const sections = [
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

function onSectionClick(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const id = event.currentTarget.hash.slice(1);
  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });

  const hash = `#${id}`;
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
}

export function SiteHeader({ name }: { name: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;

    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.offsetHeight}px`,
      );
    };

    const update = () => {
      const headerBottom = header.getBoundingClientRect().bottom;
      const rootFontSize =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const line = headerBottom + 0.5 * rootFontSize;

      const hero = document.getElementById("top");
      if (hero && hero.getBoundingClientRect().bottom > line) {
        setActiveId(null);
        return;
      }

      let current: string | null = null;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= line + 1) {
          current = section.id;
        }
      }

      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      setHeight();
      onScroll();
    };

    setHeight();
    update();
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(header);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[#070b16]"
    >
      <div className="mx-auto flex w-full max-w-[46rem] flex-col items-start gap-3 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between">
        <a className="nav-link text-sm" href="#top" onClick={onSectionClick}>
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
                    onClick={onSectionClick}
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

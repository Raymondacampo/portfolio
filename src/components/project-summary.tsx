"use client";

import { useEffect, useId, useRef, useState } from "react";

function summaryParagraphs(summary: string) {
  return summary
    .split(/(?<=\.)\s+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function ProjectSummary({ summary }: { summary: string }) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const previewRef = useRef<HTMLParagraphElement>(null);
  const extraId = useId();
  const paragraphs = summaryParagraphs(summary);
  const [lead, ...rest] = paragraphs;

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || expanded) {
      return;
    }

    const measure = () => {
      setCanExpand(preview.scrollHeight > preview.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(preview);
    return () => observer.disconnect();
  }, [expanded, summary]);

  if (!lead) {
    return null;
  }

  const showToggle = canExpand || expanded;

  return (
    <div className="mt-3 leading-7 text-pretty text-foreground/90">
      <p ref={previewRef} className={expanded ? "hidden" : "line-clamp-2 sm:hidden"}>
        {summary}
      </p>
      <div
        id={extraId}
        className={expanded ? "space-y-3" : "hidden space-y-3 sm:block"}
      >
        <p>{lead}</p>
        {rest.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {showToggle ? (
        <button
          type="button"
          className="link mt-2 text-sm sm:hidden"
          aria-expanded={expanded}
          aria-controls={extraId}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? "See less" : "See more"}
        </button>
      ) : null}
    </div>
  );
}

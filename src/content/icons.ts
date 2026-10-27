import type { SimpleIcon } from "simple-icons";
import {
  siCss,
  siDjango,
  siFastapi,
  siFigma,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siPython,
  siReact,
  siRender,
  siSupabase,
  siTailwindcss,
  siVercel,
} from "simple-icons";

export const stackIcons: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  HTML: siHtml5,
  CSS: siCss,
  Python: siPython,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Django: siDjango,
  FastAPI: siFastapi,
  Supabase: siSupabase,
  Figma: siFigma,
  Vercel: siVercel,
  Render: siRender,
};

export function iconFill(hex: string) {
  return luminance(hex) < 0.2 ? "#f4f7ff" : `#${hex}`;
}

export function iconGlow(hex: string) {
  const color = luminance(hex) < 0.2 ? "180, 200, 255" : hexToRgb(hex);
  return `0 0 16px rgba(${color}, 0.55)`;
}

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `${red}, ${green}, ${blue}`;
}

function luminance(hex: string) {
  const value = Number.parseInt(hex, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
}

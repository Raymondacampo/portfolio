export type Project = {
  name: string;
  summary: string;
  stack: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type StackGroup = {
  group: string;
  items: string[];
};

export const site = {
  name: "Raymond A'campo",
  role: "Full-stack engineer",
  headline: "I turn problems into digital solutions.",
  email: "raymondacampodev@gmail.com",
  githubUrl: "https://github.com/Raymondacampo",
  about: [
    "A useful digital product should make something clearer, simpler, or more effective. My focus is on understanding what a client needs to achieve, then turning that understanding into a functional solution.",
  ],
  projects: [
    {
      name: "doctyHealth",
      summary:
        "A web application designed to simplify finding medical specialists, exploring doctor profiles, and managing appointments. I was the full-stack developer and owner.",
      stack: [
        "Next.js",
        "Tailwind CSS",
        "Django REST Framework",
        "PostgreSQL",
        "Google OAuth",
        "JWT",
        "Vercel",
        "Render",
      ],
      image: "/projects/docty-health.jpg",
      liveUrl: "https://docty-health.vercel.app/",
    },
    {
      name: "CDBS",
      summary:
        "A website that centralizes the academy's dance disciplines, class schedules, enrollment information, and dance products. I managed the entire project independently, and applied SEO so prospective students can discover the academy.",
      stack: ["Next.js", "Figma", "Resend"],
      image: "/projects/cdbs.jpg",
      liveUrl: "https://www.centrodedanza.com.do/",
    },
    {
      name: "Third project",
      summary: "Replace this with what the project is and the part you played.",
      stack: ["Add technologies"],
    },
  ] satisfies Project[],
  stack: [
    {
      group: "Languages",
      items: ["JavaScript", "HTML", "CSS", "Python"],
    },
    {
      group: "Frameworks",
      items: ["React", "Next.js", "Tailwind CSS", "Django", "FastAPI"],
    },
    {
      group: "Data",
      items: ["Supabase"],
    },
    {
      group: "Tools",
      items: ["Figma", "Vercel", "Render"],
    },
  ] satisfies StackGroup[],
};

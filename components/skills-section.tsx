"use client"

import type { IconType } from "react-icons"
import {
  SiAirbyte,
  SiAmazonwebservices,
  SiAnthropic,
  SiDbt,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFastify,
  SiFigma,
  SiGit,
  SiGithubactions,
  SiJest,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiPortainer,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTimescale,
  SiTypescript,
} from "react-icons/si"
import { useTranslations } from "@/hooks/use-translations"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

type Technology = { name: string; icon: IconType }
type GroupKey = "frontend" | "backend" | "data" | "tools"

const TECHNOLOGY_GROUPS: Record<GroupKey, Technology[]> = {
  frontend: [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "React Native", icon: SiReact },
    { name: "Expo", icon: SiExpo },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Three.js", icon: SiThreedotjs },
    { name: "Figma", icon: SiFigma },
  ],
  backend: [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Fastify", icon: SiFastify },
    { name: "Express", icon: SiExpress },
    { name: "Prisma", icon: SiPrisma },
    { name: "Redis", icon: SiRedis },
    { name: "Jest", icon: SiJest },
  ],
  data: [
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MySQL", icon: SiMysql },
    { name: "TimescaleDB", icon: SiTimescale },
    { name: "Supabase", icon: SiSupabase },
    { name: "Airbyte", icon: SiAirbyte },
    { name: "dbt Core", icon: SiDbt },
  ],
  tools: [
    { name: "Docker", icon: SiDocker },
    { name: "Portainer", icon: SiPortainer },
    { name: "AWS", icon: SiAmazonwebservices },
    { name: "GitHub Actions", icon: SiGithubactions },
    { name: "Git", icon: SiGit },
    { name: "n8n", icon: SiN8N },
    { name: "Anthropic Claude", icon: SiAnthropic },
  ],
}

const GROUP_ORDER: GroupKey[] = ["frontend", "backend", "data", "tools"]

export function SkillsSection() {
  const t = useTranslations()

  return (
    <section id="skills" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading label={t.skills.title} title={t.skills.heading} />

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {GROUP_ORDER.map((group, index) => (
            <Reveal key={group} stagger delay={index * 0.08}>
              <h3 data-reveal-item className="text-sm text-muted-foreground">
                {t.skills[group]}
              </h3>
              <ul className="mt-4 border-t border-border">
                {TECHNOLOGY_GROUPS[group].map(({ name, icon: Icon }) => (
                  <li key={name} data-reveal-item className="flex h-12 items-center gap-3 border-b border-border text-[15px] text-foreground">
                    <Icon size={16} aria-hidden className="shrink-0 text-muted-foreground" />
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

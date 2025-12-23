"use client";

import React, { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/PageTransition";

type Level = "Básico" | "Intermedio" | "Avanzado";
type GroupKey = "Frontend" | "Backend" | "Base de datos" | "Dev & Tools" | "UX/UI";

const ACCENT = "#3191A6";

const levelMeta: Record<
  Level,
  { pct: number; pill: string; bar: string; dot: string }
> = {
  Básico: {
    pct: 35,
    pill: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    bar: "bg-zinc-900",
    dot: "bg-zinc-400",
  },
  Intermedio: {
    pct: 65,
    pill: "bg-[#3191A6]/10 text-[#22697A] ring-[#3191A6]/20",
    bar: "bg-[#3191A6]",
    dot: "bg-[#3191A6]",
  },
  Avanzado: {
    pct: 90,
    pill: "bg-[#3191A6]/15 text-[#1F5A66] ring-[#3191A6]/25",
    bar: "bg-[#3191A6]",
    dot: "bg-[#3191A6]",
  },
};

type Skill = {
  name: string;
  level: Level;
  group: GroupKey;
  highlights: string[];
};

const skills: Skill[] = [
  // Frontend
  { name: "HTML", level: "Avanzado", group: "Frontend", highlights: ["Semántica", "SEO", "Accesibilidad"] },
  { name: "CSS", level: "Avanzado", group: "Frontend", highlights: ["Responsive", "Layout", "Animaciones"] },
  { name: "JavaScript", level: "Avanzado", group: "Frontend", highlights: ["DOM", "Async", "Fetch"] },
  { name: "TypeScript", level: "Básico", group: "Frontend", highlights: ["Tipos", "Interfaces", "Props"] },
  { name: "Angular", level: "Básico", group: "Frontend", highlights: ["Componentes", "Routing"] },
  { name: "Tailwind", level: "Básico", group: "Frontend", highlights: ["UI rápida", "Design tokens"] },
  { name: "React", level: "Básico", group: "Frontend", highlights: ["Hooks", "Componentes"] },

  // Backend
  { name: "Node.js", level: "Básico", group: "Backend", highlights: ["APIs", "NPM"] },
  { name: "PHP", level: "Intermedio", group: "Backend", highlights: ["WordPress", "Backend"] },
  { name: "Python", level: "Intermedio", group: "Backend", highlights: ["Scripts", "Automatización"] },

  // DB
  { name: "SQL Server", level: "Intermedio", group: "Base de datos", highlights: ["Consultas", "Modelado"] },
  { name: "SQLite", level: "Intermedio", group: "Base de datos", highlights: ["Relacional", "Proyectos pequeños", "Local"]},
  { name: "Firebase", level: "Básico", group: "Base de datos", highlights: ["Firestore", "Auth"] },

  // Tools
  { name: "GitHub", level: "Intermedio", group: "Dev & Tools", highlights: ["Versionado", "PRs"] },
  { name: "WordPress", level: "Avanzado", group: "Dev & Tools", highlights: ["Elementor", "Plugins", "Optimización"] },

  // UX/UI
  { name: "Figma", level: "Avanzado", group: "UX/UI", highlights: ["UI", "Prototipos", "Flujos"] },
];

const groups: Array<{
  key: GroupKey;
  title: string;
  desc: string;
  icon: React.ReactNode;
}> = [
  {
    key: "Frontend",
    title: "Frontend",
    desc: "Interfaz, estilos, componentes y experiencia de usuario.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "Backend",
    title: "Backend",
    desc: "Lógica, APIs, automatización y scripts.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 8l-3 4 3 4M17 8l3 4-3 4M14 6l-4 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "Base de datos",
    title: "Base de datos",
    desc: "Modelado, consultas y servicios cloud.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    key: "Dev & Tools",
    title: "Dev & Tools",
    desc: "Herramientas, CMS y flujo de trabajo.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M14 7l3 3-7 7H7v-3l7-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M12 5l2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "UX/UI",
    title: "UX/UI",
    desc: "Diseño, prototipado y consistencia visual.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 19l6-6 4 4 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 7v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function LevelChip({ level }: { level: Level }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${levelMeta[level].pill}`}
    >
      <span className={`h-2 w-2 rounded-full ${levelMeta[level].dot}`} />
      {level}
    </span>
  );
}

function SkillTile({ s }: { s: Skill }) {
  const meta = levelMeta[s.level];

  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-zinc-900">{s.name}</p>
          <p className="mt-1 text-sm text-zinc-600">{s.group}</p>
        </div>
        <LevelChip level={s.level} />
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className={`h-full rounded-full ${meta.bar} transition-all duration-700 ease-out group-hover:w-full`}
            style={{ width: `${meta.pct}%` }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {s.highlights.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccordionSection({
  title,
  desc,
  icon,
  open,
  onToggle,
  children,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
      >
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-800">
            {icon}
          </span>
          <div>
            <p className="text-lg font-extrabold text-zinc-900">{title}</p>
            <p className="mt-1 text-sm text-zinc-600">{desc}</p>
          </div>
        </div>

        <span
          className={`grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition ${
            open ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-5 pb-6 sm:px-6">{children}</div>
      </div>
    </div>
  );
}

export default function HabilidadesPage() {
  const [openKey, setOpenKey] = useState<GroupKey>("Frontend");

  const grouped = useMemo(() => {
    const map = new Map<GroupKey, Skill[]>();
    for (const g of groups) map.set(g.key, []);
    for (const s of skills) map.get(s.group)?.push(s);
    return map;
  }, []);

  const improvingNow = ["React", "Tailwind", "TypeScript", "Node.js"];

  return (
    <PageTransition>
      <main className="min-h-screen bg-zinc-100 text-zinc-900">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 pt-28 pb-10 sm:pt-32">
            <Reveal>
              <p className="text-sm font-semibold tracking-wide text-zinc-500">
                Stack & Skills
              </p>

              <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Habilidades
              </h1>

              <p className="mt-4 max-w-2xl text-zinc-600">
                Una vista clara, bonita y ordenada de mis herramientas: lo que ya domino y lo que sigo reforzando.
              </p>

              <div
                className="mt-6 h-[3px] w-24 rounded-full"
                style={{ backgroundColor: "#3191A6" }}
              />
            </Reveal>
          </div>
        </section>


        {/* BENTO (3 cards iguales) */}
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="grid gap-4 md:grid-cols-3 items-stretch">
            <Reveal>
              <div className="h-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col">
                <p className="text-sm font-semibold" style={{ color: ACCENT }}>Enfoque</p>
                <p className="mt-2 text-2xl font-extrabold text-zinc-900">Web + UX</p>
                <p className="mt-2 text-sm text-zinc-600">
                  Me importa que la UI se vea bien y se sienta rápida al usar.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="h-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col">
                <p className="text-sm font-semibold" style={{ color: ACCENT }}>Fortalezas</p>
                <p className="mt-2 text-2xl font-extrabold text-zinc-900">WordPress + Figma</p>
                <p className="mt-2 text-sm text-zinc-600">
                  Prototipo, diseño y ejecuto sitios orientados a negocio.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="h-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col">
                <p className="text-sm font-semibold" style={{ color: ACCENT }}>Ahora mejorando</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {improvingNow.map((x) => (
                    <span
                      key={x}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 border border-zinc-200"
                    >
                      {x}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-sm text-zinc-600">
                  Subiendo nivel con práctica constante y proyectos reales.
                </p>

                {/* empuja para que esta card no “crezca” visualmente por contenido */}
                <div className="mt-auto" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ACORDEÓN POR ÁREAS */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-4">
            {groups.map((g) => {
              const list = grouped.get(g.key) ?? [];
              const open = openKey === g.key;

              return (
                <Reveal key={g.key}>
                  <AccordionSection
                    title={g.title}
                    desc={g.desc}
                    icon={g.icon}
                    open={open}
                    onToggle={() => setOpenKey((prev) => (prev === g.key ? prev : g.key))}
                  >
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {list.map((s) => (
                        <SkillTile key={s.name} s={s} />
                      ))}
                    </div>
                  </AccordionSection>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black py-6 text-center text-sm" style={{ color: "rgba(49,145,166,.85)" }}>
          © 2025 Rodrigo Cotrina Temple - Todos los derechos reservados.
        </footer>
      </main>
    </PageTransition>
  );
}

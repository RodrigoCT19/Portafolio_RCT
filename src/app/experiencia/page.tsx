"use client";

import React, { useMemo, useState } from "react";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";

const ACCENT = "#3191A6";

/* =======================
   EXPERIENCIA
======================= */
type ExpItem = {
  date: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  highlights: string[];
  tech: string[];
};

const experience: ExpItem[] = [
  {
    date: "2024 - 2025",
    title: "Practicante / Desarrollador Web",
    company: "Consultora de Asesoría Empresarial JB",
    location: "Lima, Perú",
    description:
      "Optimización de la plataforma web institucional para mejorar la experiencia del usuario y la eficiencia operativa.",
    highlights: [
      "Mejoras UI/UX y estructura de contenidos",
      "Implementación de secciones y módulos web",
      "Soporte técnico y mantenimiento evolutivo",
    ],
    tech: ["WordPress", "HTML", "CSS", "JavaScript", "Figma", "GitHub"],
  },
  {
    date: "2023 - 2024",
    title: "Proyectos Académicos (Web / Full Stack)",
    company: "Universidad César Vallejo (UCV)",
    location: "Lima, Perú",
    description:
      "Desarrollo de proyectos web orientados a automatización y solución de necesidades reales. Incluye sistemas con login, roles y CRUD básico.",
    highlights: [
      "Diseño e implementación de flujos para usuarios",
      "Login, registro, roles y CRUD en proyectos académicos",
      "Integración con servicios en la nube y enfoque en usabilidad",
    ],
    tech: [
      "Angular",
      "TypeScript",
      "SCSS",
      "Firebase",
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "GitHub",
      "Figma",
    ],
  },
];

/* =======================
   CERTIFICACIONES
======================= */
type CertGroup = {
  title: string;
  subtitle: string;
  items: { name: string; date: string }[];
};

const certifications: CertGroup[] = [
  {
    title: "CERTIFICADOS DIGITALES",
    subtitle: "Cisco Networking Academy",
    items: [
      { name: "Introducción a la Ciberseguridad (PCC 2025)", date: "Dic 2025" },
      { name: "CyberOps Associate", date: "Feb 2025" },
      { name: "Operating Systems Basics", date: "Ene 2025" },
      { name: "Switching, Routing, and Wireless Essentials", date: "Jun 2024" },
      { name: "Enterprise Networking, Security, and Automation", date: "Mar 2024" },
      { name: "Seguridad de Terminales", date: "Ene 2024" },
      { name: "Dispositivos de Red y Configuración Inicial", date: "Ago 2023" },
      { name: "Introduction to Networks", date: "Mar 2023" },
      { name: "Programming Essentials in Python", date: "Mar 2023" },
    ],
  },
  {
    title: "CERTIFICADOS DE DISEÑO GRÁFICO",
    subtitle: "Universidad para el Desarrollo Andino (UDEA)",
    items: [
      { name: "Adobe Photoshop (Expert)", date: "Jun 2021" },
      { name: "Corel Draw (Designer)", date: "Feb 2021" },
      { name: "Adobe Illustrator (Designer)", date: "Ene 2021" },
    ],
  },
  {
    title: "CERTIFICADOS DE OFIMÁTICA Y EXCEL",
    subtitle: "Universidad para el Desarrollo Andino (UDEA)",
    items: [
      { name: "Programación en Excel con VBA", date: "Ago 2021" },
      { name: "Fundamentos de Programación en Excel con VBA", date: "Ago 2021" },
      { name: "Aplicaciones de VBA", date: "Mar 2021" },
      { name: "Introducción a Macros y VBA", date: "Mar 2021" },
      { name: "Especialista de Excel 2016 (básico, intermedio y avanzado)", date: "Feb 2021" },
      { name: "Microsoft PowerPoint 2016", date: "Sep 2020" },
    ],
  },
];

/* LINKS A DRIVE */
const certLinks: Record<string, string> = {
  "CERTIFICADOS DIGITALES":
    "https://drive.google.com/drive/folders/1kIyI5vLwyUzt1XKdVThKngXlNnXkaHkV?usp=sharing",
  "CERTIFICADOS DE DISEÑO GRÁFICO":
    "https://drive.google.com/drive/folders/1dLweZCJka7A6Nbx6YqTpMai5USilpqgm?usp=sharing",
  "CERTIFICADOS DE OFIMÁTICA Y EXCEL":
    "https://drive.google.com/drive/folders/1Qqp-1660NzGTSvyPJi9fV3JIWL_vZP_S?usp=sharing",
};

/* =======================
   COMPONENTES
======================= */
function TechChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
      {label}
    </span>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex gap-3">
      <span
        className="mt-0.5 grid h-5 w-5 place-items-center rounded-full border"
        style={{
          borderColor: "rgba(49,145,166,.35)",
          backgroundColor: "rgba(49,145,166,.10)",
        }}
        aria-hidden
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />
      </span>
      <span className="text-sm text-zinc-700">{text}</span>
    </li>
  );
}

/* =======================
   PAGE
======================= */
export default function ExperienciaPage() {
  const [activeCert, setActiveCert] = useState(0);

  const certTabs = useMemo(
    () =>
      certifications.map((c, idx) => ({
        idx,
        title: c.title,
      })),
    []
  );

  return (
    <PageTransition>
      <main className="min-h-screen bg-zinc-100 text-zinc-900">
        {/* HERO */}
        <section className="mx-auto max-w-5xl px-4 pt-28 pb-10 sm:pt-32">
          <Reveal>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Experiencia
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-600">
              Trayectoria, roles y proyectos desarrollados en entornos reales y académicos.
            </p>
            <div className="mt-5 h-[3px] w-24 rounded-full" style={{ backgroundColor: ACCENT }} />
          </Reveal>
        </section>

        {/* EXPERIENCIA */}
        <section className="mx-auto max-w-5xl px-4 pb-12">
          <div className="grid gap-6">
            {experience.map((e) => (
              <Reveal key={e.title}>
                <article className="rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-lg">
                  <p className="text-sm font-semibold" style={{ color: ACCENT }}>
                    {e.date}
                  </p>

                  <h2 className="mt-1 text-xl font-extrabold text-zinc-900 sm:text-2xl">
                    {e.title}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-600">
                    <span className="font-semibold text-zinc-800">{e.company}</span>
                    {e.location ? ` • ${e.location}` : ""}
                  </p>

                  <p className="mt-4 text-zinc-700">{e.description}</p>

                  <ul className="mt-5 grid gap-2">
                    {e.highlights.map((h) => (
                      <CheckItem key={h} text={h} />
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.tech.map((t) => (
                      <TechChip key={t} label={t} />
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CERTIFICACIONES */}
        <section className="mx-auto max-w-5xl px-4 pb-16">
          <Reveal>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Certificaciones</h2>
            <p className="mt-2 text-zinc-600">
              Cursos y certificados complementarios (digitales, diseño y ofimática).
            </p>
          </Reveal>

          {/* TABS */}
          <div className="mt-6 flex flex-wrap gap-2">
            {certTabs.map((t) => {
              const active = activeCert === t.idx;
              return (
                <button
                  key={t.title}
                  onClick={() => setActiveCert(t.idx)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? "text-white"
                      : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }`}
                  style={active ? { backgroundColor: ACCENT } : undefined}
                >
                  {t.title.replace("CERTIFICADOS ", "")}
                </button>
              );
            })}
          </div>

          {/* PANEL */}
          <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm">
            {/* En móvil: columna. En sm+: fila como antes */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div>
                <p className="text-sm font-extrabold text-zinc-900">
                  {certifications[activeCert].title}
                </p>
                <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                  {certifications[activeCert].subtitle}
                </p>
              </div>

              {/* Botón: en móvil ocupa el ancho para que no rompa el layout */}
              <a
                href={certLinks[certifications[activeCert].title]}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-[#3191A6] hover:text-[#3191A6] sm:w-auto sm:py-1"
              >
                Ver certificados completos <span aria-hidden>↗</span>
              </a>
            </div>

            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {certifications[activeCert].items.map((it) => (
                <li
                  key={it.name}
                  className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                >
                  <span className="text-sm font-semibold text-zinc-800">
                    {it.name}
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-zinc-600">
                    {it.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black py-6 text-center text-sm text-cyan-300/80">
          © 2025 Rodrigo Cotrina Temple - Todos los derechos reservados.
        </footer>
      </main>
    </PageTransition>
  );
}

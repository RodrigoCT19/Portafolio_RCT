"use client";

import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  role?: string;
  features: string[];
  links?: { label: string; href: string }[];
};

const ACCENT = "#2D8497";

const projects: Project[] = [
  {
    title: "Sistema de Reciclaje Interno",
    subtitle: "Proyecto académico – optimización de procesos",
    description:
      "Sistema para registrar, visualizar y analizar residuos metálicos, orientado a eficiencia operativa y toma de decisiones.",
    stack: ["Python", "SQL", "Dashboard", "Análisis de datos"],
    role: "Desarrollo + análisis",
    features: [
      "Registro de residuos y trazabilidad",
      "Indicadores / reportes para toma de decisiones",
      "Exportación / control básico",
    ],
    links: [
      { label: "Repositorio", href: "https://github.com/RodrigoCT19/reciclaje-sistema.git" },
    ],
  },
  {
    title: "StudyBook",
    subtitle: "Sistema de reservas de salas (UCV - Biblioteca)",
    description:
      "Aplicación para automatizar la reserva de salas de estudio, con una experiencia rápida, clara y accesible para estudiantes.",
    stack: ["Angular", "TypeScript", "SCSS", "Firebase"],
    role: "Front + Integración",
    features: [
      "Reserva de salas con disponibilidad",
      "Flujo simple y accesible para estudiantes",
      "Persistencia en Firebase",
    ],
    links: [{ label: "Repositorio", href: "https://github.com/RodrigoCT19/StudyBook.git" }],
  },
  {
    title: "Portafolio RCT",
    subtitle: "Next.js + Tailwind + animaciones",
    description:
      "Mi Portafolio personal con un diseño responsive, transiciones suaves y con una estructura escalable para futuras secciones.",
    stack: ["Next.js", "TypeScript", "Tailwind", "UI/UX"],
    role: "Front-end",
    features: [
      "Diseño responsive",
      "Transiciones entre páginas",
      "Secciones limpias y reutilizables",
    ],
    links: [
      { label: "Repositorio (pendiente)", href: "#" },
      { label: "Ver sitio", href: "/" },
    ],
  },
  {
    title: "Cafetería Isa",
    subtitle: "Sistema web con login y gestión básica",
    description:
      "Proyecto académico Full Stack con login, roles y administración básica para una cafetería (usuarios y administrador).",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    role: "Full Stack (académico)",
    features: [
      "Inicio de sesión y registro",
      "Vistas para usuario y administrador",
      "CRUD básico de productos/gestión",
    ],
    links: [{ label: "Repositorio", href: "https://github.com/RodrigoCT19/Cafeteria_Isa.git" }],
  },
];

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {label}
    </span>
  );
}

function IconGithub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C6.477 2 2 6.56 2 12.184c0 4.5 2.865 8.318 6.839 9.665.5.095.682-.222.682-.494 0-.244-.009-.89-.014-1.747-2.782.62-3.369-1.37-3.369-1.37-.455-1.176-1.11-1.49-1.11-1.49-.908-.64.069-.628.069-.628 1.004.072 1.533 1.056 1.533 1.056.892 1.56 2.341 1.11 2.91.848.091-.664.35-1.11.636-1.365-2.22-.26-4.555-1.14-4.555-5.072 0-1.12.39-2.035 1.029-2.752-.103-.26-.446-1.308.098-2.727 0 0 .84-.275 2.75 1.05A9.3 9.3 0 0 1 12 6.9c.85.004 1.705.118 2.504.347 1.909-1.325 2.748-1.05 2.748-1.05.546 1.419.203 2.467.1 2.727.64.717 1.028 1.632 1.028 2.752 0 3.942-2.339 4.809-4.566 5.064.359.316.679.94.679 1.894 0 1.366-.012 2.468-.012 2.804 0 .275.18.595.688.494C19.138 20.498 22 16.68 22 12.184 22 6.56 17.523 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ProyectosPage() {
  return (
    <PageTransition>
      <section className="relative min-h-screen">
        {/* Fondo oscuro (mismo estilo general) */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 opacity-[0.22] [background:radial-gradient(60%_60%_at_20%_10%,rgba(45,132,151,0.25),transparent_60%),radial-gradient(50%_50%_at_80%_30%,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.92))]" />

        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:pt-32">
          <Reveal>
            <div className="flex flex-col gap-3">

              <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                Proyectos
              </h1>

              <p className="max-w-2xl text-white/70">
                Proyectos académicos y reales con enfoque en funcionalidad, UI/UX y mejora de procesos.
                Incluyen repositorios para revisión de código.
              </p>

              <div className="mt-2 h-[2px] w-40 rounded-full" style={{ backgroundColor: ACCENT }} />
            </div>
          </Reveal>

          {/* Grid de proyectos */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <Reveal key={p.title}>
                <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
                  {/* glow suave */}
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: ACCENT }}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                        {p.title}
                      </h2>
                      <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
                    </div>

                    <div
                      className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white/5 grid place-items-center transition group-hover:border-white/20"
                      title="Proyecto"
                    >
                      <span className="text-white/80 transition group-hover:text-white">↗</span>
                    </div>
                  </div>

                  {p.role && (
                    <p className="mt-3 text-sm text-white/70">
                      <span className="font-semibold" style={{ color: ACCENT }}>
                        Rol:
                      </span>{" "}
                      {p.role}
                    </p>
                  )}

                  <p className="mt-3 text-white/75">{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Chip key={s} label={s} />
                    ))}
                  </div>

                  <ul className="mt-5 space-y-2 text-sm text-white/75">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span style={{ color: ACCENT }}>●</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  {p.links && p.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {p.links.map((l) => {
                        const isPlaceholder = l.href === "#";
                        const base =
                          "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition";
                        const primary =
                          "text-white shadow-lg shadow-black/30 hover:brightness-110 active:translate-y-[1px]";
                        const secondary =
                          "border border-white/15 text-white/80 hover:text-white hover:border-white/25";

                        // botones deshabilitados (#)
                        if (isPlaceholder) {
                          return (
                            <span
                              key={l.label}
                              className={`${base} ${secondary} cursor-not-allowed opacity-60`}
                              title="Aún no disponible"
                            >
                              <IconGithub />
                              {l.label}
                            </span>
                          );
                        }

                        const isRepo = l.label.toLowerCase().includes("repo");
                        const isPrimary = isRepo; // el repo será el botón principal

                        // Si es un link externo (github), mejor usar <a>
                        const isExternal = l.href.startsWith("http");

                        const content = (
                          <>
                            {isRepo ? <IconGithub /> : null}
                            {l.label}
                          </>
                        );

                        if (isExternal) {
                          return (
                            <a
                              key={l.label}
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              className={`${base} ${isPrimary ? primary : secondary}`}
                              style={isPrimary ? { backgroundColor: ACCENT } : undefined}
                            >
                              {content}
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={l.label}
                            href={l.href}
                            className={`${base} ${isPrimary ? primary : secondary}`}
                            style={isPrimary ? { backgroundColor: ACCENT } : undefined}
                          >
                            {content}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer igual */}
        <div className="relative bg-black py-6 text-center text-sm text-cyan-300/80">
          © 2025 Rodrigo Cotrina Temple - Todos los derechos reservados.
        </div>
      </section>
    </PageTransition>
  );
}

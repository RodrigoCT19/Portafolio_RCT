"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
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
  preview: string;
};

const ACCENT = "#2D8497";

const projects: Project[] = [
  {
    title: "Ztrack",
    subtitle: "Sistema de gestión de estudiantes y notas",
    description:
      "Aplicación web Full Stack para la gestión de estudiantes y sus notas/exámenes, con un flujo claro de CRUD y visualización detallada por estudiante.",
    stack: ["React", "FastAPI", "MongoDB", "Tailwind", "Vite"],
    role: "Full Stack",
    features: [
      "CRUD completo de estudiantes",
      "Visualización de notas/exámenes por estudiante",
      "API REST documentada con Swagger",
    ],
    links: [
      { label: "Repositorio", href: "https://github.com/RodrigoCT19/Ztrack.git" },
    ],
    preview: "/projects/Ztrack.png",
  },
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
    links: [{ label: "Repositorio", href: "https://github.com/RodrigoCT19/reciclaje-sistema.git" }],
    preview: "/projects/SistemaReciclaje.png",
  },
  {
    title: "StudyBook",
    subtitle: "Sistema de reservas de salas",
    description:
      "Aplicación para automatizar la reserva de salas de estudio, con una experiencia rápida, clara y accesible para estudiantes.",
    stack: ["Angular", "TypeScript", "SCSS", "Firebase"],
    role: "Front-end + Integración",
    features: [
      "Reserva de salas con disponibilidad",
      "Flujo simple y accesible para estudiantes",
      "Persistencia en Firebase",
    ],
    links: [{ label: "Repositorio", href: "https://github.com/RodrigoCT19/StudyBook.git" }],
    preview: "/projects/StudyBook.png",
  },
  {
    title: "Portafolio RCT",
    subtitle: "Next.js + Tailwind",
    description:
      "Mi Portafolio personal con un diseño responsive, transiciones suaves y con una estructura escalable para futuras secciones.",
    stack: ["Next.js", "TypeScript", "Tailwind", "UI/UX"],
    role: "Front-end",
    features: ["Diseño responsive", "Transiciones entre páginas", "Secciones limpias y reutilizables"],
    links: [
      { label: "Repositorio", href: "https://github.com/RodrigoCT19/Portafolio_RCT.git" },
      { label: "Ver sitio", href: "/" },
    ],
    preview: "/projects/PortafolioRCT.png",
  },
  {
    title: "Cafetería Isa",
    subtitle: "Sistema web con login y gestión básica",
    description:
      "Proyecto académico Full Stack con login, roles y administración básica para una cafetería (usuarios y administrador).",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    role: "Full Stack",
    features: ["Inicio de sesión y registro", "Vistas para usuario y administrador", "CRUD básico de productos/gestión"],
    links: [{ label: "Repositorio", href: "https://github.com/RodrigoCT19/Cafeteria_Isa.git" }],
    preview: "/projects/CafeteriaIsa.png",
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

function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;

    // Compensa ancho de scrollbar para evitar “barra blanca” / layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";

    return () => {
      const top = body.style.top;

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.paddingRight = "";

      window.scrollTo(0, parseInt(top || "0", 10) * -1);
    };
  }, [isOpen]);
}

export default function ProyectosPage() {
  const [open, setOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const modalScrollRef = useRef<HTMLDivElement | null>(null);

  const activeProject = useMemo(
    () => projects.find((p) => p.title === activeTitle) || null,
    [activeTitle]
  );

  useBodyScrollLock(open);

  // Asegura Portal solo en cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset del scroll interno del modal cuando se abre / cambia proyecto
  useEffect(() => {
    if (!open) return;
    // en el siguiente “tick” para asegurar que el div exista
    requestAnimationFrame(() => {
      if (modalScrollRef.current) modalScrollRef.current.scrollTop = 0;
    });
  }, [open, activeTitle]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveTitle(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openProject = (title: string) => {
    setActiveTitle(title);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActiveTitle(null);
  };

  return (
    <PageTransition>
      <section className="relative min-h-screen">
        {/* Fondo */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 opacity-[0.22] [background:radial-gradient(60%_60%_at_20%_10%,rgba(45,132,151,0.25),transparent_60%),radial-gradient(50%_50%_at_80%_30%,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.92))]" />

        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:pt-32">
          <Reveal>
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Proyectos</h1>

              <p className="max-w-2xl text-white/70">
                Proyectos académicos y reales con enfoque en funcionalidad, UI/UX y mejora de procesos.
                Incluyen repositorios para revisión de código.
              </p>

              <div className="mt-2 h-[2px] w-40 rounded-full" style={{ backgroundColor: ACCENT }} />
            </div>
          </Reveal>

          {/* Cards con preview + resumen, detalles en modal */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <Reveal key={p.title}>
                <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 backdrop-blur transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
                  {/* Preview clickeable */}
                  <button
                    type="button"
                    onClick={() => openProject(p.title)}
                    className="relative block w-full text-left"
                    aria-label={`Ver detalles de ${p.title}`}
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-black/40 sm:h-56">
                      <Image
                        src={p.preview}
                        alt={`Preview ${p.title}`}
                        fill
                        className="object-cover opacity-90 transition duration-300 group-hover:opacity-100"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.15))]" />
                      <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80">
                        Preview
                      </div>
                    </div>
                  </button>

                  {/* Contenido corto */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-extrabold text-white sm:text-2xl">{p.title}</h2>
                        <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => openProject(p.title)}
                        className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white/5 grid place-items-center transition hover:border-white/20"
                        title="Ver detalles"
                      >
                        <span className="text-white/80 transition hover:text-white">↗</span>
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <Chip key={s} label={s} />
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {/* Repo (principal) */}
                      {p.links?.map((l) => {
                        const isRepo = l.label.toLowerCase().includes("repo");
                        if (!isRepo) return null;
                        return (
                          <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:brightness-110 active:translate-y-[1px]"
                            style={{ backgroundColor: ACCENT }}
                          >
                            <IconGithub />
                            {l.label}
                          </a>
                        );
                      })}

                      {/* Ver detalles */}
                      <button
                        type="button"
                        onClick={() => openProject(p.title)}
                        className="inline-flex items-center justify-center rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white hover:border-white/25"
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>

                  {/* glow suave */}
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: ACCENT }}
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* MODAL (Portal a body para evitar problemas con transforms de PageTransition) */}
        {mounted && open && activeProject
          ? createPortal(
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center px-3 sm:px-6"
                role="dialog"
                aria-modal="true"
                aria-label={`Detalles del proyecto ${activeProject.title}`}
              >
                {/* Overlay */}
                <button
                  type="button"
                  className="absolute inset-0 bg-black/70"
                  onClick={closeModal}
                  aria-label="Cerrar"
                />

                {/* Caja modal */}
                <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black/90 shadow-2xl shadow-black/60">
                  {/* Header sticky */}
                  <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur sm:px-6">
                    <p className="text-sm text-white/75">
                      Preview <span className="text-white/40">—</span> {activeProject.title}
                    </p>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 grid place-items-center text-white/80 transition hover:border-white/20 hover:text-white"
                      aria-label="Cerrar modal"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Contenido scrollable dentro */}
                  <div ref={modalScrollRef} className="max-h-[82vh] overflow-y-auto">
                    {/* Imagen */}
                    <div className="relative h-[170px] w-full bg-black sm:h-[240px]">
                      <Image
                        src={activeProject.preview}
                        alt={`Preview ${activeProject.title}`}
                        fill
                        className="object-cover opacity-90"
                        sizes="(max-width: 640px) 100vw, 900px"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.25))]" />
                    </div>

                    {/* Texto */}
                    <div className="p-5 sm:p-7">
                      <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                        {activeProject.title}
                      </h2>
                      <p className="mt-1 text-sm text-white/70">{activeProject.subtitle}</p>

                      {activeProject.role && (
                        <p className="mt-3 text-sm text-white/70">
                          <span className="font-semibold" style={{ color: ACCENT }}>
                            Rol:
                          </span>{" "}
                          {activeProject.role}
                        </p>
                      )}

                      <p className="mt-4 text-white/80">{activeProject.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeProject.stack.map((s) => (
                          <Chip key={s} label={s} />
                        ))}
                      </div>

                      <ul className="mt-5 space-y-2 text-sm text-white/75">
                        {activeProject.features.map((f) => (
                          <li key={f} className="flex gap-2">
                            <span style={{ color: ACCENT }}>●</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Links dentro del modal */}
                      {activeProject.links && activeProject.links.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {activeProject.links.map((l) => {
                            const isPlaceholder = l.href === "#";
                            const base =
                              "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition";
                            const primary =
                              "text-white shadow-lg shadow-black/30 hover:brightness-110 active:translate-y-[1px]";
                            const secondary =
                              "border border-white/15 text-white/80 hover:text-white hover:border-white/25";

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
                            const isPrimary = isRepo;
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
                                onClick={() => {
                                  closeModal();
                                }}
                              >
                                {content}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>,
              document.body
            )
          : null}

        {/* Footer */}
        <div className="relative bg-black py-6 text-center text-sm text-cyan-300/80">
          © 2026 Rodrigo Cotrina Temple - Todos los derechos reservados.
        </div>
      </section>
    </PageTransition>
  );
}

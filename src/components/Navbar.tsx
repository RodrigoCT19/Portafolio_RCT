"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Habilidades", href: "/habilidades" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Experiencia", href: "/experiencia" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const isContact = pathname === "/contacto";
  const isSkills = pathname === "/habilidades";
  const isProjects = pathname === "/proyectos";
  const isExperience = pathname === "/experiencia";

  const isHomeLike = isHome || isContact; // Inicio + Contacto = mismo estilo

  // ========== OCULTAR EN SCROLL (SOLO HOME + CONTACTO) ==========
  const shouldHideOnScroll = isHomeLike;
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Si no aplica el efecto, siempre visible
    if (!shouldHideOnScroll) {
      setIsVisible(true);
      lastScrollY.current = 0;
      return;
    }

    const onScroll = () => {
      const current = window.scrollY;

      // Si estás arriba, siempre visible
      if (current < 10) {
        setIsVisible(true);
      } else if (current > lastScrollY.current) {
        // Bajando
        setIsVisible(false);
        // Si bajas con menú abierto, lo cerramos para evitar panel flotando
        setOpen(false);
      } else {
        // Subiendo
        setIsVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldHideOnScroll]);

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Evita que quede abierto al pasar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const headerClass = "fixed top-0 left-0 right-0 z-50";
  const outerWrapClass = "mx-auto max-w-6xl px-4 pt-4";

  const barClass = isHomeLike
    ? "flex items-center justify-between py-3"
    : isSkills || isExperience
      ? "flex items-center justify-between rounded-3xl bg-zinc-900 px-6 py-3 shadow-md ring-1 ring-white/10"
      : isProjects
        ? "flex items-center justify-between rounded-3xl bg-zinc-200 px-6 py-3 shadow-md ring-1 ring-black/10"
        : "flex items-center justify-between rounded-3xl bg-zinc-200 px-6 py-3 shadow-md ring-1 ring-black/10";

  const navTextClass = isHomeLike
    ? "items-center gap-6 text-sm text-white/80"
    : isSkills || isExperience
      ? "items-center gap-6 text-sm text-white/85"
      : "items-center gap-6 text-sm text-zinc-700";

  const logoSrc = isHomeLike || isSkills || isExperience ? "/logo.png" : "/logo2.png";

  // Línea fina debajo: SOLO en Inicio
  const showDivider = isHomeLike;
  const dividerClass = "h-px w-full bg-white/15";

  const hoverText = useMemo(() => {
    // home/contact y skills/experience = blanco; projects = negro
    return isHomeLike || isSkills || isExperience ? "hover:text-white" : "hover:text-black";
  }, [isHomeLike, isSkills, isExperience]);

  return (
    <header
      className={`${headerClass} transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className={outerWrapClass}>
        <div className={barClass}>
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoSrc} alt="Logo" width={44} height={44} className="rounded" priority />
          </Link>

          {/* Desktop nav */}
          <nav className={`hidden md:flex ${navTextClass}`}>
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`transition hover:opacity-100 ${hoverText} ${
                    active ? "underline underline-offset-8" : ""
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile button */}
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden grid h-10 w-10 place-items-center rounded-xl border transition ${
              isHomeLike || isSkills || isExperience
                ? "border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
                : "border-black/10 bg-black/5 text-zinc-900 hover:bg-black/10"
            }`}
          >
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>

        {showDivider ? <div className={`mt-3 ${dividerClass}`} /> : null}

        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`mt-3 rounded-2xl border p-3 backdrop-blur ${
              isHomeLike || isSkills || isExperience
                ? "border-white/10 bg-zinc-950/70"
                : "border-black/10 bg-white/85"
            }`}
          >
            <div className="grid gap-2">
              {links.map((l) => {
                const active = pathname === l.href;
                const dark = isHomeLike || isSkills || isExperience;

                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      dark ? "text-white/85 hover:bg-white/10" : "text-zinc-800 hover:bg-black/5"
                    } ${active ? (dark ? "bg-white/10" : "bg-black/5") : ""}`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

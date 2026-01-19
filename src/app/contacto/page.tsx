"use client";

import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import emailjs from "@emailjs/browser";
import React, { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ACCENT = "#2D8497";
const MAX_MESSAGE_CHARS = 350;

type ToastType = "success" | "error" | "info";
type ToastState = { open: boolean; type: ToastType; title: string; desc?: string };

function CheckAnim({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 52" fill="none">
      <circle
        className="toast-circle"
        cx="26"
        cy="26"
        r="24"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        className="toast-check"
        d="M16 27l7 7 14-16"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XAnim({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 52" fill="none">
      <circle
        className="toast-circle"
        cx="26"
        cy="26"
        r="24"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        className="toast-x"
        d="M18 18l16 16M34 18L18 34"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [mounted, setMounted] = useState(false);

  // Mensaje controlado para: limitar + contador
  const [message, setMessage] = useState("");
  const remaining = MAX_MESSAGE_CHARS - message.length;

  useEffect(() => setMounted(true), []);

  const [toast, setToast] = useState<ToastState>({
    open: false,
    type: "info",
    title: "",
    desc: "",
  });

  const canSubmit = status !== "sending";

  const toastTone = useMemo(() => {
    if (toast.type === "success") return "text-emerald-300";
    if (toast.type === "error") return "text-rose-300";
    return "text-cyan-300";
  }, [toast.type]);

  const showToast = (next: Omit<ToastState, "open">) => {
    setToast({ open: true, ...next });
    window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 2600);
  };

  return (
    <PageTransition>
      <section className="relative min-h-screen pt-28 sm:pt-32 overflow-x-hidden">
        {/* Fondo estilo Inicio */}
        <Image
          src="/fondo.jpg"
          alt="Fondo"
          fill
          priority
          className="pointer-events-none object-cover opacity-30"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/70" />

        <div className="relative mx-auto w-full max-w-6xl px-2 sm:px-4 pb-16 overflow-x-hidden">
          {/* HERO */}
          <Reveal>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Contacto</h1>
            <p className="mt-3 max-w-2xl text-white/75">
              Si quieres hablar sobre proyectos web, soporte tecnológico o colaboración, escríbeme por cualquiera de
              estos medios.
            </p>
            <div className="mt-5 h-[3px] w-24 rounded-full" style={{ backgroundColor: ACCENT }} />
          </Reveal>

          <div className="mt-10 grid w-full min-w-0 gap-6 lg:grid-cols-2">
            {/* CARD: Datos */}
            <Reveal>
              <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-6 shadow-2xl shadow-black/30 backdrop-blur">
                <h2 className="text-xl font-bold text-white">Mis canales</h2>
                <p className="mt-2 text-sm text-white/70">Respondo más rápido por estos medios.</p>

                <div className="mt-6 space-y-3 sm:space-y-4">
                  {/* Correo */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=rcotrinate@gmail.com&su=Contacto%20-%20Portafolio%20RCT&body=Hola%20Rodrigo%2C"
                    className="group flex w-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-white/85 transition hover:border-white/20 sm:px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
                          <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
                          <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      </span>

                      <span className="min-w-0">
                        {/* En móvil: break-all para evitar desborde. En sm+: truncate como antes */}
                        <span className="block font-semibold text-sm sm:text-base break-all sm:break-normal sm:truncate">
                          rcotrinate@gmail.com
                        </span>
                        <span className="block text-xs text-white/55 sm:hidden">Correo</span>
                      </span>
                    </div>

                    <span className="hidden text-sm sm:inline" style={{ color: ACCENT }}>
                      Correo →
                    </span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/51932142423?text=Hola%20Rodrigo%2C"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex w-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-white/85 transition hover:border-white/20 sm:px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
                          <path
                            d="M7.5 4.5c.9-1 2.4-.9 3.2.2l1.2 1.6c.6.8.5 1.9-.2 2.6l-1.1 1.1c1 1.9 2.6 3.5 4.5 4.5l1.1-1.1c.7-.7 1.8-.8 2.6-.2l1.6 1.2c1.1.8 1.2 2.3.2 3.2l-.7.7c-.8.8-1.9 1.2-3.1 1-7.2-1.3-12.8-6.9-14.1-14.1-.2-1.2.2-2.3 1-3.1l.7-.7Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>

                      <span className="min-w-0">
                        <span className="block font-semibold text-sm sm:text-base break-all sm:break-normal sm:truncate">
                          (+51) 932142423
                        </span>
                        <span className="block text-xs text-white/55 sm:hidden">Celular</span>
                      </span>
                    </div>

                    <span className="hidden text-sm sm:inline" style={{ color: ACCENT }}>
                      Celular →
                    </span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/rodrigo-cotrinat/"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex w-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-white/85 transition hover:border-white/20 sm:px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                        <span className="text-sm font-bold opacity-90">in</span>
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-sm sm:text-base">LinkedIn</span>
                        <span className="block text-xs text-white/55 sm:hidden">Abrir</span>
                      </span>
                    </div>

                    <span className="hidden text-sm sm:inline" style={{ color: ACCENT }}>
                      Abrir →
                    </span>
                  </a>
                </div>

                <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-3">
                  <Link
                    href="/proyectos"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:brightness-110 active:translate-y-[1px]"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Ver proyectos
                  </Link>

                  <a
                    href="/cv-rodrigo.pdf"
                    download
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:text-white hover:border-white/25"
                  >
                    Descargar CV
                  </a>
                </div>
              </div>
            </Reveal>

            {/* CARD: Form con EmailJS */}
            <Reveal>
              <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-6 shadow-2xl shadow-black/30 backdrop-blur">
                <h2 className="text-xl font-bold text-white">Envíame un mensaje</h2>
                <p className="mt-2 text-sm text-white/70">Déjame un mensaje y me pondré en contacto contigo :D</p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!canSubmit) return;

                    const form = e.currentTarget as HTMLFormElement;

                    setStatus("sending");
                    emailjs
                      .sendForm(
                        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                        form,
                        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                      )
                      .then(
                        () => {
                          setStatus("success");
                          showToast({
                            type: "success",
                            title: "Mensaje enviado",
                            desc: "Gracias 🙌 Te responderé lo antes posible.",
                          });
                          form.reset();
                          setMessage("");
                          window.setTimeout(() => setStatus("idle"), 800);
                        },
                        (error) => {
                          console.error(error);
                          setStatus("error");
                          showToast({
                            type: "error",
                            title: "No se pudo enviar",
                            desc: "Intenta de nuevo en unos segundos.",
                          });
                          window.setTimeout(() => setStatus("idle"), 1200);
                        }
                      );
                  }}
                >
                  <input
                    name="name"
                    required
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm sm:text-base text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                  />

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Tu correo"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm sm:text-base text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                  />

                  {/* Textarea + límite + contador */}
                  <div className="space-y-2">
                    <textarea
                      name="message"
                      required
                      value={message}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v.length <= MAX_MESSAGE_CHARS) setMessage(v);
                        else setMessage(v.slice(0, MAX_MESSAGE_CHARS));
                      }}
                      maxLength={MAX_MESSAGE_CHARS}
                      rows={4}
                      placeholder="Cuéntame qué necesitas..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm sm:text-base text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
                    />

                    <div className="flex items-center justify-between text-xs text-white/55">
                      <span>Máx. {MAX_MESSAGE_CHARS} caracteres</span>
                      <span>{remaining} restantes</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:brightness-110 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {status === "sending" ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Enviando...
                      </span>
                    ) : (
                      "Enviar"
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="relative bg-black py-6 text-center text-sm text-cyan-300/80">
          © 2026 Rodrigo Cotrina Temple - Todos los derechos reservados.
        </footer>

        {/* TOAST UI (PORTAL) */}
        {mounted
          ? createPortal(
              <div
                className={`pointer-events-none fixed top-24 left-1/2 z-40 w-[92%] max-w-md -translate-x-1/2 transition-all duration-300 ${
                  toast.open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
                }`}
              >
                <div className="pointer-events-auto overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-2xl shadow-black/40 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 ${toastTone}`}
                    >
                      {toast.type === "success" ? <CheckAnim className="h-7 w-7" /> : null}
                      {toast.type === "error" ? <XAnim className="h-7 w-7" /> : null}
                      {toast.type === "info" ? (
                        <span className="text-lg font-black" style={{ color: ACCENT }}>
                          i
                        </span>
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">{toast.title}</p>
                      {toast.desc ? <p className="mt-1 text-sm text-white/70">{toast.desc}</p> : null}
                    </div>

                    <button
                      type="button"
                      onClick={() => setToast((t) => ({ ...t, open: false }))}
                      className="rounded-lg px-2 py-1 text-white/60 transition hover:text-white"
                      aria-label="Cerrar"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="toast-bar h-full w-full" style={{ backgroundColor: ACCENT }} />
                  </div>
                </div>
              </div>,
              document.body
            )
          : null}

        {/* Animaciones del toast (CSS) */}
        <style jsx global>{`
          .toast-bar {
            transform-origin: left;
            animation: toastBar 2.6s linear forwards;
          }
          @keyframes toastBar {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(0);
            }
          }

          .toast-circle {
            stroke-dasharray: 160;
            stroke-dashoffset: 160;
            animation: drawCircle 420ms ease-out forwards;
          }
          @keyframes drawCircle {
            to {
              stroke-dashoffset: 0;
            }
          }

          .toast-check {
            stroke-dasharray: 60;
            stroke-dashoffset: 60;
            animation: drawCheck 380ms ease-out 180ms forwards;
          }
          @keyframes drawCheck {
            to {
              stroke-dashoffset: 0;
            }
          }

          .toast-x {
            stroke-dasharray: 80;
            stroke-dashoffset: 80;
            animation: drawX 380ms ease-out 180ms forwards;
          }
          @keyframes drawX {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </section>
    </PageTransition>
  );
}

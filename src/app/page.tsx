import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";


export default function Home() {
  return (
    <PageTransition>

      {/* HERO FULLSCREEN */}
      <section className="relative min-h-screen pt-28 sm:pt-32 lg:pt-40">
        {/* Fondo */}
        <Image
          src="/fondo.jpg"
          alt="Fondo"
          fill
          priority
          className="object-cover opacity-35"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Contenido principal */}
        <div className="relative mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-10 md:justify-items-center lg:min-h-[520px] lg:grid-cols-[90px_1fr_420px] lg:items-center lg:justify-items-stretch">
            {/* ICONOS izquierda */}
            <div className="hidden lg:flex flex-col items-center gap-8 pt-4 text-white/75">
              <a
                href="https://github.com/RodrigoCT19"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="GitHub"
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.477 2 2 6.56 2 12.184c0 4.5 2.865 8.318 6.839 9.665.5.095.682-.222.682-.494 0-.244-.009-.89-.014-1.747-2.782.62-3.369-1.37-3.369-1.37-.455-1.176-1.11-1.49-1.11-1.49-.908-.64.069-.628.069-.628 1.004.072 1.533 1.056 1.533 1.056.892 1.56 2.341 1.11 2.91.848.091-.664.35-1.11.636-1.365-2.22-.26-4.555-1.14-4.555-5.072 0-1.12.39-2.035 1.029-2.752-.103-.26-.446-1.308.098-2.727 0 0 .84-.275 2.75 1.05A9.3 9.3 0 0 1 12 6.9c.85.004 1.705.118 2.504.347 1.909-1.325 2.748-1.05 2.748-1.05.546 1.419.203 2.467.1 2.727.64.717 1.028 1.632 1.028 2.752 0 3.942-2.339 4.809-4.566 5.064.359.316.679.94.679 1.894 0 1.366-.012 2.468-.012 2.804 0 .275.18.595.688.494C19.138 20.498 22 16.68 22 12.184 22 6.56 17.523 2 12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/rodrigo-cotrinat/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="LinkedIn"
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.94 6.5A2.44 2.44 0 1 1 6.94 1.62a2.44 2.44 0 0 1 0 4.88ZM2.5 22h4.9V8.2H2.5V22ZM9.2 8.2H14v1.9h.07c.67-1.27 2.3-2.6 4.74-2.6 5.07 0 6 3.34 6 7.68V22h-4.9v-5.7c0-1.36-.03-3.11-1.9-3.11-1.9 0-2.19 1.48-2.19 3.01V22H9.2V8.2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rcotrinate@gmail.com&su=Contacto%20-%20Portafolio%20RCT&body=Hola%20Rodrigo%2C"
                className="hover:text-white transition"
                aria-label="Correo"
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://wa.me/51932142423?text=Hola%20Rodrigo%2C%20"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="WhatsApp"
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.46 0 .07 5.39.07 12c0 2.12.55 4.2 1.6 6.03L0 24l6.15-1.61A11.9 11.9 0 0 0 12.07 24C18.68 24 24.07 18.61 24.07 12c0-3.2-1.25-6.2-3.55-8.52Z"
                    fill="currentColor"
                    opacity="0.18"
                  />
                  <path
                    d="M12.07 22c-1.98 0-3.92-.52-5.63-1.5l-.4-.23-3.65.96.97-3.55-.24-.41A9.9 9.9 0 0 1 2.07 12c0-5.52 4.49-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22.07 12c0 5.51-4.49 10-10 10Zm5.79-7.38c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.6-1.92-1.79-2.24-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.22-.32.33-.53.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.02-2.44-.27-.65-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.41-.3.32-1.15 1.12-1.15 2.74 0 1.61 1.18 3.17 1.34 3.39.16.22 2.32 3.55 5.62 4.98.79.34 1.41.54 1.89.69.79.25 1.51.21 2.08.13.63-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.13-.3-.21-.62-.37Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

            </div>

            {/* TEXTO izquierda */}
            <div className="text-center md:text-center lg:text-left lg:pr-8">
              <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                Rodrigo <br></br> Cotrina Temple
              </h1>

              <p className="mt-3 text-lg font-semibold sm:text-xl" style={{ color: "#2D8497" }}>
                Web Developer
              </p>

              <p className="mt-5 max-w-xl text-white/75">
                Estudiante de Ingeniería de Sistemas con interés en desarrollo web, redes
                y soluciones tecnológicas. Experiencia en soporte y mejoras de plataforma web
                corportativa, con enfoque en UX, procesos internos y aprendizaje continuo.
              </p>

              <div className="mt-7 flex justify-center lg:justify-start">
                <a
                  href="/cv-rodrigo.pdf"
                  download
                  className="inline-flex items-center rounded-lg px-7 py-2.5 font-semibold text-white shadow-lg shadow-black/30 transition hover:brightness-110 active:translate-y-[1px]"
                  style={{ backgroundColor: "#2D8497" }}
                >
                  Descargar CV
                </a>
              </div>
            </div>

            {/* FOTO derecha */}
            <div className="mx-auto w-full max-w-[360px] lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5 shadow-2xl ring-1 ring-white/10
                lg:h-[clamp(380px,30vw,460px)] lg:w-[clamp(320px,24vw,380px)] lg:aspect-auto">
                <Image src="/Foto.png" alt="Foto de Rodrigo" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="bg-zinc-200 text-zinc-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            
            {/* TEXTO: primero en móvil, segundo en md+ */}
            <div className="order-1 md:order-2">
              <Reveal>
                <div className="text-center md:text-center lg:text-left">
                  <h2 className="text-3xl font-bold">Sobre Mi</h2>

                  <div className="mt-3 h-px w-40 mx-auto bg-zinc-500/40 lg:mx-0 lg:w-full" />

                  <div
                    className="mt-6 mx-auto max-w-[38ch] md:max-w-[42ch] lg:mx-0 lg:max-w-none
                    text-sm md:text-[20px] leading-relaxed text-zinc-700
                    text-center lg:text-justify space-y-3"
                  >
                    <p>
                      Soy estudiante de Ingeniería de Sistemas de 23 años, cursando el último ciclo de la carrera, 
                      con interés en el desarrollo web y en la creación de soluciones tecnológicas que aporten 
                      valor real.
                    </p>

                    <p>
                      Me caracterizo por ser una persona empática, responsable y respetuosa, con fortalezas como
                      el compañerismo, la creatividad y la capacidad de adaptarme con facilidad a nuevos entornos
                      y retos.
                    </p>

                    <p>
                      En mi tiempo libre disfruto ver películas o series, salir a pasear y compartir momentos con
                      amigos, actividades que equilibran mi desarrollo personal y profesional.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* IMAGEN: segunda en móvil, primera en md+ */}
            <div className="order-2 md:order-1">
              <Reveal>
                <div className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-zinc-300">
                  <Image src="/sobre-mi.jpg" alt="Sobre mí" fill className="object-cover" />
                </div>
              </Reveal>
            </div>

          </div>
        </div>

        <div className="bg-black py-6 text-center text-sm text-cyan-300/80">
          © 2026 Rodrigo Cotrina Temple - Todos los derechos reservados.
        </div>
      </section>

    </PageTransition>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";

type PortfolioSlide = {
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  siteUrl: string;
};

const ACCENT = "#e4283c";
const SLIDE_DURATION = 6000;

const slides: PortfolioSlide[] = [
  {
    title: "Instituto Saúde",
    subtitle: "Intervenção comportamental ABA",
    description:
      "Site institucional para uma clínica especializada em Intervenção Comportamental ABA (Análise do Comportamento Aplicada), para crianças.",
    imageUrl: "/assets/projeto1-novo.png",
    siteUrl: "https://instituto-abc-navy.vercel.app/",
  },
  {
    title: "CM Life",
    subtitle: "Clínica médica multiespecialidade",
    description:
      "Site institucional para uma clínica médica multiespecialidade, com atendimento em ortopedia, pediatria, geriatria, psicologia e fisioterapia, localizada no Rio de Janeiro.",
    imageUrl: "/assets/projeto2.png",
    siteUrl: "https://clinica-medica-projeto.vercel.app/",
  },
  {
    title: "Encanto das Flores",
    subtitle: "E-commerce de floricultura",
    description:
      "E-commerce de floricultura em Porto Alegre, ativo desde 2020, com catálogo de 19 produtos divididos em Flores, Plantas, Vasos e Buquês.",
    imageUrl: "/assets/projeto3.png",
    siteUrl: "https://encanto-das-flores.vercel.app/",
  },
];

export default function ElegantCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  const goTo = useCallback((next: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex(next);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    setIndex((current) => {
      setDirection(1);
      setProgress(0);
      return (current + 1) % slides.length;
    });
  }, []);

  const goPrev = useCallback(() => {
    setIndex((current) => {
      setDirection(-1);
      setProgress(0);
      return (current - 1 + slides.length) % slides.length;
    });
  }, []);

  useEffect(() => {
    if (paused) return;

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (SLIDE_DURATION / 50), 100));
    }, 50);
    const slideTimer = setInterval(goNext, SLIDE_DURATION);

    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [index, paused, goNext]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const slide = slides[index];

  return (
    <div
      className="relative w-full text-left text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid min-h-0 grid-cols-1 items-center gap-2 md:min-h-[380px] md:grid-cols-2 md:gap-16">
        {/* Imagem */}
        <div className="relative order-1 mx-auto w-full max-w-[520px] md:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              {/* Barra de janela do navegador */}
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>

              <div className="relative aspect-[16/10]">
                {slide.imageUrl ? (
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="h-full w-full object-cover object-left-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-7xl font-bold text-white/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}22 0%, transparent 55%)` }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <span
            className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 rounded-tl-lg border-l-2 border-t-2"
            style={{ borderColor: ACCENT }}
          />
          <span
            className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 rounded-br-lg border-b-2 border-r-2"
            style={{ borderColor: ACCENT }}
          />
        </div>

        {/* Texto */}
        <div className="order-2 md:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="!mb-1 text-xs font-semibold tracking-widest text-white/50 md:!mb-7">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
              <h3 className="!mb-1 text-2xl font-bold text-white md:!mb-5 md:text-4xl">{slide.title}</h3>
              <p
                className="!mb-2 text-sm font-semibold uppercase tracking-wide md:!mb-8"
                style={{ color: ACCENT }}
              >
                {slide.subtitle}
              </p>
              <p className="!mb-3 max-w-md leading-relaxed text-white/70 md:!mb-12">{slide.description}</p>

              <a
                href={slide.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--light transition-opacity hover:opacity-80"
              >
                Visitar site
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navegação / progresso */}
      <div className="!mt-2 flex gap-2 md:!mt-10">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className="group flex-1 text-left"
            aria-label={`Ir para ${s.title}`}
          >
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: i === index ? `${progress}%` : i < index ? "100%" : "0%",
                  backgroundColor: ACCENT,
                  transition: i === index ? "none" : "width 0.3s ease",
                }}
              />
            </div>
            <span className="!mt-2 hidden text-xs text-white/40 transition group-hover:text-white/70 sm:block">
              {s.title}
            </span>
          </button>
        ))}
      </div>

      {/* Setas */}
      <div className="!mt-1 flex justify-center gap-3 md:!mt-6">
        <button
          onClick={goPrev}
          aria-label="Slide anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#e4283c] hover:text-[#e4283c]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          aria-label="Próximo slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#e4283c] hover:text-[#e4283c]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

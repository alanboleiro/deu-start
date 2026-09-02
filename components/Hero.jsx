"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import WordReveal from "./fx/WordReveal";
import Magnetic from "./fx/Magnetic";
import PortfolioModal from "./PortfolioModal";

const SHOTS = [
  { src: "/assets/projeto1-novo.png", label: "Instituto Saúde" },
  { src: "/assets/projeto2.png", label: "CM Life" },
  { src: "/assets/projeto3.png", label: "Encanto das Flores" },
];

export default function Hero() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [shot, setShot] = useState(0);

  const { scrollY } = useScroll();
  const previewY = useTransform(scrollY, [0, 600], [0, -60]);
  const previewRotate = useTransform(scrollY, [0, 600], [0, -2]);

  useEffect(() => {
    const id = setInterval(() => setShot((s) => (s + 1) % SHOTS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <div className="container hero__inner">
        <motion.p
          className="eyebrow hero__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Tecnologia e marketing digital
        </motion.p>

        <WordReveal
          as="h1"
          className="display"
          stagger={0.07}
          parts={[
            { text: "Seu negócio precisa estar sempre um passo à" },
            { text: "frente.", accent: true },
          ]}
        />

        <motion.p
          className="lead hero__lead"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Sites, apps, automação de processos e redes sociais. A DeuStart
          coloca a sua empresa no digital com a estrutura que ela já merecia
          ter, e continua por perto depois que vai pro ar.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic strength={0.35}>
            <a
              href="https://wa.me/5571996584561"
              className="btn btn--accent btn--lg"
              target="_blank"
              rel="noopener"
            >
              Começar um projeto
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <button className="btn btn--ghost btn--lg" onClick={() => setPortfolioOpen(true)}>
              Ver o que já entreguei
            </button>
          </Magnetic>
        </motion.div>

        <motion.div
          className="hero__preview"
          style={{ y: previewY, rotateX: previewRotate }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__preview-bar" aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className="hero__preview-shot">
            {SHOTS.map((s, i) => (
              <motion.div
                key={s.src}
                style={{ position: "absolute", inset: 0 }}
                animate={{ opacity: i === shot ? 1 : 0, scale: i === shot ? 1 : 1.03 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src={s.src} alt={s.label} fill sizes="1000px" priority={i === 0} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>rolar</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <PortfolioModal open={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
    </section>
  );
}

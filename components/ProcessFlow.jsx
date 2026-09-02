"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Entendo o que trava o negócio hoje: site, app, redes ou processo ainda no papel.",
  },
  {
    n: "02",
    title: "Plano",
    text: "Defino o que resolve de verdade, sem empurrar o que você não precisa.",
  },
  {
    n: "03",
    title: "Execução",
    text: "Construo a solução e aplico a identidade que representa a sua marca.",
  },
  {
    n: "04",
    title: "Acompanhamento",
    text: "Ajusto, atualizo e sigo por perto depois que a entrega vai pro ar.",
  },
];

export default function ProcessFlow() {
  const ref = useRef(null);
  const dotsRef = useRef([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });

  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STEPS.length, Math.max(0, Math.ceil(v * STEPS.length))));
  });

  // A linha vai do centro do 1º dot ao centro do último, independente
  // da altura de cada passo.
  const measure = useCallback(() => {
    const el = ref.current;
    const first = dotsRef.current[0];
    const last = dotsRef.current[dotsRef.current.length - 1];
    if (!el || !first || !last) return;
    const base = el.getBoundingClientRect().top;
    const fr = first.getBoundingClientRect();
    const lr = last.getBoundingClientRect();
    const top = fr.top - base + fr.height / 2;
    const bottom = lr.top - base + lr.height / 2;
    el.style.setProperty("--flow-top", `${top}px`);
    el.style.setProperty("--flow-height", `${bottom - top}px`);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div className="flow" ref={ref}>
      <span className="flow__track" aria-hidden="true" />
      <motion.span
        className="flow__fill"
        style={{ scaleY: fillScale }}
        aria-hidden="true"
      />
      {STEPS.map((s, i) => (
        <div key={s.n} className={`flow__step ${i < active ? "is-on" : ""}`}>
          <span className="flow__dot" ref={(el) => (dotsRef.current[i] = el)}>
            {s.n}
          </span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

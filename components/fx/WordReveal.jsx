"use client";

import { motion } from "framer-motion";

// Revela um texto palavra por palavra (máscara + subida). Aceita markup
// simples via `parts`: [{ text, accent }] pra pintar trechos de vermelho.
export default function WordReveal({
  text,
  parts,
  as = "h1",
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
}) {
  const Tag = motion[as] ?? motion.h1;
  const segments = parts ?? [{ text }];

  const words = [];
  segments.forEach((seg, si) => {
    seg.text.split(" ").forEach((w, wi) => {
      words.push({ w, accent: seg.accent, key: `${si}-${wi}` });
    });
  });

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={parts ? parts.map((p) => p.text).join(" ") : text}
    >
      {words.map(({ w, accent, key }) => (
        <span className="rw" key={key} aria-hidden="true">
          <motion.span
            className={accent ? "highlight" : undefined}
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
          </motion.span>
          {" "}
        </span>
      ))}
    </Tag>
  );
}

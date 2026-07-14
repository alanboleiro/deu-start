"use client";

import Reveal from "@/components/Reveal";

export default function ServiceCard({ index, title, children, delay = 0 }) {
  return (
    <Reveal
      as="article"
      className="card"
      delay={delay}
      whileHover={{
        y: -6,
        borderColor: "rgba(228, 40, 60, 0.5)",
        boxShadow: "0 24px 48px -28px rgba(228, 40, 60, 0.55)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      <span className="card__index">{index}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </Reveal>
  );
}

"use client";

import Reveal from "@/components/Reveal";

export default function FeatureCard({ title, children, delay = 0 }) {
  return (
    <Reveal
      as="article"
      className="feature"
      delay={delay}
    >
      <h3>{title}</h3>
      <p>{children}</p>
    </Reveal>
  );
}

"use client";

import { useState } from "react";
import HeroStartAnimation from "./HeroStartAnimation";
import HeroContent from "./HeroContent";
import HeroSilkBackground from "./HeroSilkBackground";

export default function Hero() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <section className="hero">
      {!introDone && <HeroStartAnimation onSettle={() => setIntroDone(true)} />}
      {introDone && <HeroSilkBackground />}
      <HeroContent show={introDone} />
    </section>
  );
}

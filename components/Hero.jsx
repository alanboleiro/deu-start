"use client";

import { useEffect, useState } from "react";
import HeroStartAnimation from "./HeroStartAnimation";
import HeroContent from "./HeroContent";
import HeroSilkBackground from "./HeroSilkBackground";

const INTRO_KEY = "deustart-intro-seen";

export default function Hero() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_KEY) === "1") setIntroDone(true);
  }, []);

  const handleSettle = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntroDone(true);
  };

  return (
    <section className="hero">
      {!introDone && <HeroStartAnimation onSettle={handleSettle} />}
      {introDone && <HeroSilkBackground />}
      <HeroContent show={introDone} />
    </section>
  );
}

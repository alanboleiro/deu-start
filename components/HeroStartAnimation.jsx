"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import VaporizeTextCycle, { Tag } from "./ui/vapour-text-effect";
import VaporizeImageCycle from "./ui/vaporize-image-cycle";

const STAGE = { WORD: "word", SYMBOL: "symbol", DONE: "done" };

const ANIMATION = { vaporizeDuration: 1.8, fadeInDuration: 0.9, waitDuration: 0.5 };
const WORD_TEXTS = ["DEU START"];
const SYMBOL_IMAGES = ["/assets/logo-simbolo-branca.png"];

function getFontFamily(varName, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || fallback;
}

export default function HeroStartAnimation({ onSettle }) {
  const [stage, setStage] = useState(STAGE.WORD);
  const [fontFamily, setFontFamily] = useState(null);
  const [wordFontSize, setWordFontSize] = useState(96);

  useEffect(() => {
    setFontFamily(getFontFamily("--font-orbitron", "sans-serif"));
    setWordFontSize(Math.max(40, Math.min(104, window.innerWidth / 9)));
  }, []);

  const wordFont = useMemo(
    () => ({ fontFamily, fontSize: `${wordFontSize}px`, fontWeight: 800 }),
    [fontFamily, wordFontSize]
  );

  const handleWordCycleComplete = useCallback(() => {
    setStage(STAGE.SYMBOL);
  }, []);

  const handleSymbolCycleComplete = useCallback(() => {
    setStage(STAGE.DONE);
    onSettle?.();
  }, [onSettle]);

  if (stage === STAGE.DONE) return null;

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none pt-[80px] pb-[200px] -translate-y-14 sm:-translate-y-10">
      {stage === STAGE.WORD && fontFamily && (
        <div className="w-[96vw] max-w-[1100px] h-[180px] sm:h-[260px] md:h-[320px]">
          <VaporizeTextCycle
            texts={WORD_TEXTS}
            font={wordFont}
            color="rgb(255, 255, 255)"
            spread={11}
            density={3}
            animation={ANIMATION}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H1}
            onCycleComplete={handleWordCycleComplete}
          />
        </div>
      )}

      {stage === STAGE.SYMBOL && (
        <div className="w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px]">
          <VaporizeImageCycle
            images={SYMBOL_IMAGES}
            spread={11}
            density={3}
            animation={ANIMATION}
            direction="left-to-right"
            onCycleComplete={handleSymbolCycleComplete}
          />
        </div>
      )}
    </div>
  );
}

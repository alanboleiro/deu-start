"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";

// O fundo WebGL só no cliente, sem SSR.
const ReactiveBackground = dynamic(() => import("./ReactiveBackground"), {
  ssr: false,
});

export default function FxLayer() {
  return (
    <>
      <ReactiveBackground />
      <div className="bg-grain" aria-hidden="true" />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
    </>
  );
}

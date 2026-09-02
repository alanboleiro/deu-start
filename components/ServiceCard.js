"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Reveal from "./fx/Reveal";

// Card com spotlight que segue o cursor + tilt 3D sutil.
export default function ServiceCard({ title, children, icon, delay = 0 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(py - 0.5) * -5}deg) rotateY(${(px - 0.5) * 5}deg)`;
  };
  const reset = () => {
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <Reveal as="article" delay={delay}>
      <motion.div
        ref={ref}
        className="svc"
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        <span className="svc__spot" aria-hidden="true" />
        <div className="svc__viz" aria-hidden="true">{icon}</div>
        <div className="svc__body">
          <h3>{title}</h3>
          <p>{children}</p>
        </div>
      </motion.div>
    </Reveal>
  );
}

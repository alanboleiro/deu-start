"use client";

import { motion } from "framer-motion";

// Reveal genérico: sobe, aparece e sai de foco (blur) na entrada.
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 30,
  className,
  ...rest
}) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}

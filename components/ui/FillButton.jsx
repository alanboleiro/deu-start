"use client";

import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const FILL_TRANSITION = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };

function coverRadius(width, height, x, y) {
  return Math.ceil(
    Math.max(
      Math.hypot(x, y),
      Math.hypot(width - x, y),
      Math.hypot(x, height - y),
      Math.hypot(width - x, height - y)
    )
  );
}

export default function FillButton({ href = "#", className = "", children, onClick }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(0);

  const setOriginFromPointer = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setOrigin({ x, y });
    setRadius(coverRadius(rect.width, rect.height, x, y));
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || !hovered) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      setRadius(coverRadius(rect.width, rect.height, origin.x, origin.y));
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [hovered, origin.x, origin.y]);

  const clip = (r) => `circle(${r}px at ${origin.x}px ${origin.y}px)`;

  const Tag = onClick ? motion.button : motion.a;
  const tagProps = onClick ? { type: "button", onClick } : { href };

  return (
    <Tag
      ref={ref}
      className={`btn__fill ${className}`}
      onPointerEnter={(event) => {
        setOriginFromPointer(event);
        setHovered(true);
      }}
      onPointerMove={setOriginFromPointer}
      onPointerLeave={() => setHovered(false)}
      whileTap={{ scale: 0.985 }}
      {...tagProps}
    >
      <motion.span
        aria-hidden
        className="btn__fill-cover"
        initial={false}
        animate={{ clipPath: clip(hovered ? radius : 0) }}
        transition={FILL_TRANSITION}
      />
      <span className="btn__fill-label">{children}</span>
    </Tag>
  );
}

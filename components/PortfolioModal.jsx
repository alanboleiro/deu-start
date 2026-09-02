"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ElegantCarousel from "./ui/elegant-carousel";

export default function PortfolioModal({ open, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto bg-black/98 !px-6 !pb-6 !pt-28 backdrop-blur-xl md:items-center md:!pb-16 md:!pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Fechar portfólio"
              className="absolute right-0 -top-12 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#e4283c] hover:text-[#e4283c]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <p className="!mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#e4283c] md:!mb-2">
              Portfólio
            </p>
            <h2 className="!mb-3 !text-xl font-bold text-white md:!mb-10 md:!text-4xl">
              Sites que já coloquei no ar
            </h2>

            <ElegantCarousel />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

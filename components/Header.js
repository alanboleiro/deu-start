"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import Magnetic from "./fx/Magnetic";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/sobre", label: "Sobre" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleAnchor = (e, href) => {
    setOpen(false);
    if (!href.startsWith("/#") || pathname !== "/") return;
    e.preventDefault();
    const el = document.querySelector(href.slice(1));
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header ref={headerRef} className={`header ${stuck ? "is-stuck" : ""}`}>
      <div className="container header__inner">
        <Logo />

        <nav className="nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className={pathname === link.href ? "is-active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <Magnetic strength={0.4}>
            <a
              href="https://wa.me/5571996584561"
              className="btn btn--accent btn--sm"
              target="_blank"
              rel="noopener"
            >
              Falar com a DeuStart
            </a>
          </Magnetic>

          <button
            className="nav-toggle"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }} />
            <motion.span animate={{ opacity: open ? 0 : 1 }} />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "is-active" : ""}
                onClick={(e) => handleAnchor(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="https://wa.me/5571996584561" onClick={() => setOpen(false)}>
              Falar com a DeuStart
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FillButton from "./ui/FillButton";
import PortfolioModal from "./PortfolioModal";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroContent({ show }) {
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  return (
    <>
      <motion.div
        className="hero__inner"
        variants={container}
        initial="hidden"
        animate={show ? "show" : "hidden"}
      >
        <div className="container">
          <motion.p className="eyebrow" variants={item}>
            Tecnologia e marketing digital
          </motion.p>
          <motion.h1 variants={item}>Você precisa estar sempre um passo à frente.</motion.h1>
          <motion.p className="hero__lead" variants={item}>
            Soluções completas em tecnologia para impulsionar seu negócio no
            mundo digital. Sua presença online é{" "}
            <span className="highlight">indispensável</span> para conquistar
            mais clientes.
          </motion.p>
          <motion.div className="hero__actions" variants={item}>
            <FillButton className="btn btn--light" onClick={() => setPortfolioOpen(true)}>
              Ver Portifólio
            </FillButton>
          </motion.div>
        </div>
      </motion.div>

      <PortfolioModal open={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
    </>
  );
}

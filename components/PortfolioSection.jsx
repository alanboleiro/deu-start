"use client";

import Image from "next/image";
import Reveal from "./fx/Reveal";

const PROJECTS = [
  {
    n: "01",
    title: "Instituto Saúde",
    tag: "Clínica de intervenção comportamental ABA",
    desc: "Site institucional para uma clínica especializada em Análise do Comportamento Aplicada para crianças.",
    img: "/assets/projeto1-novo.png",
    url: "https://instituto-abc-navy.vercel.app/",
  },
  {
    n: "02",
    title: "CM Life",
    tag: "Clínica médica multiespecialidade",
    desc: "Site institucional para uma clínica no Rio de Janeiro com ortopedia, pediatria, geriatria, psicologia e fisioterapia.",
    img: "/assets/projeto2.png",
    url: "https://clinica-medica-projeto.vercel.app/",
  },
  {
    n: "03",
    title: "Encanto das Flores",
    tag: "Loja online de floricultura",
    desc: "Loja online de floricultura em Porto Alegre, ativa desde 2020, com catálogo de flores, plantas, vasos e buquês.",
    img: "/assets/projeto3.png",
    url: "https://encanto-das-flores.vercel.app/",
  },
  {
    n: "04",
    title: "JorgeTI",
    tag: "Manutenção de computadores e notebooks",
    desc: "Site refeito do zero para um técnico de Salvador, com atendimento presencial na cidade e remoto para todo o Brasil.",
    img: "/assets/projeto4.png",
    url: "https://jorgeti.vercel.app/",
  },
];

export default function PortfolioSection() {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Portfólio</p>
          <h2 className="h2">Negócios que já estão no ar</h2>
          <p className="lead">
            Segmentos diferentes, o mesmo cuidado do diagnóstico à entrega.
            Cada um está publicado e funcionando.
          </p>
        </div>

        <div className="pf">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.06}>
              <a className="pf__row" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="pf__num">{p.n}</span>
                <div className="pf__meta">
                  <span>{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="pf__go">
                    Visitar site <span aria-hidden="true">↗</span>
                  </span>
                </div>
                <div className="pf__shot">
                  <Image src={p.img} alt={p.title} fill sizes="(max-width: 960px) 100vw, 460px" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

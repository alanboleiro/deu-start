import Hero from "@/components/Hero";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";
import ServiceCard from "@/components/ServiceCard";
import ProcessFlow from "@/components/ProcessFlow";
import PortfolioSection from "@/components/PortfolioSection";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/fx/Magnetic";

const iconSite = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
  </svg>
);
const iconApp = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="7" y="3" width="10" height="18" rx="2.5" />
    <path d="M10.5 18h3" />
  </svg>
);
const iconAuto = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="18" cy="6" r="2.2" />
    <circle cx="12" cy="18" r="2.2" />
    <path d="M8 7l3 9M16 7l-3 9M8 6h8" />
  </svg>
);
const iconSocial = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 5h13a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
  </svg>
);

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section" id="servicos">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Serviços</p>
            <WordReveal
              as="h2"
              className="h2"
              stagger={0.05}
              parts={[{ text: "O que a DeuStart põe pra" }, { text: "funcionar", accent: true }]}
            />
            <p className="lead">
              Quatro frentes, uma pessoa só do começo ao fim. Você escolhe o
              que o negócio precisa agora e a gente vai construindo.
            </p>
          </div>

          <div className="svc-grid">
            <ServiceCard title="Criação de sites" icon={iconSite} delay={0}>
              Sites rápidos, feitos pra converter visita em cliente, não só pra
              existir no ar.
            </ServiceCard>
            <ServiceCard title="Desenvolvimento de apps" icon={iconApp} delay={0.06}>
              Aplicativos sob medida pra Android e iOS, construídos do jeito
              que o seu processo pede.
            </ServiceCard>
            <ServiceCard title="Automação de processos" icon={iconAuto} delay={0.12}>
              Estoque, CRM, pedidos: tira o controle da cabeça e do papel e bota
              tudo dentro de um sistema.
            </ServiceCard>
            <ServiceCard title="Gestão de redes sociais" icon={iconSocial} delay={0.18}>
              Perfil ativo, com conteúdo consistente e identidade que
              representa o seu negócio de verdade.
            </ServiceCard>
          </div>
        </div>
      </section>

      <PortfolioSection />

      <Marquee />

      <section className="section" id="como-funciona">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Como funciona</p>
            <h2 className="h2">Do diagnóstico à entrega</h2>
            <p className="lead">
              Um processo curto e sem intermediário. Você acompanha cada etapa
              com quem está de fato executando.
            </p>
          </div>
          <ProcessFlow />
        </div>
      </section>

      <section className="section" id="diferenciais">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Por que a DeuStart</p>
            <h2 className="h2">Direto com quem executa</h2>
          </div>
          <div className="edge-grid">
            <Reveal as="article" className="edge" delay={0}>
              <h3>Sem intermediário</h3>
              <p>
                Você fala comigo, quem entende do seu projeto do início ao fim,
                sem repassar briefing pra time nenhum.
              </p>
            </Reveal>
            <Reveal as="article" className="edge" delay={0.08}>
              <h3>Sob medida</h3>
              <p>
                Solução do tamanho real do seu negócio. Nada de pacote
                engessado que sobra ou falta.
              </p>
            </Reveal>
            <Reveal as="article" className="edge" delay={0.16}>
              <h3>Resolve, não só embeleza</h3>
              <p>
                Tecnologia que ataca o problema: mais clientes, menos
                retrabalho. Não só deixar bonito.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cta" id="contato">
        <div className="cta__glow" aria-hidden="true" />
        <div className="container cta__inner">
          <WordReveal
            as="h2"
            className="display"
            stagger={0.06}
            parts={[{ text: "Pronto pra dar o próximo" }, { text: "passo?", accent: true }]}
          />
          <Reveal delay={0.1}>
            <p>
              Me conta o que trava o seu negócio hoje. Numa conversa eu já digo
              o que dá pra resolver.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <Magnetic strength={0.35}>
              <a
                href="https://wa.me/5571996584561"
                className="btn btn--accent btn--lg"
                target="_blank"
                rel="noopener"
              >
                Entrar em contato
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}

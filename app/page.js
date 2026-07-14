import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import FeatureCard from "@/components/FeatureCard";
import StepItem from "@/components/StepItem";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="servicos" id="servicos">
        <div className="container">
          <Reveal as="p" className="section-eyebrow">
            Serviços
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            O que a Deu<span className="highlight">Start</span> resolve
          </Reveal>

          <div className="grid grid--4">
            <ServiceCard index="01" title="Criação de sites" delay={0}>
              Sites profissionais, rápidos e feitos pra converter visita em cliente, não só pra existir no ar.
            </ServiceCard>
            <ServiceCard index="02" title="Desenvolvimento de apps" delay={0.08}>
              Aplicativos sob medida pra Android e iOS, construídos do jeito que o seu processo pede.
            </ServiceCard>
            <ServiceCard index="03" title="Automação de processos" delay={0.16}>
              Estoque, CRM, pedidos: tira o controle da cabeça e do papel, bota tudo dentro de um sistema.
            </ServiceCard>
            <ServiceCard index="04" title="Gerenciamento de redes sociais" delay={0.24}>
              Perfil ativo, com conteúdo consistente e identidade que representa o seu negócio de verdade.
            </ServiceCard>
          </div>
        </div>
      </section>

      <section className="processo" id="como-funciona">
        <div className="container">
          <Reveal as="p" className="section-eyebrow section-eyebrow--light">
            Como funciona
          </Reveal>
          <Reveal as="h2" className="h2--light" delay={0.05}>
            Do diagnóstico à entrega
          </Reveal>

          <ol className="steps">
            <StepItem num="1" title="Diagnóstico" delay={0}>
              Entendo o que trava seu negócio hoje: site, app, redes ou processo manual.
            </StepItem>
            <StepItem num="2" title="Plano" delay={0.08}>
              Defino o que resolve de verdade, sem vender o que você não precisa.
            </StepItem>
            <StepItem num="3" title="Execução" delay={0.16}>
              Construo a solução e aplico a identidade que representa a sua marca.
            </StepItem>
            <StepItem num="4" title="Acompanhamento" delay={0.24}>
              Ajusto, atualizo e sigo por perto depois que a entrega vai pro ar.
            </StepItem>
          </ol>
        </div>
      </section>

      <section className="diferenciais" id="diferenciais">
        <div className="container">
          <Reveal as="p" className="section-eyebrow">
            Por que a DeuStart
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            Direto com quem executa
          </Reveal>

          <div className="grid grid--3">
            <FeatureCard title="Sem intermediário" delay={0}>
              Você fala comigo, quem entende do seu projeto do início ao fim, sem repassar briefing pra time nenhum.
            </FeatureCard>
            <FeatureCard title="Sob medida" delay={0.08}>
              Solução do tamanho real do seu negócio. Nada de pacote engessado que sobra ou falta.
            </FeatureCard>
            <FeatureCard title="Resolve, não só embeleza" delay={0.16}>
              Tecnologia que ataca o problema, mais clientes, menos retrabalho, não só &quot;deixa bonito&quot;.
            </FeatureCard>
          </div>
        </div>
      </section>

      <section className="cta-final" id="contato">
        <Reveal as="div" className="container cta-final__inner">
          <h2>Pronto pra dar o próximo passo?</h2>
          <p>Me conta o que trava o seu negócio hoje. Em uma conversa eu já digo o que dá pra resolver.</p>
          <a href="https://wa.me/5571996584561" className="btn btn--accent btn--lg" target="_blank" rel="noopener">
            Entrar em Contato
          </a>
        </Reveal>
      </section>
    </>
  );
}

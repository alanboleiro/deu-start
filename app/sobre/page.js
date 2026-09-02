import Image from "next/image";
import Reveal from "@/components/fx/Reveal";
import WordReveal from "@/components/fx/WordReveal";
import TiltPhoto from "@/components/TiltPhoto";

export const metadata = {
  title: "Sobre a DeuStart",
  description: "A história por trás da DeuStart e de quem toca ela.",
};

export default function Sobre() {
  return (
    <section className="about">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Sobre</p>
          <WordReveal
            as="h1"
            className="display"
            stagger={0.06}
            parts={[
              { text: "Negócio bom não pode seguir" },
              { text: "invisível.", accent: true },
            ]}
          />
        </div>

        <div className="about__inner">
          <Reveal className="about__photo-wrap">
            <TiltPhoto className="about__photo">
              <Image
                src="/assets/imagem-sobre.jpeg"
                alt="Alan Ribeiro, fundador da DeuStart"
                width={1254}
                height={1254}
                priority
              />
            </TiltPhoto>
          </Reveal>

          <Reveal className="about__text" delay={0.1}>
            <p className="about__quote">
              A DeuStart nasceu de uma inquietação sincera: por que tantos
              negócios excelentes ainda operam digitalmente como se estivessem
              em 2010?
            </p>
            <p>
              Meu nome é Alan Ribeiro. Foi olhando pra empresas boas de
              verdade, que entregam bem, que têm cliente fiel, que fazem o
              trabalho direito, mas que seguem invisíveis no digital, que
              decidi criar a DeuStart.
            </p>
            <p>
              O que me move é simples: mudar esse cenário. Pegar negócio que
              ainda roda no papel e caneta, sem site, sem presença séria nas
              redes, e dar a ele a notoriedade que já merecia ter. Não é sobre
              deixar bonito, é sobre ser visto, ser lembrado e angariar mais
              clientes com uma presença digital que representa o tanto que
              essas empresas já entregam.
            </p>
            <p>
              Cada projeto, do diagnóstico à entrega, é feito com foco total
              nos detalhes porque acredito que é assim que se entende de
              verdade o que trava um negócio, e o que ele precisa pra dar esse
              passo à frente.
            </p>

            <div style={{ marginTop: 40 }}>
              <a
                href="https://wa.me/5571996584561"
                className="btn btn--accent btn--lg"
                target="_blank"
                rel="noopener"
              >
                Falar com a DeuStart
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

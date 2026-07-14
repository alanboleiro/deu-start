import Image from "next/image";
import Reveal from "@/components/Reveal";
import TiltPhoto from "@/components/TiltPhoto";

export const metadata = {
  title: "Sobre - DeuStart",
  description: "A história por trás da DeuStart e de quem toca ela.",
};

export default function Sobre() {
  return (
    <section className="sobre">
      <div className="container sobre__inner">
        <Reveal as="div" className="sobre__foto">
          <TiltPhoto>
            <Image
              src="/assets/img-programador.jpeg"
              alt="Alan Ribeiro, fundador da DeuStart"
              width={760}
              height={950}
              priority
            />
          </TiltPhoto>
        </Reveal>

        <Reveal as="div" className="sobre__texto" delay={0.1}>
          <p className="eyebrow">Sobre</p>
          <p className="sobre__quote">
            A DeuStart nasceu de uma inquietação sincera: por que tantos
            negócios excelentes ainda operam digitalmente como se estivessem
            em 2010?
          </p>

          <p>
            Meu nome é Alan Ribeiro. Foi olhando pra empresas boas de verdade,
            que entregam bem, que têm cliente fiel, que fazem o trabalho
            direito, mas que seguem invisíveis no digital, que decidi criar a
            DeuStart.
          </p>

          <p>
            O que me move é simples: mudar esse cenário. Pegar negócio que
            ainda roda no papel e caneta, sem site, sem presença séria nas
            redes, e dar a ele a notoriedade que já merecia ter. Não é sobre
            deixar bonito, é sobre ser visto, ser lembrado e angariar mais
            clientes com uma presença digital que representa o tanto que essas
            empresas já entregam.
          </p>

          <p>
            Cada projeto, do diagnóstico à entrega, é feito com foco total nos
            detalhes porque acredito que é assim que se entende de verdade o
            que trava um negócio, e o que precisa pra ele dar esse passo à
            frente.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const ITEMS = [
  "Criação de sites",
  "Desenvolvimento de apps",
  "Automação de processos",
  "CRM sob medida",
  "Controle de estoque",
  "Gestão de redes sociais",
  "Google Meu Negócio",
  "Identidade visual",
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span className="marquee__item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}

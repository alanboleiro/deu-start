import Reveal from "@/components/Reveal";

export default function StepItem({ num, title, children, delay = 0 }) {
  return (
    <Reveal as="li" className="step" delay={delay}>
      <span className="step__num">{num}</span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </Reveal>
  );
}

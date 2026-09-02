import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`logo ${className}`}>
      <Image
        src="/assets/simbolo-branco.png"
        alt="DeuStart"
        width={680}
        height={445}
        className="logo__icon"
        priority
      />
      <span className="logo__text">
        Deu<span>Start</span>
      </span>
    </Link>
  );
}

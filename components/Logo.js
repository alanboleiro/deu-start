import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`logo ${className}`}>
      <Image
        src="/assets/logo-simbolo-branca.png"
        alt="DeuStart"
        width={748}
        height={512}
        className="logo__icon"
        priority
      />
      <span className="logo__text">
        Deu<span>Start</span>
      </span>
    </Link>
  );
}

import Image from "next/image";

export default function ProcessHub() {
  return (
    <div className="hub" aria-hidden="true">
      <span className="hub__line hub__line--h" />
      <span className="hub__line hub__line--v" />
      <span className="hub__ring" />
      <span className="hub__ring hub__ring--d1" />
      <span className="hub__ring hub__ring--d2" />
      <span className="hub__core">
        <Image
          src="/assets/simbolo-preto.png"
          alt=""
          width={680}
          height={445}
          className="hub__core-icon"
        />
      </span>
    </div>
  );
}

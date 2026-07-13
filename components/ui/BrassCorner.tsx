type Position = "tl" | "tr" | "bl" | "br";

export default function BrassCorner({ position }: { position: Position }) {
  return <span className={`brass-corner ${position}`} aria-hidden="true" />;
}

export function BrassCorners() {
  return (
    <>
      <BrassCorner position="tl" />
      <BrassCorner position="tr" />
      <BrassCorner position="bl" />
      <BrassCorner position="br" />
    </>
  );
}

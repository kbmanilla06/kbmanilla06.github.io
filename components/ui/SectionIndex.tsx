/**
 * WDL Index role (02b-wdl-foundations.md §Index role, DR-026c): zero-padded
 * numeral marking a section/item. Decorative by default — real order comes
 * from heading level and document order, so it stays aria-hidden unless it
 * is the sole carrier of an identifier not otherwise in the accessible name.
 */
export default function SectionIndex({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`wdl-index ${className}`} aria-hidden="true" role="presentation">
      {String(n).padStart(2, "0")}
    </span>
  );
}

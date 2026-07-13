import Image from "next/image";
import type { Quest } from "@/lib/content/projects";
import BrassCorner from "./BrassCorner";
import GuildButton from "./GuildButton";

export default function QuestCard({ quest }: { quest: Quest }) {
  return (
    <article className="leather-frame relative flex flex-col overflow-hidden">
      <BrassCorner position="tl" />
      <BrassCorner position="tr" />

      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--color-brass-dark)] bg-[var(--color-iron)]">
        <Image
          src={quest.image}
          alt={`${quest.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <span
          className="absolute right-0 top-3 bg-[var(--color-emerald)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-ivory)] shadow-md"
          style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          {quest.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs uppercase tracking-wide text-[var(--color-gold)]">
          {quest.questNumber}
          {quest.rank ? ` — ${quest.rank}` : ""}
        </p>
        <h3 className="text-xl text-[var(--color-ivory)]">{quest.title}</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          {quest.category} · {quest.year}
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">{quest.summary}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {quest.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-[var(--color-brass-dark)] bg-[var(--color-charcoal)] px-2 py-1 text-xs text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3">
          <GuildButton href={quest.repoUrl} external brass>
            View Quest Report
          </GuildButton>
        </div>
      </div>
    </article>
  );
}

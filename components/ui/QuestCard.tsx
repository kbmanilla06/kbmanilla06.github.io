import Image from "next/image";
import type { Quest } from "@/lib/content/projects";
import BrassCorner from "./BrassCorner";
import GuildButton from "./GuildButton";

export default function QuestCard({ quest }: { quest: Quest }) {
  return (
    <article className={`leather-frame quest-card relative flex h-full flex-col overflow-hidden ${quest.featured ? "quest-card-featured" : ""}`}>
      <BrassCorner position="tl" />
      <BrassCorner position="tr" />

      <div className="quest-card-image relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--color-brass-dark)] bg-[var(--color-iron)]">
        <Image
          src={quest.image}
          alt={`${quest.title} preview`}
          fill
          sizes={quest.featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
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

        <dl className="quest-evidence-meta">
          <div className={quest.featured ? "hidden" : undefined}>
            <dt>Context</dt>
            <dd>{quest.context}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{quest.role}</dd>
          </div>
          <div>
            <dt>Collaboration</dt>
            <dd>{quest.collaboration}</dd>
          </div>
        </dl>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
            Engineering evidence
          </p>
          <ul className="quest-evidence-list">
            {quest.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

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

        <div className="mt-auto flex flex-wrap gap-3 pt-3">
          {quest.caseStudyUrl && (
            <GuildButton href={quest.caseStudyUrl} variant="accent" brass>
              Read Case Study
            </GuildButton>
          )}
          <GuildButton href={quest.repoUrl} external brass={!quest.caseStudyUrl}>
            Review Repository
          </GuildButton>
        </div>
      </div>
    </article>
  );
}

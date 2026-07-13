import GuildPanel from "@/components/ui/GuildPanel";
import LeatherFrame from "@/components/ui/LeatherFrame";
import ParchmentSurface from "@/components/ui/ParchmentSurface";
import GuildButton from "@/components/ui/GuildButton";
import WaxSeal from "@/components/ui/WaxSeal";
import EngravedIcon from "@/components/ui/EngravedIcon";
import { SwordIcon } from "@/components/ui/icons";

export default function UiKitPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 space-y-12">
      <h1 className="text-3xl text-[var(--color-gold-bright)]">Guild UI Kit</h1>

      <section className="space-y-4">
        <h2 className="text-xl">Guild Panel</h2>
        <GuildPanel className="max-w-md">
          <p className="text-[var(--color-text-muted)]">
            Carved wood panel with brass corner plates and an inset engraved
            border. Used for guild card sections and content blocks.
          </p>
        </GuildPanel>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl">Leather Frame</h2>
        <LeatherFrame className="max-w-md p-6">
          <p className="text-[var(--color-text-muted)]">
            Leather with visible stitching along the inset border.
          </p>
        </LeatherFrame>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl">Parchment Surface</h2>
        <ParchmentSurface className="max-w-md p-6" rotate>
          <p>Aged parchment with a procedurally generated grain texture.</p>
        </ParchmentSurface>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl">Guild Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <GuildButton icon={<SwordIcon />}>Accept Quest</GuildButton>
          <GuildButton variant="accent" brass icon={<SwordIcon />}>
            Forge Equipment
          </GuildButton>
          <GuildButton variant="ghost">Return</GuildButton>
          <GuildButton disabled>Locked</GuildButton>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl">Wax Seal &amp; Engraved Icon</h2>
        <div className="flex items-center gap-6">
          <WaxSeal />
          <EngravedIcon>
            <SwordIcon />
          </EngravedIcon>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl">Numerals</h2>
        <p className="font-decorative text-5xl text-[var(--color-gold)]">HR 47</p>
      </section>
    </div>
  );
}

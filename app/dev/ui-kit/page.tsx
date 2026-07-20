import { ArrowUpRight, CheckCircle2, Info } from "lucide-react";
import WdlPanel from "@/components/ui/WdlPanel";
import WdlCard from "@/components/ui/WdlCard";
import WdlButton from "@/components/ui/WdlButton";

export default function UiKitPage() {
  return (
    <div className="page-shell">
      <p className="wdl-kicker">WashDish Design Language</p>
      <h1 className="section-title">Interface foundations</h1>
      <p className="section-intro">A development reference for the portfolio’s shared surfaces, actions, fields, and status patterns.</p>

      <section className="ui-kit-section">
        <h2>Layered surfaces</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <WdlPanel><p className="wdl-kicker">Section surface</p><h3>Grouped information</h3><p>Operational boundaries, clear hierarchy, and readable supporting content.</p></WdlPanel>
          <WdlCard className="p-6"><p className="wdl-kicker">Card surface</p><h3>Contained object</h3><p>One purpose per card with consistent spacing and restrained elevation.</p></WdlCard>
        </div>
      </section>

      <section className="ui-kit-section">
        <h2>Actions</h2>
        <div className="flex flex-wrap gap-3">
          <WdlButton variant="accent">Primary action</WdlButton>
          <WdlButton icon={<ArrowUpRight />}>Secondary action</WdlButton>
          <WdlButton variant="ghost">Ghost action</WdlButton>
          <WdlButton disabled>Unavailable</WdlButton>
        </div>
      </section>

      <section className="ui-kit-section">
        <h2>Status</h2>
        <div className="status-examples">
          <p className="form-status status-success"><CheckCircle2 aria-hidden="true" />Operation completed successfully.</p>
          <p className="form-status status-not_configured"><Info aria-hidden="true" />Additional configuration is required.</p>
        </div>
      </section>
    </div>
  );
}

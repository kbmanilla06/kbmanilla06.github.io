import { CodeXml, Network } from "lucide-react";
import DirectionalLink from "@/components/ui/DirectionalLink";

export default function PortfolioFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p>© 2026 Khristopher Ben Manilla. All rights reserved.</p>
        <nav aria-label="Social links">
          <DirectionalLink href="https://github.com/kbmanilla06" external icon={<CodeXml />}>GitHub</DirectionalLink>
          <DirectionalLink href="https://www.linkedin.com/in/khristopher-ben-manilla-b875181b6/" external icon={<Network />}>LinkedIn</DirectionalLink>
        </nav>
      </div>
    </footer>
  );
}

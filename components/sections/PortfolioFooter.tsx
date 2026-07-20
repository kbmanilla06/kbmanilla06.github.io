import { CodeXml, Network } from "lucide-react";

export default function PortfolioFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p>© 2026 Khristopher Ben Manilla. All rights reserved.</p>
        <nav aria-label="Social links">
          <a href="https://github.com/kbmanilla06" target="_blank" rel="noopener noreferrer"><CodeXml aria-hidden="true" /><span>GitHub</span></a>
          <a href="https://www.linkedin.com/in/khristopher-ben-manilla-b875181b6/" target="_blank" rel="noopener noreferrer"><Network aria-hidden="true" /><span>LinkedIn</span></a>
        </nav>
      </div>
    </footer>
  );
}

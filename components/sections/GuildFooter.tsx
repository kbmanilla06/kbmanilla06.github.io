export default function GuildFooter() {
  return (
    <footer className="border-t border-[var(--color-brass-dark)] bg-[var(--color-charcoal)] px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center text-sm text-[var(--color-text-muted)] sm:flex-row sm:justify-between sm:text-left">
        <p>© 2026 Khristopher Ben Manilla · Guild Card No. 2026. All rights reserved.</p>
        <div className="flex gap-5">
          <a
            href="https://github.com/kbmanilla06"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-gold-bright)]"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/khristopher-ben-manilla-b875181b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-gold-bright)]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

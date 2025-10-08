export function LandingFooter() {
  return (
    <footer className="border-t-2 border-border bg-background">
      <div className="container py-8">
        <div className="brutal-card flex flex-col items-center justify-between gap-4 rounded-[var(--radius-base)] px-6 py-6 text-sm text-foreground md:flex-row">
          <div>© 2025 Rest-Money. Tous droits réservés.</div>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <a
              href="#mentions-legales"
              className="transition-transform duration-200 hover:-translate-y-0.5"
            >
              Mentions légales
            </a>
            <a
              href="#confidentialite"
              className="transition-transform duration-200 hover:-translate-y-0.5"
            >
              Confidentialité
            </a>
            <a href="#contact" className="transition-transform duration-200 hover:-translate-y-0.5">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-background/95 backdrop-blur">
      <div className="container py-4">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="text-2xl font-bold tracking-tight">
              Rest-Money
            </a>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#fonctionnalites"
              className="text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Fonctionnalités
            </a>
            <a
              href="#comment-ca-marche"
              className="text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Comment ça marche
            </a>
            <a
              href="#faq"
              className="text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="brutal-button inline-flex items-center justify-center rounded-[var(--radius-base)] px-6 py-3"
            >
              Essayer l'app
            </a>
          </div>
        </nav>
        <div className="mt-4 flex items-center gap-4 overflow-x-auto text-sm font-semibold text-foreground md:hidden">
          <a href="#fonctionnalites" className="whitespace-nowrap">
            Fonctionnalités
          </a>
          <a href="#comment-ca-marche" className="whitespace-nowrap">
            Comment ça marche
          </a>
          <a href="#faq" className="whitespace-nowrap">
            FAQ
          </a>
          <a href="#contact" className="whitespace-nowrap">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

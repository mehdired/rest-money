import { createFileRoute } from '@tanstack/react-router';
import { LandingHeader } from '@/components/landing/header';
import { LandingFooter } from '@/components/landing/footer';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary-background py-20 md:py-28">
          <div className="absolute -left-16 top-16 hidden md:block" aria-hidden="true">
            <div
              className="h-32 w-32 rotate-6 rounded-[var(--radius-base)] border-2 border-border"
              style={{ boxShadow: 'var(--shadow)', background: 'rgba(233, 75, 0, 0.18)' }}
            ></div>
          </div>
          <div className="absolute -right-12 bottom-20 hidden lg:block" aria-hidden="true">
            <div
              className="h-24 w-24 -rotate-6 rounded-[var(--radius-base)] border-2 border-border"
              style={{ boxShadow: 'var(--shadow)', background: 'rgba(233, 75, 0, 0.12)' }}
            ></div>
          </div>
          <div className="container relative">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div>
                <h1 className="text-4xl leading-tight font-[weight:var(--font-weight-heading)] md:text-6xl">
                  Tes impôts, ta TVA et tes cotisations réunis dans un tableau brutalement clair.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
                  Rest-Money centralise tes revenus, calcule TVA, URSSAF et impôt sur le revenu en
                  temps réel et t'indique ce qu'il te reste vraiment.
                </p>
                <div className="mt-10">
                  <a
                    href="/login"
                    className="brutal-button inline-flex items-center justify-center rounded-[var(--radius-base)] px-8 py-4 text-lg"
                  >
                    Essayer l'app
                  </a>
                </div>
              </div>
              <div className="relative">
                <div
                  className="rounded-[var(--radius-base)] border-2 border-border bg-background p-6 md:p-8"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-wide text-foreground/70">
                        Dashboard Rest-Money
                      </p>
                      <h2 className="mt-1 text-2xl font-[weight:var(--font-weight-heading)]">
                        Vue d'ensemble
                      </h2>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div
                      className="rounded-[var(--radius-base)] border-2 border-border p-4"
                      style={{
                        boxShadow: 'var(--shadow)',
                        background: 'var(--secondary-background)',
                      }}
                    >
                      <p className="text-sm uppercase tracking-wide text-foreground/70">
                        Chiffre d'affaires
                      </p>
                      <p className="text-xl font-[weight:var(--font-weight-heading)]">
                        7 840 €
                      </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div
                        className="rounded-[var(--radius-base)] border-2 border-border p-4"
                        style={{ boxShadow: 'var(--shadow)', background: 'var(--background)' }}
                      >
                        <p className="text-sm uppercase tracking-wide text-foreground/70">
                          TVA à reverser
                        </p>
                        <p className="mt-2 text-lg font-[weight:var(--font-weight-heading)]">
                          1 568 €
                        </p>
                      </div>
                      <div
                        className="rounded-[var(--radius-base)] border-2 border-border p-4"
                        style={{ boxShadow: 'var(--shadow)', background: 'var(--background)' }}
                      >
                        <p className="text-sm uppercase tracking-wide text-foreground/70">
                          URSSAF estimée
                        </p>
                        <p className="mt-2 text-lg font-[weight:var(--font-weight-heading)]">
                          1 092 €
                        </p>
                      </div>
                    </div>
                    <div
                      className="rounded-[var(--radius-base)] border-2 border-border p-4"
                      style={{ boxShadow: 'var(--shadow)', background: 'var(--background)' }}
                    >
                      <p className="text-sm uppercase tracking-wide text-foreground/70">
                        Net estimé
                      </p>
                      <p className="text-xl font-[weight:var(--font-weight-heading)]">
                        4 180 €
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="container py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-[weight:var(--font-weight-heading)] tracking-tight md:text-4xl">
              Une vision cash de ce qui sort et de ce qui reste.
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Des cartes néobrutalistes, lisibles, pour réconcilier tes factures, tes charges et ta
              trésorerie en quelques minutes.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="brutal-card h-full rounded-[var(--radius-base)] p-6">
              <div className="mb-4 text-4xl">📊</div>
              <h3 className="mb-3 text-xl font-[weight:var(--font-weight-heading)]">
                Suivi des revenus
              </h3>
              <p className="text-foreground/80">
                Enregistre tes factures et visualise ton chiffre d'affaires dans un tableau clair.
              </p>
            </div>
            <div className="brutal-card h-full rounded-[var(--radius-base)] p-6">
              <div className="mb-4 text-4xl">💰</div>
              <h3 className="mb-3 text-xl font-[weight:var(--font-weight-heading)]">
                TVA calculée
              </h3>
              <p className="text-foreground/80">
                Calcule automatiquement la TVA à reverser selon le montant de tes revenus.
              </p>
            </div>
            <div className="brutal-card h-full rounded-[var(--radius-base)] p-6">
              <div className="mb-4 text-4xl">🧮</div>
              <h3 className="mb-3 text-xl font-[weight:var(--font-weight-heading)]">
                Cotisations URSSAF
              </h3>
              <p className="text-foreground/80">
                Estime tes cotisations sociales basées sur ton chiffre d'affaires.
              </p>
            </div>
            <div className="brutal-card h-full rounded-[var(--radius-base)] p-6">
              <div className="mb-4 text-4xl">📈</div>
              <h3 className="mb-3 text-xl font-[weight:var(--font-weight-heading)]">
                Impôt sur le revenu
              </h3>
              <p className="text-foreground/80">
                Applique l'abattement de 34% et les tranches d'imposition pour estimer ton impôt.
              </p>
            </div>
          </div>
        </section>

        {/* Features Detail */}
        <section id="fonctionnalites" className="bg-secondary-background py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-[weight:var(--font-weight-heading)] tracking-tight md:text-4xl">
                Les fonctionnalités
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Chaque élément de l'interface restitue les informations essentielles pour suivre ta trésorerie.
              </p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div className="flex flex-col gap-6">
                <div className="brutal-card rounded-[var(--radius-base)] p-6">
                  <h3 className="text-2xl font-[weight:var(--font-weight-heading)]">
                    Vue consolidée
                  </h3>
                  <p className="mt-3 text-foreground/80">
                    Rassemble tes montants encaissés, à reverser et le cash disponible dans une
                    interface unique. Plus besoin de jongler entre plusieurs fichiers.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Graphiques bruts et contrastés
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Répartition visuelle des charges
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Focus direct sur le cash disponible
                    </li>
                  </ul>
                </div>
                <div className="brutal-card rounded-[var(--radius-base)] p-6">
                  <h3 className="text-2xl font-[weight:var(--font-weight-heading)]">
                    Paramètres personnalisables
                  </h3>
                  <p className="mt-3 text-foreground/80">
                    Configure tes taux de TVA, URSSAF et impôts pour adapter les calculs à ta situation.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Taux de TVA ajustables
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Taux URSSAF personnalisés
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Abattement fiscal configurable
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div
                  className="rounded-[var(--radius-base)] border-2 border-border bg-background p-6"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border font-bold"
                      style={{ boxShadow: 'var(--shadow)' }}
                    >
                      1
                    </span>
                    <h4 className="text-lg font-[weight:var(--font-weight-heading)]">
                      Tableau des revenus
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Ajoute montant, date et client. Tri et recherche pour retrouver facilement tes revenus.
                  </p>
                </div>
                <div
                  className="rounded-[var(--radius-base)] border-2 border-border bg-background p-6"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border font-bold"
                      style={{ boxShadow: 'var(--shadow)' }}
                    >
                      2
                    </span>
                    <h4 className="text-lg font-[weight:var(--font-weight-heading)]">
                      Calculs automatiques
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/70">
                    TVA, URSSAF et impôts calculés instantanément à chaque ajout de revenu.
                  </p>
                </div>
                <div
                  className="rounded-[var(--radius-base)] border-2 border-border bg-background p-6"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border font-bold"
                      style={{ boxShadow: 'var(--shadow)' }}
                    >
                      3
                    </span>
                    <h4 className="text-lg font-[weight:var(--font-weight-heading)]">
                      Dashboard visuel
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Graphique circulaire pour visualiser la répartition entre net, URSSAF et impôts.
                  </p>
                </div>
                <div
                  className="rounded-[var(--radius-base)] border-2 border-border bg-background p-6"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border font-bold"
                      style={{ boxShadow: 'var(--shadow)' }}
                    >
                      4
                    </span>
                    <h4 className="text-lg font-[weight:var(--font-weight-heading)]">
                      Historique complet
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Consulte tous tes revenus passés avec le détail des calculs ligne par ligne.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="container py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="brutal-card rounded-[var(--radius-base)] p-6">
              <h3 className="text-2xl font-[weight:var(--font-weight-heading)]">
                Ce que tu suis en temps réel
              </h3>
              <p className="mt-3 text-foreground/80">
                Rest-Money calcule instantanément tes charges fiscales à chaque ajout de revenu.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/70">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>Montant de TVA à reverser selon tes revenus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>
                    Cotisations URSSAF calculées sur ton chiffre d'affaires
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>
                    Impôt sur le revenu avec abattement de 34% et tranches progressives
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>Cash net disponible après déduction de toutes les charges</span>
                </li>
              </ul>
            </div>
            <div className="brutal-card rounded-[var(--radius-base)] p-6">
              <h3 className="text-2xl font-[weight:var(--font-weight-heading)]">
                Interface brutalement simple
              </h3>
              <p className="mt-3 text-foreground/80">
                Pas de fioritures, juste les informations essentielles pour gérer ta trésorerie.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/70">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>Dashboard avec graphique de répartition des charges</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>Tableau de revenus avec recherche et tri</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>Configuration des taux fiscaux personnalisés</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>Détail ligne par ligne de chaque calcul</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="comment-ca-marche" className="bg-secondary-background py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-[weight:var(--font-weight-heading)] tracking-tight md:text-4xl">
                Comment ça marche
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                3 étapes simples
              </p>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              <li className="brutal-card relative rounded-[var(--radius-base)] p-6">
                <span
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border text-lg font-[weight:var(--font-weight-heading)]"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  1
                </span>
                <h3 className="text-xl font-[weight:var(--font-weight-heading)]">
                  Ajoute tes revenus
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Saisis le montant, la date et le client pour chaque revenu.
                </p>
              </li>
              <li className="brutal-card relative rounded-[var(--radius-base)] p-6">
                <span
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border text-lg font-[weight:var(--font-weight-heading)]"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  2
                </span>
                <h3 className="text-xl font-[weight:var(--font-weight-heading)]">
                  Rest-Money calcule
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  TVA, URSSAF et impôts sont calculés instantanément.
                </p>
              </li>
              <li className="brutal-card relative rounded-[var(--radius-base)] p-6">
                <span
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border text-lg font-[weight:var(--font-weight-heading)]"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  3
                </span>
                <h3 className="text-xl font-[weight:var(--font-weight-heading)]">
                  Consulte ton net
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Visualise ton cash disponible après déduction de toutes les charges.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-[weight:var(--font-weight-heading)] tracking-tight md:text-4xl">
              Questions fréquentes
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            <details
              className="rounded-[var(--radius-base)] border-2 border-border bg-background px-6 py-4"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <summary className="cursor-pointer text-lg font-[weight:var(--font-weight-heading)]">
                Rest-Money remplace-t-il mon comptable&nbsp;?
              </summary>
              <p className="mt-3 text-sm text-foreground/70">
                Non. Rest-Money te donne une vision fiable et rapide pour provisionner. Pour la
                déclaration officielle, un expert-comptable reste indispensable.
              </p>
            </details>
            <details
              className="rounded-[var(--radius-base)] border-2 border-border bg-background px-6 py-4"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <summary className="cursor-pointer text-lg font-[weight:var(--font-weight-heading)]">
                Puis-je configurer les taux de calcul&nbsp;?
              </summary>
              <p className="mt-3 text-sm text-foreground/70">
                Oui. Tu peux personnaliser les taux de TVA, URSSAF et l'abattement fiscal dans la page Paramètres pour adapter les calculs à ta situation.
              </p>
            </details>
            <details
              className="rounded-[var(--radius-base)] border-2 border-border bg-background px-6 py-4"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <summary className="cursor-pointer text-lg font-[weight:var(--font-weight-heading)]">
                Comment sont gérées mes données&nbsp;?
              </summary>
              <p className="mt-3 text-sm text-foreground/70">
                Tes données sont stockées en Europe, chiffrées au repos et jamais revendues. Tu
                restes propriétaire et peux les supprimer à tout moment.
              </p>
            </details>
          </div>
        </section>

      </main>

      <LandingFooter />
    </div>
  );
}

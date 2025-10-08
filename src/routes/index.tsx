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
                <div className="brutal-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em]">
                  <span className="inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>Beta privée</span>
                </div>
                <h1 className="mt-8 text-4xl leading-tight font-[weight:var(--font-weight-heading)] md:text-6xl">
                  Tes impôts, ta TVA et tes cotisations réunis dans un tableau brutalement clair.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
                  Rest-Money centralise tes revenus, calcule TVA, URSSAF et impôt sur le revenu en
                  temps réel et t'indique ce qu'il te reste vraiment.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="/login"
                    className="brutal-button inline-flex items-center justify-center rounded-[var(--radius-base)] px-8 py-4 text-lg"
                  >
                    Essayer l'app
                  </a>
                  <a
                    href="#comment-ca-marche"
                    className="inline-flex items-center gap-2 rounded-[var(--radius-base)] border-2 border-border bg-background px-6 py-3 font-semibold text-foreground transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
                    style={{ boxShadow: 'var(--shadow)' }}
                  >
                    <span>Voir comment ça marche</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div className="brutal-card rounded-[var(--radius-base)] p-6">
                    <p className="text-sm uppercase tracking-wide text-foreground/70">
                      Freelances suivis
                    </p>
                    <p className="mt-2 text-3xl font-[weight:var(--font-weight-heading)]">+380</p>
                    <p className="mt-3 text-sm text-foreground/70">
                      Indépendants & studios qui visualisent leurs échéances fiscales sans Excel.
                    </p>
                  </div>
                  <div className="brutal-card rounded-[var(--radius-base)] p-6">
                    <p className="text-sm uppercase tracking-wide text-foreground/70">
                      Temps gagné
                    </p>
                    <p className="mt-2 text-3xl font-[weight:var(--font-weight-heading)]">
                      -6 h/mois
                    </p>
                    <p className="mt-3 text-sm text-foreground/70">
                      Une estimation fiable des montants à provisionner en quelques minutes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 right-8 hidden md:block" aria-hidden="true">
                  <div
                    className="rounded-full border-2 border-border px-4 py-2 text-sm font-semibold"
                    style={{ boxShadow: 'var(--shadow)', background: 'var(--background)' }}
                  >
                    +12 nouveaux revenus ce mois-ci
                  </div>
                </div>
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
                        Vue mois en cours
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-border font-bold"
                        style={{ boxShadow: 'var(--shadow)' }}
                      >
                        €
                      </span>
                      <span className="text-sm text-foreground/70">Mode calcul actif</span>
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
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-wide text-foreground/70">
                            Revenus encaissés
                          </p>
                          <p className="text-xl font-[weight:var(--font-weight-heading)]">
                            7 840 €
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-success">+12%</span>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-border">
                        <div className="h-full w-3/4 rounded-full bg-main"></div>
                      </div>
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
                        <p className="text-sm text-foreground/70">
                          Prochain prélèvement le 25/05.
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
                        <p className="text-sm text-foreground/70">
                          Provision à garder sur ton compte pro.
                        </p>
                      </div>
                    </div>
                    <div
                      className="rounded-[var(--radius-base)] border-2 border-border p-4"
                      style={{ boxShadow: 'var(--shadow)', background: 'var(--background)' }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-wide text-foreground/70">
                            Reste à toi
                          </p>
                          <p className="text-xl font-[weight:var(--font-weight-heading)]">
                            4 180 €
                          </p>
                        </div>
                        <span
                          className="inline-flex items-center gap-2 rounded-full border-2 border-border px-3 py-1 text-xs font-semibold"
                          style={{
                            boxShadow: 'var(--shadow)',
                            background: 'var(--secondary-background)',
                          }}
                        >
                          <span aria-hidden="true">✔</span>
                          <span>Objectif atteint</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="container py-12">
          <div className="brutal-card flex flex-wrap items-center justify-between gap-6 rounded-[var(--radius-base)] px-6 py-5">
            <div className="text-sm uppercase tracking-wide text-foreground/70">
              Déjà utilisé par
            </div>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-lg font-[weight:var(--font-weight-heading)] text-foreground/80">
              <span>Freelances tech</span>
              <span>Indés du design</span>
              <span>Studios créa</span>
              <span>Consultants</span>
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
                Historise tes factures, catégorise-les et visualise les tendances par période.
              </p>
            </div>
            <div className="brutal-card h-full rounded-[var(--radius-base)] p-6">
              <div className="mb-4 text-4xl">💰</div>
              <h3 className="mb-3 text-xl font-[weight:var(--font-weight-heading)]">
                TVA pilotée
              </h3>
              <p className="text-foreground/80">
                Calcule automatiquement la TVA à collecter selon tes taux et garde le contrôle sur
                tes versements.
              </p>
            </div>
            <div className="brutal-card h-full rounded-[var(--radius-base)] p-6">
              <div className="mb-4 text-4xl">🧮</div>
              <h3 className="mb-3 text-xl font-[weight:var(--font-weight-heading)]">
                Cotisations URSSAF
              </h3>
              <p className="text-foreground/80">
                Anticipe tes appels grâce à des projections dynamiques basées sur tes
                encaissements.
              </p>
            </div>
            <div className="brutal-card h-full rounded-[var(--radius-base)] p-6">
              <div className="mb-4 text-4xl">📈</div>
              <h3 className="mb-3 text-xl font-[weight:var(--font-weight-heading)]">
                Impôt sur le revenu
              </h3>
              <p className="text-foreground/80">
                Applique l'abattement de 34% et visualise tranche par tranche ce que tu dois
                déclarer.
              </p>
            </div>
          </div>
        </section>

        {/* Features Detail */}
        <section id="fonctionnalites" className="bg-secondary-background py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-[weight:var(--font-weight-heading)] tracking-tight md:text-4xl">
                Les fonctionnalités qui changent ton quotidien
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Chaque bloc est pensé pour restituer les informations essentielles et t'aider à
                provisionner sans te perdre dans les chiffres.
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
                      <span aria-hidden="true">▣</span>Alertes visuelles sur les échéances
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Focus direct sur le cash disponible
                    </li>
                  </ul>
                </div>
                <div className="brutal-card rounded-[var(--radius-base)] p-6">
                  <h3 className="text-2xl font-[weight:var(--font-weight-heading)]">
                    Paramètres flexibles
                  </h3>
                  <p className="mt-3 text-foreground/80">
                    Gère tes taux de TVA, modifie tes contributions et active/désactive des blocs
                    selon ton statut (micro, réel simplifié...).
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Multiples taux de TVA
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Gestion des acomptes URSSAF
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">▣</span>Scénarios d'impôt personnalisés
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
                    Ajoute montant, date, client, statut d'encaissement. Tri et filtres bruts pour
                    aller droit au but.
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
                      Provision automatique
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Calcule automatiquement les montants à mettre de côté pour ne pas se faire
                    surprendre par les appels de charges.
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
                      Projection trimestrielle
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Visualise les montants attendus par trimestre et anticipe les pics pour lisser
                    ta trésorerie.
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
                      Rapports exportables
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Télécharge un récap brut pour ton comptable ou partage une vue figée avec
                    l'associé(e) du studio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:items-center">
            <div className="brutal-card rounded-[var(--radius-base)] p-6">
              <h3 className="text-2xl font-[weight:var(--font-weight-heading)]">
                Ce que tu suis chaque mois
              </h3>
              <p className="mt-3 text-foreground/80">
                Rest-Money te montre l'interaction entre tes entrées et tes sorties pour ne jamais
                improviser les versements fiscaux.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/70">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>Prévision de TVA à reverser et rappel d'échéance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>
                    Cotisations URSSAF lissées avec ajustements selon ton statut.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>
                    Simulateur d'impôt sur le revenu avec visualisation par tranche.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-main"></span>
                  <span>Cash disponible restant après provisions.</span>
                </li>
              </ul>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <article
                className="rounded-[var(--radius-base)] border-2 border-border bg-background p-6"
                style={{ boxShadow: 'var(--shadow)' }}
              >
                <h4 className="text-lg font-[weight:var(--font-weight-heading)]">Témoignage</h4>
                <p className="mt-3 text-sm text-foreground/70">
                  « Je sais exactement combien je dois garder sur mon compte pro et je peux enfin
                  m'autoriser une rémunération nette claire. »
                </p>
                <p className="mt-4 text-sm font-semibold">
                  Camille — Product designer indépendante
                </p>
              </article>
              <article
                className="rounded-[var(--radius-base)] border-2 border-border bg-background p-6"
                style={{ boxShadow: 'var(--shadow)' }}
              >
                <h4 className="text-lg font-[weight:var(--font-weight-heading)]">
                  Alertes brutales
                </h4>
                <p className="mt-3 text-sm text-foreground/70">
                  Des badges colorés t'indiquent quand provisionner plus ou quand ton seuil de TVA
                  approche. Lisible et sans superflu.
                </p>
                <p className="mt-4 text-sm font-semibold">Notifications email optionnelles</p>
              </article>
              <article
                className="rounded-[var(--radius-base)] border-2 border-border bg-background p-6 md:col-span-2"
                style={{ boxShadow: 'var(--shadow)' }}
              >
                <h4 className="text-lg font-[weight:var(--font-weight-heading)]">
                  Mode collaboration
                </h4>
                <p className="mt-3 text-sm text-foreground/70">
                  Partage la vue Rest-Money au comptable ou à l'associé via un lien figé, avec
                  toutes les charges intégrées et la liste détaillée des revenus.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase text-foreground/70">
                  <span
                    className="rounded-full border-2 border-border px-3 py-1"
                    style={{ boxShadow: 'var(--shadow)' }}
                  >
                    Vue lecture seule
                  </span>
                  <span
                    className="rounded-full border-2 border-border px-3 py-1"
                    style={{ boxShadow: 'var(--shadow)' }}
                  >
                    Exports CSV
                  </span>
                  <span
                    className="rounded-full border-2 border-border px-3 py-1"
                    style={{ boxShadow: 'var(--shadow)' }}
                  >
                    Commentaires
                  </span>
                </div>
              </article>
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
                Ton contrôle fiscal en 3 étapes ultraclaires
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
                  Factures, acomptes, revenus exceptionnels : tout est centralisé et taggable.
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
                  TVA, URSSAF, IR : les montants se recalculent dès qu'un revenu change.
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
                  Tu provisionnes
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Les montants à garder sont affichés clairement : tu sais ce que tu peux
                  réellement te verser.
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
            <p className="mt-4 text-lg text-foreground/80">
              Le brut des réponses aux questions qu'on nous pose le plus
            </p>
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
                Puis-je configurer mes taux de TVA&nbsp;?
              </summary>
              <p className="mt-3 text-sm text-foreground/70">
                Oui. Ajoute tes propres taux (5,5%, 10%, 20%...) et applique-les par ligne de
                revenu pour adapter le calcul à ton activité.
              </p>
            </details>
            <details
              className="rounded-[var(--radius-base)] border-2 border-border bg-background px-6 py-4"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <summary className="cursor-pointer text-lg font-[weight:var(--font-weight-heading)]">
                Quels exports sont disponibles&nbsp;?
              </summary>
              <p className="mt-3 text-sm text-foreground/70">
                Tu peux récupérer un export brut des revenus, des montants provisionnés et des
                échéances à envoyer à ton comptable ou à conserver en archive.
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

        {/* Contact */}
        <section id="contact" className="bg-secondary-background py-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-[weight:var(--font-weight-heading)] tracking-tight">
                  Besoin d'un accès early&nbsp;?
                </h2>
                <p className="mt-4 text-lg text-foreground/80">
                  On ouvre des créneaux chaque semaine pour intégrer de nouveaux indépendants.
                  Écris-nous et on t'envoie une invitation.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:hello@rest-money.fr"
                    className="brutal-button inline-flex items-center justify-center rounded-[var(--radius-base)] px-6 py-3"
                  >
                    hello@rest-money.fr
                  </a>
                  <div
                    className="rounded-[var(--radius-base)] border-2 border-border px-4 py-3 text-sm text-foreground/70"
                    style={{ boxShadow: 'var(--shadow)' }}
                  >
                    <p className="font-semibold">Support humain</p>
                    <p>Réponse sous 24h ouvrées.</p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-[var(--radius-base)] border-2 border-border bg-background p-6"
                style={{ boxShadow: 'var(--shadow)' }}
              >
                <h3 className="text-xl font-[weight:var(--font-weight-heading)]">
                  Mentions rapides
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                  <li>
                    <a href="#mentions-legales" className="underline decoration-2 underline-offset-4">
                      Mentions légales
                    </a>
                  </li>
                  <li>
                    <a
                      href="#confidentialite"
                      className="underline decoration-2 underline-offset-4"
                    >
                      Politique de confidentialité
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold">Disponibilité</span> : 99,98% (12 derniers mois)
                  </li>
                  <li>
                    <span className="font-semibold">Sécurité</span> : chiffrement AES-256 au repos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-main py-16 text-main-foreground">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-center">
              <div>
                <h2 className="text-3xl font-[weight:var(--font-weight-heading)] tracking-tight md:text-4xl">
                  Prêt à reprendre le contrôle de ta trésorerie&nbsp;?
                </h2>
                <p className="mt-4 text-lg">
                  Active ton accès Rest-Money, ajoute tes premiers revenus et laisse le moteur
                  calculer instantanément ton net à toi.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <a
                  href="/login"
                  className="brutal-button inline-flex items-center justify-center rounded-[var(--radius-base)] bg-background px-8 py-4 text-lg text-foreground"
                >
                  Je veux essayer
                </a>
                <span className="text-sm">
                  Pas de CB nécessaire — Annulation possible en 2 clics
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

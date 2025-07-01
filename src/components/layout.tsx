import { type ReactNode } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Breadcrumb, useBreadcrumbs } from './ui/breadcrumb';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showBreadcrumbs?: boolean;
  className?: string;
}

export function PageLayout({
  children,
  title,
  description,
  showBreadcrumbs = true,
  className = '',
}: PageLayoutProps) {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const breadcrumbs = useBreadcrumbs(pathname);

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {(title || description) && (
        <div className="border-b-2 border-border bg-secondary-background">
          <div className="container py-6">
            {title && <h1 className="text-3xl font-heading text-foreground mb-2">{title}</h1>}
            {description && <p className="text-foreground/70 max-w-2xl">{description}</p>}
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="container py-6">{children}</div>
    </div>
  );
}

// Composant pour les sections de page
export function PageSection({
  children,
  className = '',
  title,
  description,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className={`space-y-6 ${className}`}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h2 className="text-2xl font-heading text-foreground">{title}</h2>}
          {description && <p className="text-foreground/70">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

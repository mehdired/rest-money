import { Link } from '@tanstack/react-router';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from 'src/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-1 text-sm', className)} aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 px-2 py-1 rounded-base border-2 border-border text-foreground/70 shadow-shadow hover:text-foreground hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
      >
        <Home className="h-3 w-3" />
        <span className="sr-only">Accueil</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-3 w-3 text-foreground/50" />

          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center gap-1 px-2 py-1 rounded-base border-2 border-border text-foreground/70 shadow-shadow hover:text-foreground hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
            >
              {item.icon && <item.icon className="h-3 w-3" />}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-1 px-2 py-1 text-foreground font-medium">
              {item.icon && <item.icon className="h-3 w-3" />}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

export function useBreadcrumbs(pathname: string) {
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');

    const labelMap: Record<string, string> = {
      income: 'Revenus',
      settings: 'Paramètres',
      dashboard: 'Dashboard',
    };

    return {
      label: labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: index === pathSegments.length - 1 ? undefined : href, // Pas de lien pour la page actuelle
    };
  });

  return breadcrumbs;
}

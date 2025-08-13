import { type ReactNode } from 'react';
import { Button } from './button';
import { cn } from 'src/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center space-y-4',
        className
      )}
    >
      {icon && (
        <div className="p-4 bg-secondary-background border-2 border-border rounded-base shadow-shadow">
          {icon}
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-heading text-foreground">{title}</h3>
        {description && <p className="text-foreground/70 max-w-md">{description}</p>}
      </div>

      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Composant pour les états de chargement
export function LoadingState({ message = 'Chargement...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="animate-spin h-8 w-8 border-2 border-border border-t-main rounded-full"></div>
      <p className="text-foreground/70">{message}</p>
    </div>
  );
}

// Composant pour les erreurs
export function ErrorState({
  title = "Une erreur s'est produite",
  description,
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="p-4 bg-red-50 border-2 border-red-200 rounded-base shadow-shadow">
        <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-heading text-foreground">{title}</h3>
        {description && <p className="text-foreground/70 max-w-md">{description}</p>}
      </div>

      {onRetry && (
        <Button onClick={onRetry} variant="neutral">
          Réessayer
        </Button>
      )}
    </div>
  );
}

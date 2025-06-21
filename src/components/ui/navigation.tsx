import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Home, DollarSign, Settings, Menu, X } from 'lucide-react';
import { Button } from './button';
import { cn } from 'src/lib/utils';

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/income', icon: DollarSign, label: 'Revenus' },
    { to: '/settings', icon: Settings, label: 'Paramètres' },
  ];

  return (
    <div className={cn('md:hidden', className)}>
      {/* Mobile menu button */}
      <Button
        variant="neutral"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-overlay" onClick={() => setIsOpen(false)} />}

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed right-0 top-0 z-40 h-full w-64 bg-secondary-background border-l-2 border-border shadow-shadow transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6 pt-20">
          <nav className="space-y-3">
            {navItems.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-base border-2 border-border text-foreground font-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none [&.active]:bg-main [&.active]:text-main-foreground"
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export function DesktopNav({ className }: { className?: string }) {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/income', icon: DollarSign, label: 'Revenus' },
    { to: '/settings', icon: Settings, label: 'Paramètres' },
  ];

  return (
    <div className={cn('hidden md:flex items-center gap-2', className)}>
      {navItems.map(({ to, icon: Icon, label }) => (
        <Link
          key={to}
          to={to}
          className="flex items-center gap-2 px-4 py-2 rounded-base border-2 border-border text-foreground font-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none [&.active]:bg-main [&.active]:text-main-foreground"
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}

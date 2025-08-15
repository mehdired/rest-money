import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Row,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  RefreshCw,
  Download,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { EmptyState } from './ui/empty-state';
import { type Income } from 'src/types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getRowCanExpand?: (row: Row<TData>) => boolean;
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  onRefresh?: () => void;
  onExport?: () => void;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  getRowCanExpand,
  title = 'Données',
  description,
  searchPlaceholder = 'Rechercher...',
  onRefresh,
  onExport,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const renderSubComponent = ({ row }: { row: Row<Income> }) => {
    const income = row.original;
    return (
      <div className="p-4 bg-secondary-background border border-border/20 rounded-base m-2">
        <h4 className="font-heading text-foreground mb-3">Détails du revenu</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-foreground/70">ID:</span>
            <span className="ml-2 font-mono text-xs">{income.id}</span>
          </div>
          <div>
            <span className="text-foreground/70">Date complète:</span>
            <span className="ml-2">{new Date(income.date).toLocaleString('fr-FR')}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-foreground/70">Source:</span>
            <span className="ml-2 font-medium">{income.from}</span>
          </div>
        </div>
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="space-y-4">
        {/* Header même quand vide */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading text-foreground">{title}</h2>
            {description && <p className="text-foreground/70">{description}</p>}
          </div>
          <div className="flex gap-2">
            {onRefresh && (
              <Button variant="neutral" size="sm" onClick={onRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <EmptyState
          icon={<Search className="h-12 w-12 text-main" />}
          title="Aucun revenu trouvé"
          description="Commencez par ajouter vos premiers revenus pour les voir apparaître ici."
          action={{
            label: 'Ajouter un revenu',
            onClick: () => (window.location.href = '/income'),
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec titre et actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading text-foreground">{title}</h2>
          {description && <p className="text-foreground/70">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {onRefresh && (
            <Button variant="neutral" size="sm" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          {onExport && (
            <Button variant="neutral" size="sm" onClick={onExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Exporter</span>
            </Button>
          )}
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Recherche globale */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Contrôles */}
        <div className="flex items-center gap-2">
          {/* Visibilité des colonnes */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="neutral" size="sm">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Colonnes</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Afficher les colonnes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: boolean) => column.toggleVisibility(!!value)}
                    >
                      {(column.columnDef.meta as any)?.displayName || column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filtres actifs */}
          {(columnFilters.length > 0 || globalFilter) && (
            <Button
              variant="neutral"
              size="sm"
              onClick={() => {
                setColumnFilters([]);
                setGlobalFilter('');
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Effacer</span>
            </Button>
          )}
        </div>
      </div>

      {/* Statistiques */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
        <span>
          {table.getFilteredRowModel().rows.length} résultat(s)
          {table.getFilteredRowModel().rows.length !== data.length && ` sur ${data.length} total`}
        </span>
        {globalFilter && <span className="text-main">Recherche: "{globalFilter}"</span>}
      </div>

      {/* Tableau */}
      <div className="border-2 border-border rounded-base shadow-shadow overflow-hidden bg-secondary-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-2 border-border bg-background">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-heading text-foreground border-r border-border/20 last:border-r-0"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <Button
                            variant="neutral"
                            size="sm"
                            onClick={header.column.getToggleSortingHandler()}
                            className="h-6 w-6 p-0"
                          >
                            {header.column.getIsSorted() === 'desc' ? (
                              <ArrowDown className="h-3 w-3" />
                            ) : header.column.getIsSorted() === 'asc' ? (
                              <ArrowUp className="h-3 w-3" />
                            ) : (
                              <ArrowUpDown className="h-3 w-3" />
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row, index) => (
              <React.Fragment key={row.id}>
                <TableRow
                  className={`
                    border-b border-border/20 hover:bg-background/50 transition-colors
                    ${index % 2 === 0 ? 'bg-secondary-background' : 'bg-background'}
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-r border-border/10 last:border-r-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow>
                    <TableCell colSpan={row.getVisibleCells().length} className="p-0">
                      {renderSubComponent({ row: row as Row<Income> })}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-foreground/70">
          Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="neutral"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Précédent</span>
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
              const pageIndex = table.getState().pagination.pageIndex;
              const totalPages = table.getPageCount();

              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i;
              } else if (pageIndex < 3) {
                pageNumber = i;
              } else if (pageIndex > totalPages - 4) {
                pageNumber = totalPages - 5 + i;
              } else {
                pageNumber = pageIndex - 2 + i;
              }

              if (pageNumber < 0 || pageNumber >= totalPages) return null;

              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === pageIndex ? 'default' : 'neutral'}
                  size="sm"
                  onClick={() => table.setPageIndex(pageNumber)}
                  className="w-8 h-8 p-0"
                >
                  {pageNumber + 1}
                </Button>
              );
            })}
          </div>

          <Button
            variant="neutral"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="hidden sm:inline mr-1">Suivant</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

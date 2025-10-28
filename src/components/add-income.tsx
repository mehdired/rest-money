import { type FormEvent, useState } from 'react';
import type { Income } from 'src/types';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from 'src/components/ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dbInsertIncome } from 'src/db';
import { createServerFn } from '@tanstack/react-start';
import {
  Plus,
  Euro,
  Calendar,
  Building2,
  Calculator,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { formatCurrency } from 'src/utils';
import { toast } from 'sonner';
import { useTvaCalculation } from '@/hooks/use-calculation-tva';
import { authMiddleware } from '@/lib/auth-middleware';
import { useSettings } from '@/hooks/use-settings';

const addIncomeFn = createServerFn({ method: 'POST' })
  .inputValidator((d: Income) => d)
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    await dbInsertIncome({ ...data, userId: context.user.id! });
  });

// Types d'clients prédéfinis
const CLIENT_TYPES = [
  { value: 'entreprise', label: 'Entreprise' },
  { value: 'startup', label: 'Startup' },
  { value: 'agence', label: 'Agence' },
  { value: 'particulier', label: 'Particulier' },
  { value: 'autre', label: 'Autre' },
];

interface FormData {
  from: string;
  clientType: string;
  date: string;
  amount: string;
  description: string;
  hasTVA: boolean;
}

interface FormErrors {
  from?: string;
  date?: string;
  amount?: string;
}

export function AddIncome({ isAddIncomeAllowed }: { isAddIncomeAllowed: boolean }) {
  const queryClient = useQueryClient();
  const allSettings = useSettings();
  const tvaValue = allSettings?.find((setting) => setting.name === 'tva');

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    from: '',
    clientType: '',
    date: new Date().toISOString().split('T')[0], // Date d'aujourd'hui par défaut
    amount: '',
    description: '',
    hasTVA: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const tvaRate = Number(tvaValue?.value || 20);

  const { netAmount, tvaAmount, grossAmount, numericAmount } = useTvaCalculation({
    amount: formData.amount,
    tvaRate,
    hasTVA: formData.hasTVA,
  });

  const addMutation = useMutation({
    mutationFn: addIncomeFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      toast.success('Revenu ajouté avec succès!', {
        description: `${formatCurrency(grossAmount)} de ${formData.from}`,
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
      resetForm();
      setOpenDialog(false);
    },
    onError: (error) => {
      toast.error("Erreur lors de l'ajout", {
        description: "Impossible d'ajouter le revenu. Veuillez réessayer.",
        icon: <AlertCircle className="h-4 w-4" />,
      });
      console.error('Failed to add income:', error);
    },
  });

  const resetForm = () => {
    setFormData({
      from: '',
      clientType: '',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      description: '',
      hasTVA: true,
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.from.trim()) {
      newErrors.from = 'Le nom du client est requis';
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Le montant est requis';
    } else if (isNaN(numericAmount) || numericAmount <= 0) {
      newErrors.amount = 'Veuillez entrer un montant valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error('Formulaire invalide', {
        description: 'Veuillez corriger les erreurs avant de continuer.',
        icon: <AlertCircle className="h-4 w-4" />,
      });
      return;
    }

    const newIncome: Income = {
      id: crypto.randomUUID(),
      from: formData.from.trim(),
      date: new Date(formData.date),
      amount: grossAmount,
      isTva: formData.hasTVA,
    };

    addMutation.mutate({ data: newIncome });
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Nettoyer les erreurs quand l'utilisateur corrige
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Button
          onClick={() => setOpenDialog(true)}
          className="flex items-center gap-2"
          disabled={!isAddIncomeAllowed}
        >
          <Plus className="h-4 w-4" />
          Ajouter un revenu
        </Button>

        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Euro className="h-5 w-5 text-main" />
              Nouveau revenu
            </DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau revenu à votre suivi financier. Tous les champs marqués d'un * sont
              obligatoires.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Informations client */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/20">
                <Building2 className="h-4 w-4 text-main" />
                <h3 className="font-heading text-foreground">Informations client</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from" className="flex items-center gap-1">
                    Nom du client *{errors.from && <AlertCircle className="h-3 w-3 text-red-500" />}
                  </Label>
                  <Input
                    id="from"
                    value={formData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    placeholder="Ex: Entreprise ABC, Jean Dupont..."
                    className={errors.from ? 'border-red-500' : ''}
                  />
                  {errors.from && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.from}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientType">Type de client</Label>
                  <Select
                    value={formData.clientType}
                    onValueChange={(value: string) => handleInputChange('clientType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLIENT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Informations financières */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/20">
                <Calculator className="h-4 w-4 text-main" />
                <h3 className="font-heading text-foreground">Informations financières</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Date *{errors.date && <AlertCircle className="h-3 w-3 text-red-500" />}
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className={errors.date ? 'border-red-500' : ''}
                  />
                  {errors.date && (
                    <p className="text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.date}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center gap-1">
                    <Euro className="h-3 w-3" />
                    Montant *
                    {formData.hasTVA && (
                      <span className="text-xs text-foreground/60 ml-1">TTC</span>
                    )}
                    {!formData.hasTVA && (
                      <span className="text-xs text-green-600 ml-1">(Net de TVA)</span>
                    )}
                    {errors.amount && <AlertCircle className="h-3 w-3 text-red-500" />}
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="0.00"
                    className={errors.amount ? 'border-red-500' : ''}
                  />
                  {errors.amount && (
                    <p className="text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.amount}
                    </p>
                  )}
                </div>
              </div>

              {/* Options TVA */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-3 bg-secondary-background border border-border/20 rounded-base">
                  <Checkbox
                    id="hasTVA"
                    checked={formData.hasTVA}
                    onCheckedChange={(checked) => handleInputChange('hasTVA', checked as boolean)}
                  />
                  <Label htmlFor="hasTVA" className="flex items-center gap-2 cursor-pointer">
                    <Info className="h-3 w-3 text-main" />
                    Ce revenu est soumis à la TVA
                  </Label>
                </div>
              </div>

              {/* Récapitulatif des calculs */}
              {formData.amount && !isNaN(numericAmount) && numericAmount > 0 && (
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-border rounded-base shadow-shadow">
                  <h4 className="font-heading text-foreground mb-3 flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Récapitulatif
                  </h4>

                  {!formData.hasTVA ? (
                    // Revenu net de TVA
                    <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-base">
                      <p className="text-green-700 dark:text-green-300 text-sm mb-1">
                        Revenu net de TVA
                      </p>
                      <p className="font-heading text-2xl text-green-800 dark:text-green-200">
                        {formatCurrency(grossAmount)}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Aucune TVA applicable
                      </p>
                    </div>
                  ) : (
                    // Revenu soumis à la TVA
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="text-center p-2 bg-secondary-background border border-border/20 rounded-base">
                        <p className="text-foreground/70">Montant HT</p>
                        <p className="font-heading text-foreground">{formatCurrency(netAmount)}</p>
                      </div>
                      <div className="text-center p-2 bg-secondary-background border border-border/20 rounded-base">
                        <p className="text-foreground/70">TVA ({tvaRate}%)</p>
                        <p className="font-heading text-orange-600">{formatCurrency(tvaAmount)}</p>
                      </div>
                      <div className="text-center p-2 bg-main border border-border rounded-base">
                        <p className="text-main-foreground/70">Total TTC</p>
                        <p className="font-heading text-main-foreground">
                          {formatCurrency(grossAmount)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Description optionnelle */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange('description', e.target.value)
                }
                placeholder="Ajoutez des détails sur ce revenu (projet, mission, etc.)"
                className="min-h-[80px]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border/20">
              <Button
                type="button"
                variant="neutral"
                onClick={() => {
                  resetForm();
                  setOpenDialog(false);
                }}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={addMutation.isPending}
                className="flex-1 flex items-center gap-2"
              >
                {addMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Ajouter le revenu
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

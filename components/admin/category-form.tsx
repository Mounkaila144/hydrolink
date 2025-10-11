"use client";

import { useState, useEffect } from 'react';
import { Category, CategoryData } from '@/lib/admin-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: CategoryData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CategoryForm({
  category,
  onSubmit,
  onCancel,
  isLoading = false
}: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryData>({
    name: '',
    description: '',
    status: 'active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        status: category.status
      });
    }
  }, [category]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div>
            <Label htmlFor="name">
              Nom de la catégorie *
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'border-red-500' : ''}
              placeholder="Entrez le nom de la catégorie"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Description de la catégorie (optionnel)"
              disabled={isLoading}
            />
          </div>

          {/* Statut */}
          <div>
            <Label htmlFor="status">
              Statut
            </Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isLoading}
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
            <p className="mt-1 text-sm text-muted-foreground">
              Les catégories inactives ne seront pas affichées sur le site
            </p>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enregistrement...
                </div>
              ) : (
                category ? 'Modifier' : 'Créer'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

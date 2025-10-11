"use client";

import { useState } from 'react';
import { Category } from '@/lib/admin-service';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: 'active' | 'inactive') => void;
  isLoading?: boolean;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
  onStatusChange,
  isLoading = false
}: CategoryTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${name}" ?`)) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-neutral-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="text-neutral-400 text-6xl mb-4">📁</div>
          <h3 className="text-lg font-medium text-foreground mb-2">Aucune catégorie</h3>
          <p className="text-muted-foreground">Commencez par créer votre première catégorie.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Produits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Créé le
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {category.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-muted-foreground max-w-xs truncate">
                    {category.description || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onStatusChange(category.id, category.status === 'active' ? 'inactive' : 'active')}
                    className="inline-flex"
                  >
                    <Badge
                      variant={category.status === 'active' ? 'default' : 'destructive'}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      {category.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {category.products_count || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {formatDate(category.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(category)}
                      className="text-primary-600 hover:text-primary-900 transition-colors p-1"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id, category.name)}
                      disabled={deletingId === category.id}
                      className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50 p-1"
                      title="Supprimer"
                    >
                      {deletingId === category.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

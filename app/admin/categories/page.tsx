"use client";

import { useState, useEffect } from 'react';
import { withAuth } from "@/lib/with-auth";
import { useToastContext } from '../layout';
import AdminLayout from "@/components/admin/admin-layout";
import CategoryTable from "@/components/admin/category-table";
import CategoryForm from "@/components/admin/category-form";
import Pagination from "@/components/admin/pagination";
import { adminService, Category, CategoryData, PaginationMeta } from '@/lib/admin-service';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Modal } from '@/components/ui/modal';

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 1,
    to: 10
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const toast = useToastContext();

  useEffect(() => {
    loadCategories();
  }, [meta.current_page, searchTerm, statusFilter]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await adminService.getCategories(meta.current_page, meta.per_page);
      setCategories(response.data);
      setMeta({
        current_page: response.meta.current_page,
        last_page: response.meta.last_page,
        per_page: response.meta.per_page,
        total: response.meta.total,
        from: (response.meta.current_page - 1) * response.meta.per_page + 1,
        to: Math.min(response.meta.current_page * response.meta.per_page, response.meta.total)
      });
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
      toast.error('Erreur', 'Impossible de charger les catégories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (data: CategoryData) => {
    try {
      await adminService.createCategory(data);
      setShowForm(false);
      setEditingCategory(undefined);
      await loadCategories();
      toast.success('Succès', 'Catégorie créée avec succès');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast.error('Erreur', 'Impossible de créer la catégorie');
      throw error;
    }
  };

  const handleUpdateCategory = async (data: CategoryData) => {
    if (!editingCategory) return;

    try {
      await adminService.updateCategory(editingCategory.id, data);
      setShowForm(false);
      setEditingCategory(undefined);
      await loadCategories();
      toast.success('Succès', 'Catégorie modifiée avec succès');
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      toast.error('Erreur', 'Impossible de modifier la catégorie');
      throw error;
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await adminService.deleteCategory(id);
      await loadCategories();
      toast.success('Succès', 'Catégorie supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur', 'Impossible de supprimer la catégorie');
    }
  };

  const handleStatusChange = async (id: number, status: 'active' | 'inactive') => {
    try {
      const category = categories.find(c => c.id === id);
      if (category) {
        await adminService.updateCategory(id, { ...category, status });
        await loadCategories();
        toast.success('Succès', 'Statut modifié avec succès');
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      toast.error('Erreur', 'Impossible de modifier le statut');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(undefined);
  };

  const handlePageChange = (page: number) => {
    setMeta(prev => ({ ...prev, current_page: page }));
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && category.status === 'active') ||
      (statusFilter === 'inactive' && category.status === 'inactive');
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion des catégories</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gérez vos catégories de produits
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle catégorie
          </Button>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <CategoryTable
          categories={filteredCategories}
          onEdit={handleEdit}
          onDelete={handleDeleteCategory}
          onStatusChange={handleStatusChange}
          isLoading={loading}
        />

        {/* Pagination */}
        {meta && meta.last_page > 1 && (
          <Pagination
            meta={meta}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Modal de formulaire */}
      <Modal
        isOpen={showForm}
        onClose={handleCancel}
        size="lg"
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
          onCancel={handleCancel}
        />
      </Modal>
    </AdminLayout>
  );
}

export default withAuth(CategoriesPage, {
  allowedRoles: ['admin'],
  redirectTo: '/'
});

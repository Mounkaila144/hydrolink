"use client";

import { useState, useEffect } from "react";
import { withAuth } from "@/lib/with-auth";
import AdminLayout from "@/components/admin/admin-layout";
import ProductTable from "@/components/admin/product-table";
import ProductForm from "@/components/admin/product-form";
import Pagination from "@/components/admin/pagination";
import { adminService } from "@/lib/admin-service";
import { AdminProduct, ProductFormData, AdminCategory, PaginationMeta, AdminFilters } from "@/lib/validations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Package, CheckCircle, TrendingUp } from "lucide-react";

function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | undefined>();
  const [filters, setFilters] = useState<AdminFilters>({
    search: '',
    status: '',
    category_id: undefined,
    page: 1,
    per_page: 10
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters.page, filters.search, filters.status, filters.category_id]);

  const loadCategories = async () => {
    try {
      const response = await adminService.getCategories(1, 100);
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getProducts(
        filters.page || 1,
        filters.per_page || 10,
        {
          search: filters.search,
          status: filters.status || undefined,
          category_id: filters.category_id
        }
      );
      // Normalise la réponse pour garantir un tableau
      setProducts(Array.isArray(response.data) ? response.data : (response.data ? [response.data as unknown as AdminProduct] : []));
      // Assure que meta est toujours défini pour éviter les erreurs d'accès
      setMeta(
        response.meta ?? {
          current_page: filters.page || 1,
          last_page: 1,
          per_page: filters.per_page || 10,
          total: response.data?.length ?? 0,
          from: 0,
          to: 0
        }
      );
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      await adminService.createProduct(data);
      setShowForm(false);
      setEditingProduct(undefined);
      await loadProducts();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      throw error;
    }
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!editingProduct) return;

    try {
      await adminService.updateProduct(editingProduct.id, data);
      setShowForm(false);
      setEditingProduct(undefined);
      await loadProducts();
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      throw error;
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await adminService.deleteProduct(id);
      await loadProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleStatusChange = async (id: number, status: 'active' | 'inactive') => {
    try {
      const product = products.find(p => p.id === id);
      if (product) {
        await adminService.updateProduct(id, {
          ...product,
          is_active: status === 'active'
        });
        await loadProducts();
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
    }
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const handleStatusFilterChange = (status: string) => {
    setFilters(prev => ({ ...prev, status, page: 1 }));
  };

  const handleCategoryFilterChange = (category_id: string) => {
    setFilters(prev => ({
      ...prev,
      category_id: category_id ? parseInt(category_id) : undefined,
      page: 1
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion des produits</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gérez votre catalogue de produits
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau produit
          </Button>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white max-h-screen overflow-y-auto">
              <ProductForm
                product={editingProduct}
                categories={categories}
                onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        {/* Filtres et recherche */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={filters.search || ''}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={filters.status || ''}
                  onChange={(e) => handleStatusFilterChange(e.target.value)}
                  className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
              <div>
                <select
                  value={filters.category_id || ''}
                  onChange={(e) => handleCategoryFilterChange(e.target.value)}
                  className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total produits</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{meta?.total ?? 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits actifs</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Array.isArray(products) ? products.filter(p => p.is_active).length : 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits vedettes</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Array.isArray(products) ? products.filter(p => p.is_featured).length : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tableau */}
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDeleteProduct}
          onStatusChange={handleStatusChange}
          isLoading={loading}
        />

        {/* Pagination */}
        {meta?.last_page > 1 && (
          <Pagination
            meta={meta}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default withAuth(ProductsPage, {
  allowedRoles: ['admin'],
  redirectTo: '/'
});

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { withAuth } from "@/lib/with-auth";
import AdminLayout from "@/components/admin/admin-layout";
import { adminService } from '@/lib/admin-service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderTree, Package, CheckCircle, XCircle, ShoppingCart, Clock } from "lucide-react";

interface DashboardStats {
  totalCategories: number;
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  totalOrders: number;
  pendingOrders: number;
}

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCategories: 0,
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardStats = await adminService.getStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
  }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-md ${color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-muted-foreground truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-foreground">
                {loading ? (
                  <div className="animate-pulse h-6 bg-neutral-200 rounded w-16"></div>
                ) : (
                  value
                )}
              </dd>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Vue d'ensemble de votre plateforme hydrolink
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Catégories"
            value={stats.totalCategories}
            color="bg-blue-500"
            icon={FolderTree}
          />

          <StatCard
            title="Total Produits"
            value={stats.totalProducts}
            color="bg-green-500"
            icon={Package}
          />

          <StatCard
            title="Produits Actifs"
            value={stats.activeProducts}
            color="bg-emerald-500"
            icon={CheckCircle}
          />

          <StatCard
            title="Produits Inactifs"
            value={stats.inactiveProducts}
            color="bg-red-500"
            icon={XCircle}
          />

          <StatCard
            title="Total Commandes"
            value={stats.totalOrders}
            color="bg-purple-500"
            icon={ShoppingCart}
          />

          <StatCard
            title="Commandes en attente"
            value={stats.pendingOrders}
            color="bg-yellow-500"
            icon={Clock}
          />
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Accédez rapidement aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/admin/categories"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                    <FolderTree className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Gérer les catégories
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Créer, modifier et organiser vos catégories de produits.
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/products"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                    <Package className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Gérer les produits
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Ajouter, modifier et gérer votre catalogue de produits.
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/orders"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                    <ShoppingCart className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Gérer les commandes
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Consulter et gérer les commandes des clients.
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default withAuth(AdminDashboard, {
  allowedRoles: ['admin'],
  redirectTo: '/'
});

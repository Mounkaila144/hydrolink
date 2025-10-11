"use client";

import { withAuth } from "@/lib/with-auth";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function OrdersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Commandes</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Suivez et gérez les commandes
            </p>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline">Toutes</Badge>
            <Badge variant="outline">En attente</Badge>
            <Badge variant="outline">Complétées</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des commandes</CardTitle>
            <CardDescription>
              Toutes les commandes passées sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-8">
              La gestion complète des commandes sera disponible prochainement.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default withAuth(OrdersPage, {
  allowedRoles: ['admin'],
  redirectTo: '/'
});

"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ProductCard } from "@/components/products/product-card";
import { productsService, PublicProduct, PublicCategory } from "@/lib/products-service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Loader2, Package } from "lucide-react";

export default function ProduitsPage() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 12;

  // Charger les categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await productsService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des categories:", error);
      }
    };

    loadCategories();
  }, []);

  // Charger les produits
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await productsService.getProducts({
          page: currentPage,
          per_page: perPage,
          category_id: selectedCategory,
          search: searchQuery || undefined,
        });

        setProducts(response.data);
        setTotalPages(response.meta.last_page);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentPage, selectedCategory, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Nos Produits
              </h1>
              <p className="text-lg text-primary-100">
                Decouvrez notre selection de produits de qualite pour tous vos besoins
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="container mx-auto px-4 sm:px-6 py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Search */}
                <div className="md:col-span-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Rechercher un produit..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="md:col-span-4">
                  <select
                    value={selectedCategory || ""}
                    onChange={(e) => handleCategoryFilter(e.target.value ? Number(e.target.value) : undefined)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Toutes les categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.products_count || 0})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex items-center gap-2 mt-4">
                {selectedCategory && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCategoryFilter(undefined)}
                    className="text-xs"
                  >
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <span className="ml-2">×</span>
                  </Button>
                )}
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearch("")}
                    className="text-xs"
                  >
                    "{searchQuery}"
                    <span className="ml-2">×</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 sm:px-6 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun produit trouve
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos filtres ou votre recherche
              </p>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  {products.length} produit{products.length > 1 ? "s" : ""} trouve{products.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Precedent
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

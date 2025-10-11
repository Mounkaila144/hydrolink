"use client";

import Image from "next/image";
import Link from "next/link";
import { PublicProduct, getFullImageUrl } from "@/lib/products-service";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: PublicProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
    : 0;

  const imageUrl = product.images && product.images.length > 0
    ? getFullImageUrl(product.images[0])
    : '';

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23e5e7eb"/%3E%3Cpath d="M80 260l91.72-91.72a20 20 0 0128.28 0L260 230m-40-40l31.72-31.72a20 20 0 0128.28 0L320 200m-120-120h.2M120 320h160a40 40 0 0040-40V120a40 40 0 00-40-40H120a40 40 0 00-40 40v160a40 40 0 0040 40z" stroke="%239ca3af" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_featured && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-1">
              <Star className="h-3 w-3 fill-white" />
              Vedette
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white">
              -{discountPercentage}%
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge className="bg-gray-800 hover:bg-gray-900 text-white">
              Rupture
            </Badge>
          )}
          {product.stock > 0 && product.stock < 5 && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
              Stock limite
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        {/* Category */}
        {product.category && (
          <p className="text-xs text-primary-600 font-medium mb-2">
            {product.category.name}
            {product.subcategory && ` > ${product.subcategory.name}`}
          </p>
        )}

        {/* Title */}
        <Link href={`/produits/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.original_price!)}
            </span>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full btn-primary"
          disabled={product.stock === 0}
          asChild
        >
          <a
            href={`https://wa.me/22791270951?text=Bonjour, je suis intéressé par le produit: ${encodeURIComponent(product.name)} - Prix: ${formatPrice(product.price)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? "Rupture de stock" : "Acheter"}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AdminProduct, AdminCategory, AdminSubcategory, ProductFormData, ProductStatus } from "@/lib/validations";
import { adminService, getFullImageUrl } from "@/lib/admin-service";
import { PRODUCT_STATUSES } from "@/lib/constants/productStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  product?: AdminProduct;
  categories?: AdminCategory[];
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

export function ProductForm({ product, categories: categoriesProp, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category_id: product?.category_id || 0,
    subcategory_id: product?.subcategory_id || undefined,
    images: product?.images || [],
    is_active: product?.is_active !== undefined ? product.is_active : true,
    stock: product?.stock || 0,
    status: product?.status || [],
  });

  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [subcategories, setSubcategories] = useState<AdminSubcategory[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load categories on mount (if not provided via props)
  useEffect(() => {
    if (!categoriesProp || categoriesProp.length === 0) {
      loadCategories();
    } else {
      setCategories(categoriesProp);
    }
  }, [categoriesProp]);

  // Load subcategories when category changes
  useEffect(() => {
    if (formData.category_id > 0) {
      loadSubcategories(formData.category_id);
    } else {
      setSubcategories([]);
      setFormData(prev => ({ ...prev, subcategory_id: undefined }));
    }
  }, [formData.category_id]);

  // Set initial image preview if editing
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setImagePreview(getFullImageUrl(product.images[0]));
    }
  }, [product]);

  const loadCategories = async () => {
    try {
      const response = await adminService.getCategories(1, 100);
      setCategories(response.data.filter(cat => cat.status === "active"));
    } catch (error) {
      console.error("Erreur lors du chargement des categories:", error);
    }
  };

  const loadSubcategories = async (categoryId: number) => {
    try {
      const response = await adminService.getSubcategories(1, 100, categoryId);
      setSubcategories(response.data.filter(sub => sub.status === "active"));
    } catch (error) {
      console.error("Erreur lors du chargement des sous-categories:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusChange = (statusValue: ProductStatus) => {
    const currentStatuses = formData.status || [];
    const newStatuses = currentStatuses.includes(statusValue)
      ? currentStatuses.filter(s => s !== statusValue)
      : [...currentStatuses, statusValue];
    setFormData(prev => ({ ...prev, status: newStatuses }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom du produit est requis";
    }

    if (formData.price <= 0) {
      newErrors.price = "Le prix doit etre superieur a 0";
    }

    if (formData.category_id <= 0) {
      newErrors.category_id = "Veuillez selectionner une categorie";
    }

    if (formData.stock < 0) {
      newErrors.stock = "Le stock ne peut pas etre negatif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = formData.images?.[0];

      // Upload image if a new one was selected
      if (imageFile) {
        setIsUploading(true);
        const uploadResponse = await adminService.uploadImage(imageFile);
        imageUrl = uploadResponse.data.url;
        setIsUploading(false);
      }

      const submitData: ProductFormData = {
        ...formData,
        images: imageUrl ? [imageUrl] : [],
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setErrors({ submit: "Une erreur est survenue lors de la soumission" });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errors.submit}
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <Label htmlFor="name">
            Nom du produit <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Entrez le nom du produit"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description detaillee du produit"
            rows={4}
          />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">
            Prix (XOF) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="1"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
            placeholder="0"
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && (
            <p className="text-sm text-red-500 mt-1">{errors.price}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <Label htmlFor="stock">
            Stock <span className="text-red-500">*</span>
          </Label>
          <Input
            id="stock"
            type="number"
            min="0"
            step="1"
            value={formData.stock}
            onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
            placeholder="0"
            className={errors.stock ? "border-red-500" : ""}
          />
          {errors.stock && (
            <p className="text-sm text-red-500 mt-1">{errors.stock}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">
            Categorie <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.category_id.toString()}
            onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: Number(value) }))}
          >
            <SelectTrigger className={errors.category_id ? "border-red-500" : ""}>
              <SelectValue placeholder="Selectionner une categorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category_id && (
            <p className="text-sm text-red-500 mt-1">{errors.category_id}</p>
          )}
        </div>

        {/* Subcategory */}
        {subcategories.length > 0 && (
          <div>
            <Label htmlFor="subcategory">Sous-categorie</Label>
            <Select
              value={formData.subcategory_id?.toString() || ""}
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                subcategory_id: value ? Number(value) : undefined
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selectionner une sous-categorie (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucune</SelectItem>
                {subcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Product Status */}
        <div>
          <Label>Statut du produit</Label>
          <div className="space-y-2 mt-2">
            {PRODUCT_STATUSES.map((statusOption) => (
              <label
                key={statusOption.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.status?.includes(statusOption.value) || false}
                  onChange={() => handleStatusChange(statusOption.value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">
                  {statusOption.emoji} {statusOption.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Active Status */}
        <div>
          <Label>Etat</Label>
          <label className="flex items-center space-x-2 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Produit actif (visible sur le site)</span>
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <Label htmlFor="image">Image du produit</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
          {imagePreview && (
            <div className="mt-4 relative w-32 h-32 rounded-md overflow-hidden border">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting || isUploading}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || isUploading}
        >
          {isUploading
            ? "Telechargement..."
            : isSubmitting
            ? "Enregistrement..."
            : product
            ? "Mettre a jour"
            : "Creer"}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;

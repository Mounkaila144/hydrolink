import { z } from "zod";

export const contactFormSchema = z.object({
  fullname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export const quoteFormSchema = z.object({
  fullname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  service: z.enum(["btp", "hydraulique", "ecommerce", "commerce_general"]),
  budget: z.string().optional(),
  city: z.string().min(2, "Veuillez spécifier la localisation").optional(),
  deadline: z.string().optional(),
  attachment: z.any().optional(),
});

export const loginFormSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const registerFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  password_confirmation: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Les mots de passe ne correspondent pas",
  path: ["password_confirmation"],
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;

// Types pour l'administration

// Types pour les statuts des produits
export type ProductStatus = 'best_seller' | 'new' | 'on_sale';

export interface ProductStatusInfo {
  value: ProductStatus;
  label: string;
  emoji: string;
  color: string;
}

// Types pour les produits
export interface AdminProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  subcategory_id?: number;
  images?: string[] | string; // Laravel peut renvoyer une chaîne JSON
  is_active: boolean;
  stock: number;
  status?: ProductStatus[] | string; // Laravel peut renvoyer une chaîne JSON
  is_featured?: boolean;
  original_price?: number;
  created_at: string;
  updated_at: string;
  category?: AdminCategory;
  subcategory?: AdminSubcategory;
}

export interface AdminCategory {
  id: number;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  image?: string;
  created_at: string;
  updated_at: string;
  products_count?: number;
  subcategories_count?: number;
}

export interface AdminSubcategory {
  id: number;
  name: string;
  description?: string;
  category_id: number;
  status: 'active' | 'inactive';
  image?: string;
  created_at: string;
  updated_at: string;
  category?: AdminCategory;
  products_count?: number;
}

// Types pour les formulaires
export interface CategoryFormData {
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  image?: string;
}

export interface SubcategoryFormData {
  name: string;
  description?: string;
  category_id: number;
  status: 'active' | 'inactive';
  image?: string;
}

export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  category_id: number;
  subcategory_id?: number;
  images?: string[];
  is_active: boolean;
  stock: number;
  status?: ProductStatus[];
}

// Types pour les filtres et recherche
export interface AdminFilters {
  search?: string;
  status?: 'active' | 'inactive' | '';
  category_id?: number;
  subcategory_id?: number;
  page?: number;
  per_page?: number;
}

// Types pour la pagination
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}
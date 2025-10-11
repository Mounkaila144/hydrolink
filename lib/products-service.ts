// Service pour récupérer les produits publics (côté client)

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Helper pour construire les URLs complètes des images
export const getFullImageUrl = (imagePath: string): string => {
  if (!imagePath || imagePath.trim() === '') {
    return '';
  }

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  return `${BACKEND_URL}${imagePath}`;
};

// Types pour les produits publics
export interface PublicProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  category_id: number;
  subcategory_id?: number;
  images: string[];
  stock: number;
  status?: string[];
  is_featured?: boolean;
  category?: {
    id: number;
    name: string;
  };
  subcategory?: {
    id: number;
    name: string;
  };
}

export interface PublicCategory {
  id: number;
  name: string;
  description?: string;
  image?: string;
  products_count?: number;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface ProductsResponse {
  status: string;
  message: string;
  data: PublicProduct[];
  meta: PaginationMeta;
}

export interface CategoriesResponse {
  status: string;
  message: string;
  data: PublicCategory[];
  meta: PaginationMeta;
}

class ProductsService {
  // Récupérer tous les produits avec filtres optionnels
  async getProducts(params?: {
    page?: number;
    per_page?: number;
    category_id?: number;
    subcategory_id?: number;
    search?: string;
    featured?: boolean;
  }): Promise<ProductsResponse> {
    let url = `${API_BASE_URL}/products`;
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.category_id) queryParams.append('category_id', params.category_id.toString());
    if (params?.subcategory_id) queryParams.append('subcategory_id', params.subcategory_id.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.featured) queryParams.append('featured', '1');

    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Normaliser les images pour chaque produit
    if (result.data && Array.isArray(result.data)) {
      result.data.forEach((product: PublicProduct) => {
        if (typeof product.images === 'string') {
          product.images = product.images.trim() === '' ? [] : [product.images];
        }
      });
    }

    return result;
  }

  // Récupérer un produit spécifique par son ID
  async getProduct(id: number): Promise<{ status: string; message: string; data: PublicProduct }> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Normaliser les images
    if (result.data && typeof result.data.images === 'string') {
      result.data.images = result.data.images.trim() === '' ? [] : [result.data.images];
    }

    return result;
  }

  // Récupérer toutes les catégories
  async getCategories(page = 1, perPage = 50): Promise<CategoriesResponse> {
    const response = await fetch(
      `${API_BASE_URL}/categories?page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Récupérer les produits vedettes
  async getFeaturedProducts(limit = 8): Promise<ProductsResponse> {
    return this.getProducts({
      per_page: limit,
      featured: true,
    });
  }
}

export const productsService = new ProductsService();

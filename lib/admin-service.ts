import {
  AdminProduct,
  AdminCategory,
  AdminSubcategory,
  ProductFormData,
  CategoryFormData,
  SubcategoryFormData,
  PaginationMeta
} from './validations';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Log des variables d'environnement au chargement
console.log('[admin-service] Environment variables:');
console.log('[admin-service] NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('[admin-service] NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
console.log('[admin-service] API_BASE_URL:', API_BASE_URL);
console.log('[admin-service] BACKEND_URL:', BACKEND_URL);

// Fonction helper pour construire les URLs complètes des images
export const getFullImageUrl = (imagePath: string): string => {
  if (!imagePath || imagePath.trim() === '') {
    return ''; // Retourner une chaîne vide si pas d'image
  }

  if (imagePath.startsWith('http')) {
    return imagePath; // Déjà une URL complète
  }

  return `${BACKEND_URL}${imagePath}`;
};

// Types pour les réponses API
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  status: string;
  message: string;
  data: T[];
  meta: PaginationMeta;
}

// Types pour les commandes
export interface OrderItem {
  id: number;
  product_id: number;
  product: AdminProduct;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  user_id: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

class AdminService {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private getHeaders(): HeadersInit {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return result;
  }

  // ==================== CATEGORIES ====================

  async getCategories(page = 1, perPage = 10): Promise<PaginatedResponse<AdminCategory>> {
    const response = await fetch(
      `${API_BASE_URL}/admin/categories?page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: this.getHeaders(),
      }
    );

    return this.handleResponse<PaginatedResponse<AdminCategory>>(response);
  }

  async getCategory(id: number): Promise<ApiResponse<AdminCategory>> {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<ApiResponse<AdminCategory>>(response);
  }

  async createCategory(data: CategoryFormData): Promise<ApiResponse<AdminCategory>> {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<ApiResponse<AdminCategory>>(response);
  }

  async updateCategory(id: number, data: CategoryFormData): Promise<ApiResponse<AdminCategory>> {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<ApiResponse<AdminCategory>>(response);
  }

  async deleteCategory(id: number): Promise<ApiResponse<null>> {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<ApiResponse<null>>(response);
  }

  // ==================== SUBCATEGORIES ====================

  async getSubcategories(page = 1, perPage = 10, categoryId?: number): Promise<PaginatedResponse<AdminSubcategory>> {
    let url = `${API_BASE_URL}/admin/subcategories?page=${page}&per_page=${perPage}`;
    if (categoryId) {
      url += `&category_id=${categoryId}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<PaginatedResponse<AdminSubcategory>>(response);
  }

  async getSubcategory(id: number): Promise<ApiResponse<AdminSubcategory>> {
    const response = await fetch(`${API_BASE_URL}/admin/subcategories/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<ApiResponse<AdminSubcategory>>(response);
  }

  async createSubcategory(data: SubcategoryFormData): Promise<ApiResponse<AdminSubcategory>> {
    const response = await fetch(`${API_BASE_URL}/admin/subcategories`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<ApiResponse<AdminSubcategory>>(response);
  }

  async updateSubcategory(id: number, data: SubcategoryFormData): Promise<ApiResponse<AdminSubcategory>> {
    const response = await fetch(`${API_BASE_URL}/admin/subcategories/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<ApiResponse<AdminSubcategory>>(response);
  }

  async deleteSubcategory(id: number): Promise<ApiResponse<null>> {
    const response = await fetch(`${API_BASE_URL}/admin/subcategories/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<ApiResponse<null>>(response);
  }

  // ==================== PRODUCTS ====================

  async getProducts(page = 1, perPage = 10, filters?: {
    category_id?: number;
    subcategory_id?: number;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<AdminProduct>> {
    let url = `${API_BASE_URL}/admin/products?page=${page}&per_page=${perPage}`;

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      });
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<PaginatedResponse<AdminProduct>>(response);
  }

  async getProduct(id: number): Promise<ApiResponse<AdminProduct>> {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<ApiResponse<AdminProduct>>(response);
  }

  async createProduct(data: ProductFormData): Promise<ApiResponse<AdminProduct>> {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<ApiResponse<AdminProduct>>(response);
  }

  async updateProduct(id: number, data: ProductFormData): Promise<ApiResponse<AdminProduct>> {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<ApiResponse<AdminProduct>>(response);
  }

  async deleteProduct(id: number): Promise<ApiResponse<null>> {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<ApiResponse<null>>(response);
  }

  // ==================== UPLOAD ====================

  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });

    return this.handleResponse<ApiResponse<{ url: string }>>(response);
  }

  // ==================== ORDERS ====================

  async getOrders(page = 1, perPage = 10, status?: string): Promise<PaginatedResponse<Order>> {
    let url = `${API_BASE_URL}/admin/orders?page=${page}&per_page=${perPage}`;
    if (status) {
      url += `&status=${status}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<PaginatedResponse<Order>>(response);
  }

  async getOrder(id: number): Promise<ApiResponse<Order>> {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<ApiResponse<Order>>(response);
  }

  async updateOrderStatus(id: number, status: Order['status']): Promise<ApiResponse<Order>> {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ status }),
    });

    return this.handleResponse<ApiResponse<Order>>(response);
  }

  // ==================== UPLOAD ====================

  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });

    return this.handleResponse<ApiResponse<{ url: string }>>(response);
  }

  // ==================== STATS ====================

  async getStats(): Promise<{
    totalCategories: number;
    totalProducts: number;
    activeProducts: number;
    inactiveProducts: number;
    totalOrders: number;
    pendingOrders: number;
  }> {
    // Charger les statistiques en parallèle
    const [categoriesResponse, productsResponse, activeProductsResponse, inactiveProductsResponse, ordersResponse, pendingOrdersResponse] = await Promise.all([
      this.getCategories(1, 1),
      this.getProducts(1, 1),
      this.getProducts(1, 1, { status: 'active' }),
      this.getProducts(1, 1, { status: 'inactive' }),
      this.getOrders(1, 1),
      this.getOrders(1, 1, 'pending')
    ]);

    return {
      totalCategories: categoriesResponse.meta.total,
      totalProducts: productsResponse.meta.total,
      activeProducts: activeProductsResponse.meta.total,
      inactiveProducts: inactiveProductsResponse.meta.total,
      totalOrders: ordersResponse.meta.total,
      pendingOrders: pendingOrdersResponse.meta.total,
    };
  }
}

export const adminService = new AdminService();

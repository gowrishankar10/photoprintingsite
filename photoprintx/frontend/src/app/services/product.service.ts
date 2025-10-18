import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  sizes: Array<{
    size: string;
    price: number;
  }>;
  paperTypes: string[];
  imageUrl: string;
  publicId?: string;
  isActive: boolean;
  isPremium: boolean;
  premiumBadge?: 'Perfect Gift' | 'Memories Forever' | 'Love & Care' | 'Special Moments' | 'Heartfelt Gift' | 'Cherished Memories';
  premiumFeatures?: Array<{
    feature: string;
    description: string;
  }>;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getPremiumProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/premium`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?q=${query}`);
  }
}


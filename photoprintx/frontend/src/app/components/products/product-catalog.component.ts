import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <div class="catalog-container">
      <!-- Header Section -->
      <div class="header-section">
        <h1>We3Studio - Product Catalog</h1>
        <p class="header-subtitle">Create lasting memories with personalized gifts for your loved ones</p>
      </div>

      <!-- Most Bought Items Section -->
      <div class="most-bought-section" *ngIf="premiumProducts.length > 0">
        <div class="section-header">
          <h2>
            <mat-icon class="section-icon">trending_up</mat-icon>
            Most Bought Items
          </h2>
          <p class="section-subtitle">Our customers' favorite gifts for special occasions</p>
        </div>
        
        <div class="most-bought-grid">
          <mat-card class="product-card most-bought-card" *ngFor="let product of premiumProducts">
            <div class="premium-badge" [ngClass]="getBadgeClass(product.premiumBadge)">
              {{ product.premiumBadge }}
            </div>
            
            <img mat-card-image [src]="product.imageUrl" [alt]="product.name" class="product-image">
            
            <mat-card-header>
              <mat-card-title>{{ product.name }}</mat-card-title>
            </mat-card-header>
            
            <mat-card-content>
              <p>{{ product.description }}</p>
              
              <div class="premium-features" *ngIf="product.premiumFeatures">
                <h4>Why Customers Love This:</h4>
                <div class="feature-list">
                  <div class="feature-item" *ngFor="let feature of product.premiumFeatures">
                    <mat-icon class="feature-icon">check_circle</mat-icon>
                    <div class="feature-content">
                      <strong>{{ feature.feature }}</strong>
                      <span>{{ feature.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="product-details">
                <p><strong>Category:</strong> {{ product.category }}</p>
                <p><strong>Sizes:</strong> {{ getSizeList(product.sizes) }}</p>
                <p *ngIf="product.paperTypes && product.paperTypes.length > 0">
                  <strong>Paper Types:</strong> {{ product.paperTypes.join(', ') }}
                </p>
              </div>
              
              <div class="pricing-section">
                <div class="price-range" *ngFor="let size of product.sizes">
                  <span class="size">{{ size.size }}:</span>
                  <span class="original-price" *ngIf="product.discountPercentage > 0">
                    ₹{{ size.price.toFixed(2) }}
                  </span>
                  <span class="discounted-price">
                    ₹{{ calculateDiscountedPrice(size.price, product.discountPercentage).toFixed(2) }}
                  </span>
                  <span class="discount-badge" *ngIf="product.discountPercentage > 0">
                    {{ product.discountPercentage }}% OFF
                  </span>
                </div>
              </div>
            </mat-card-content>
            
            <mat-card-actions>
              <button mat-raised-button color="primary" class="order-button">
                <mat-icon>shopping_cart</mat-icon>
                Order Now
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>

      <!-- Category Filter Section -->
      <div class="category-section">
        <div class="section-header">
          <h2>
            <mat-icon class="section-icon">category</mat-icon>
            Browse by Category
          </h2>
          <p class="section-subtitle">Find exactly what you're looking for</p>
        </div>
        
        <div class="category-filter">
          <button
            mat-raised-button
            [color]="selectedCategory === 'All' ? 'primary' : 'basic'"
            (click)="filterByCategory('All')">
            All Products
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Premium' ? 'primary' : 'basic'"
            (click)="filterByCategory('Premium')">
            <mat-icon>favorite</mat-icon> Perfect Gifts
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Photo Prints' ? 'primary' : 'basic'"
            (click)="filterByCategory('Photo Prints')">
            Photo Prints
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Canvas Prints' ? 'primary' : 'basic'"
            (click)="filterByCategory('Canvas Prints')">
            Canvas Prints
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Photo Books' ? 'primary' : 'basic'"
            (click)="filterByCategory('Photo Books')">
            Photo Books
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Calendars' ? 'primary' : 'basic'"
            (click)="filterByCategory('Calendars')">
            Calendars
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Frames' ? 'primary' : 'basic'"
            (click)="filterByCategory('Frames')">
            Frames
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Metal Prints' ? 'primary' : 'basic'"
            (click)="filterByCategory('Metal Prints')">
            Metal Prints
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Acrylic Prints' ? 'primary' : 'basic'"
            (click)="filterByCategory('Acrylic Prints')">
            Acrylic Prints
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Bamboo Prints' ? 'primary' : 'basic'"
            (click)="filterByCategory('Bamboo Prints')">
            Bamboo Prints
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Album Templates' ? 'primary' : 'basic'"
            (click)="filterByCategory('Album Templates')">
            Album Templates
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Wedding Albums' ? 'primary' : 'basic'"
            (click)="filterByCategory('Wedding Albums')">
            Wedding Albums
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Birthday Albums' ? 'primary' : 'basic'"
            (click)="filterByCategory('Birthday Albums')">
            Birthday Albums
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Puberty Albums' ? 'primary' : 'basic'"
            (click)="filterByCategory('Puberty Albums')">
            Puberty Albums
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Mug Printing' ? 'primary' : 'basic'"
            (click)="filterByCategory('Mug Printing')">
            Mug Printing
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'T-shirt Printing' ? 'primary' : 'basic'"
            (click)="filterByCategory('T-shirt Printing')">
            T-shirt Printing
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Keychain Printing' ? 'primary' : 'basic'"
            (click)="filterByCategory('Keychain Printing')">
            Keychain Printing
          </button>
          <button
            mat-raised-button
            [color]="selectedCategory === 'Engraving Works' ? 'primary' : 'basic'"
            (click)="filterByCategory('Engraving Works')">
            Engraving Works
          </button>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div *ngIf="loading" class="spinner-container">
        <mat-spinner></mat-spinner>
        <p>Loading products...</p>
      </div>

      <!-- No Products Message -->
      <div *ngIf="!loading && filteredProducts.length === 0" class="no-products">
        <mat-icon class="empty-icon">inventory_2</mat-icon>
        <h3>No products found</h3>
        <p>Try adjusting your filters or check back later!</p>
      </div>

      <!-- Products Grid Section -->
      <div class="products-section" *ngIf="!loading && filteredProducts.length > 0">
        <div class="section-header">
          <h2>
            <mat-icon class="section-icon">inventory</mat-icon>
            All Products
          </h2>
          <p class="section-subtitle">Complete catalog of our products</p>
        </div>
        
        <div class="products-grid">
          <mat-card class="product-card" *ngFor="let product of filteredProducts">
            <div class="premium-badge" *ngIf="product.isPremium" [ngClass]="getBadgeClass(product.premiumBadge)">
              {{ product.premiumBadge }}
            </div>
            
            <img mat-card-image [src]="product.imageUrl" [alt]="product.name" class="product-image">
            
            <mat-card-header>
              <mat-card-title>{{ product.name }}</mat-card-title>
            </mat-card-header>
            
            <mat-card-content>
              <p>{{ product.description }}</p>
              
              <div class="product-details">
                <p><strong>Category:</strong> {{ product.category }}</p>
                <p><strong>Sizes:</strong> {{ getSizeList(product.sizes) }}</p>
                <p *ngIf="product.paperTypes && product.paperTypes.length > 0">
                  <strong>Paper Types:</strong> {{ product.paperTypes.join(', ') }}
                </p>
              </div>
              
              <div class="pricing-section">
                <div class="price-range" *ngFor="let size of product.sizes">
                  <span class="size">{{ size.size }}:</span>
                  <span class="original-price" *ngIf="product.discountPercentage > 0">
                    ₹{{ size.price.toFixed(2) }}
                  </span>
                  <span class="discounted-price">
                    ₹{{ calculateDiscountedPrice(size.price, product.discountPercentage).toFixed(2) }}
                  </span>
                  <span class="discount-badge" *ngIf="product.discountPercentage > 0">
                    {{ product.discountPercentage }}% OFF
                  </span>
                </div>
              </div>
            </mat-card-content>
            
            <mat-card-actions>
              <button mat-raised-button color="primary" class="order-button">
                <mat-icon>shopping_cart</mat-icon>
                Order Now
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>

      <!-- Customer Reviews Section -->
      <div class="reviews-section">
        <div class="section-header">
          <h2>
            <mat-icon class="section-icon">people</mat-icon>
            What Our Customers Say
          </h2>
          <p class="section-subtitle">Join thousands of happy customers who trust We3Studio</p>
        </div>
        
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <mat-icon class="quote-icon">format_quote</mat-icon>
              <p>"I ordered a canvas print for my parents' anniversary. The quality is amazing and they absolutely loved it! We3Studio made our special moment even more memorable."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">S</div>
              <div class="author-info">
                <h4>Sarah M.</h4>
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <mat-icon class="quote-icon">format_quote</mat-icon>
              <p>"The Tamil wedding album template was perfect for our daughter's wedding. The traditional designs are beautiful and the quality exceeded our expectations."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">R</div>
              <div class="author-info">
                <h4>Rajesh K.</h4>
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <mat-icon class="quote-icon">format_quote</mat-icon>
              <p>"I've been ordering from We3Studio for 2 years now. Their engraving service is fantastic - perfect for personalized gifts. Highly recommended!"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">M</div>
              <div class="author-info">
                <h4>Meera L.</h4>
                <span>Loyal Customer</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="stats-section">
          <div class="stat-item">
            <div class="stat-number">10,000+</div>
            <div class="stat-label">Happy Customers</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50,000+</div>
            <div class="stat-label">Orders Delivered</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">98%</div>
            <div class="stat-label">Customer Satisfaction</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">5★</div>
            <div class="stat-label">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    /* Header Section */
    .header-section {
      text-align: center;
      margin-bottom: 40px;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 15px;
      color: white;
    }

    .header-section h1 {
      font-size: 2.8em;
      margin-bottom: 15px;
      font-weight: bold;
    }

    .header-subtitle {
      font-size: 1.2em;
      opacity: 0.9;
      margin: 0;
    }

    /* Section Headers */
    .section-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .section-header h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2em;
      margin-bottom: 10px;
      color: #2c3e50;
      font-weight: bold;
    }

    .section-icon {
      font-size: 1.2em;
      margin-right: 10px;
      color: #3498db;
    }

    .section-subtitle {
      font-size: 1.1em;
      color: #7f8c8d;
      margin: 0;
    }

    /* Most Bought Section */
    .most-bought-section {
      margin-bottom: 50px;
    }

    .most-bought-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 25px;
    }

    .most-bought-card {
      background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
      border: 2px solid #e9ecef;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    /* Category Section */
    .category-section {
      background: #f8f9fa;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 50px;
    }

    .category-filter {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }

    .category-filter button {
      padding: 8px 16px;
      font-size: 0.9em;
    }

    .category-filter button mat-icon {
      font-size: 16px;
      margin-right: 4px;
    }

    /* Products Section */
    .products-section {
      margin-bottom: 50px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
    }

    /* Reviews Section */
    .reviews-section {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 15px;
      padding: 40px;
      margin-bottom: 40px;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .testimonial-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.2s ease-in-out;
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
    }

    .testimonial-content {
      margin-bottom: 20px;
    }

    .quote-icon {
      color: #3498db;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .testimonial-content p {
      font-style: italic;
      color: #555;
      line-height: 1.6;
      margin: 0;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .author-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(45deg, #3498db, #2980b9);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
    }

    .author-info h4 {
      margin: 0 0 5px 0;
      color: #2c3e50;
      font-size: 16px;
    }

    .author-info span {
      color: #7f8c8d;
      font-size: 14px;
    }

    /* Stats Section */
    .stats-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 30px;
      padding-top: 30px;
      border-top: 2px solid #e9ecef;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 2.5em;
      font-weight: bold;
      color: #3498db;
      margin-bottom: 5px;
    }

    .stat-label {
      color: #7f8c8d;
      font-size: 14px;
      font-weight: 500;
    }

    /* Product Cards */
    .product-card {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      border-radius: 10px;
      overflow: hidden;
    }

    .product-card:hover {
      transform: translateY(-7px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }

    .product-image {
      height: 220px;
      object-fit: cover;
      width: 100%;
    }

    .product-card mat-card-header {
      padding: 16px;
      padding-bottom: 0;
    }

    .product-card mat-card-title {
      font-size: 1.4em;
      font-weight: bold;
      color: #3f51b5;
      line-height: 1.3;
    }

    .product-card mat-card-content {
      flex-grow: 1;
      padding: 16px;
      padding-top: 10px;
      color: #555;
      font-size: 0.95em;
    }

    .product-details p {
      margin: 8px 0;
      font-size: 0.9em;
    }

    .product-details strong {
      color: #333;
    }

    .product-card mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid #eee;
    }

    .order-button {
      padding: 0 20px;
      height: 38px;
      font-size: 0.9em;
    }

    .order-button mat-icon {
      margin-right: 4px;
    }

    /* Premium Badge Styles */
    .premium-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      color: white;
      z-index: 10;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .premium-badge.perfect-gift {
      background: linear-gradient(45deg, #ff6b6b, #ffd93d);
      animation: pulse 2s infinite;
    }

    .premium-badge.memories-forever {
      background: linear-gradient(45deg, #667eea, #764ba2);
    }

    .premium-badge.love-care {
      background: linear-gradient(45deg, #4ecdc4, #44a08d);
    }

    .premium-badge.special-moments {
      background: linear-gradient(45deg, #ff9a9e, #fecfef);
      color: #333;
    }

    .premium-badge.heartfelt-gift {
      background: linear-gradient(45deg, #ff7675, #fd79a8);
    }

    .premium-badge.cherished-memories {
      background: linear-gradient(45deg, #a29bfe, #6c5ce7);
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    /* Premium Features */
    .premium-features {
      margin: 15px 0;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #3f51b5;
    }

    .premium-features h4 {
      margin: 0 0 10px 0;
      color: #3f51b5;
      font-size: 14px;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .feature-icon {
      color: #4caf50;
      font-size: 16px;
      margin-top: 2px;
    }

    .feature-content {
      display: flex;
      flex-direction: column;
    }

    .feature-content strong {
      font-size: 12px;
      color: #333;
    }

    .feature-content span {
      font-size: 11px;
      color: #666;
    }

    /* Pricing Section */
    .pricing-section {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
    }

    .price-range {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .size {
      font-weight: bold;
      color: #333;
      min-width: 50px;
    }

    .original-price {
      text-decoration: line-through;
      color: #999;
      font-size: 12px;
    }

    .discounted-price {
      font-weight: bold;
      color: #e91e63;
      font-size: 16px;
    }

    .discount-badge {
      background: #e91e63;
      color: white;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: bold;
    }

    /* Loading and Empty States */
    .spinner-container, .no-products {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
    }

    .no-products {
      text-align: center;
      padding: 40px 20px;
      color: #666;
    }

    .empty-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: #ccc;
      margin-bottom: 15px;
    }

    .no-products h3 {
      margin-bottom: 10px;
      color: #333;
    }

    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
      .catalog-container {
        padding: 16px;
      }

      .header-section {
        padding: 20px;
      }

      .header-section h1 {
        font-size: 2.2em;
      }

      .section-header h2 {
        font-size: 1.8em;
      }

      .most-bought-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .category-filter {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }

      .category-filter button {
        margin: 2px 0;
        font-size: 14px;
        padding: 8px 12px;
      }

      .products-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .testimonials-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .stats-section {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      .product-image {
        height: 180px;
      }

      .product-card mat-card-title {
        font-size: 1.1em;
      }

      .product-card mat-card-content {
        padding: 12px;
      }

      .premium-features {
        margin: 12px 0;
        padding: 12px;
      }

      .price-range {
        font-size: 13px;
      }

      .order-button {
        font-size: 14px;
        padding: 10px;
      }
    }

    @media (max-width: 480px) {
      .catalog-container {
        padding: 12px;
      }

      .header-section {
        padding: 15px;
      }

      .header-section h1 {
        font-size: 1.8em;
      }

      .section-header h2 {
        font-size: 1.5em;
      }

      .category-filter button {
        font-size: 12px;
        padding: 6px 10px;
      }

      .product-image {
        height: 160px;
      }

      .product-card mat-card-title {
        font-size: 1em;
      }

      .product-card mat-card-content {
        padding: 10px;
      }

      .premium-features {
        padding: 10px;
      }

      .price-range {
        font-size: 12px;
      }

      .order-button {
        font-size: 12px;
        padding: 8px;
      }

      .stats-section {
        grid-template-columns: 1fr;
        gap: 15px;
      }
    }
  `]
})
export class ProductCatalogComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  premiumProducts: Product[] = [];
  selectedCategory = 'All';
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.premiumProducts = products.filter(product => product.isPremium);
        this.filterByCategory('All');
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else if (category === 'Premium') {
      this.filteredProducts = this.premiumProducts;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  getBadgeClass(badge?: string): string {
    if (!badge) return '';
    switch (badge) {
      case 'Perfect Gift':
        return 'perfect-gift';
      case 'Memories Forever':
        return 'memories-forever';
      case 'Love & Care':
        return 'love-care';
      case 'Special Moments':
        return 'special-moments';
      case 'Heartfelt Gift':
        return 'heartfelt-gift';
      case 'Cherished Memories':
        return 'cherished-memories';
      default:
        return '';
    }
  }

  getSizeList(sizes: Array<{size: string, price: number}>): string {
    return sizes.map(s => s.size).join(', ');
  }

  calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
    return originalPrice * (1 - discountPercentage / 100);
  }

  orderProduct(product: Product): void {
    // For now, just show an alert. In a real app, this would navigate to order form
    alert(`Ordering ${product.name}. This feature will be implemented in the order form.`);
  }
}
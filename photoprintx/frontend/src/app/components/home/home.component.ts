import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="home-container">
      <!-- Hero Section with Emotional Trigger -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Preserve Your Precious Memories Forever</h1>
          <p class="hero-subtitle">Don't let your special moments fade away in digital folders. Transform them into beautiful, lasting keepsakes that your family will treasure for generations.</p>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">50,000+</div>
              <div class="stat-label">Memories Preserved</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">10,000+</div>
              <div class="stat-label">Happy Families</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">Customer Satisfaction</div>
            </div>
          </div>
          <div class="hero-actions">
            <button mat-raised-button color="primary" class="cta-button" (click)="goToProducts()">
              <mat-icon>favorite</mat-icon>
              Start Creating Memories
            </button>
            <button mat-stroked-button color="primary" class="secondary-button" (click)="scrollToTestimonials()">
              <mat-icon>people</mat-icon>
              See What Others Say
            </button>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-placeholder">
            <mat-icon class="hero-icon">photo_library</mat-icon>
            <p>Your Beautiful Memories</p>
          </div>
        </div>
      </div>

      <!-- Problem/Solution Section -->
      <div class="problem-solution-section">
        <div class="section-content">
          <h2 class="section-title">Your Photos Deserve Better Than Digital Storage</h2>
          <div class="problem-grid">
            <div class="problem-card">
              <mat-icon class="problem-icon">phone_android</mat-icon>
              <h3>Lost in Digital Folders</h3>
              <p>Your precious photos are buried in phone galleries, never to be seen again. Out of sight, out of mind.</p>
            </div>
            <div class="problem-card">
              <mat-icon class="problem-icon">cloud_off</mat-icon>
              <h3>Risk of Loss</h3>
              <p>Phone crashes, lost devices, corrupted files - your memories could disappear forever in an instant.</p>
            </div>
            <div class="problem-card">
              <mat-icon class="problem-icon">visibility_off</mat-icon>
              <h3>Never Shared</h3>
              <p>Beautiful moments stay hidden, never bringing joy to your family and friends who would love to see them.</p>
            </div>
          </div>
          
          <div class="solution-section">
            <h3 class="solution-title">Transform Your Digital Memories Into Tangible Treasures</h3>
            <div class="solution-grid">
              <div class="solution-card">
                <mat-icon class="solution-icon">home</mat-icon>
                <h4>Display in Your Home</h4>
                <p>Beautiful canvas prints and frames that turn your walls into galleries of love and joy.</p>
              </div>
              <div class="solution-card">
                <mat-icon class="solution-icon">card_giftcard</mat-icon>
                <h4>Perfect Gifts</h4>
                <p>Create personalized gifts that show how much you care - albums, mugs, keychains, and more.</p>
              </div>
              <div class="solution-card">
                <mat-icon class="solution-icon">schedule</mat-icon>
                <h4>Last Forever</h4>
                <p>High-quality materials that preserve your memories for 100+ years, passing them to future generations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Most Popular Products Section -->
      <div class="popular-products-section" *ngIf="premiumProducts.length > 0">
        <div class="section-header">
          <h2 class="section-title">
            <mat-icon class="section-icon">trending_up</mat-icon>
            Most Loved by Our Customers
          </h2>
          <p class="section-subtitle">These products have brought the most joy to families across the country</p>
        </div>
        
        <div class="products-grid">
          <mat-card class="product-card" *ngFor="let product of premiumProducts">
            <div class="premium-badge" [ngClass]="getBadgeClass(product.premiumBadge)">
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
              <button mat-raised-button color="primary" class="order-button" (click)="goToProducts()">
                <mat-icon>shopping_cart</mat-icon>
                Order Now
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>

      <!-- Social Proof Section -->
      <div class="social-proof-section" id="testimonials">
        <div class="section-header">
          <h2 class="section-title">
            <mat-icon class="section-icon">people</mat-icon>
            Real Stories from Real Families
          </h2>
          <p class="section-subtitle">See how We3Studio has helped families preserve their most precious moments</p>
        </div>
        
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <mat-icon class="quote-icon">format_quote</mat-icon>
              <p>"I was skeptical at first, but when I saw my wedding photos as beautiful canvas prints on our wall, I cried tears of joy. My husband said it was the best gift I ever gave him. Now every guest who visits compliments our 'gallery wall'."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">P</div>
              <div class="author-info">
                <h4>Priya Sharma</h4>
                <span>Married 2 years • Mumbai</span>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <mat-icon class="quote-icon">format_quote</mat-icon>
              <p>"My mother's 60th birthday was coming up and I wanted something special. The Tamil wedding album template was perfect! She cried when she saw it and now shows it to everyone who visits. It's become a family heirloom."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">R</div>
              <div class="author-info">
                <h4>Rajesh Kumar</h4>
                <span>Son • Chennai</span>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <mat-icon class="quote-icon">format_quote</mat-icon>
              <p>"I've been ordering from We3Studio for 3 years now. Every birthday, anniversary, and special occasion - they never disappoint. My kids love seeing their photos as actual prints instead of just on screens. It's magical!"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">M</div>
              <div class="author-info">
                <h4>Meera Patel</h4>
                <span>Mother of 2 • Bangalore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Urgency Section -->
      <div class="urgency-section">
        <div class="urgency-content">
          <h2 class="urgency-title">Don't Wait - Your Memories Are Precious</h2>
          <p class="urgency-subtitle">Every day you wait is another day your special moments stay hidden in digital folders. Start preserving them today.</p>
          <div class="urgency-features">
            <div class="urgency-feature">
              <mat-icon class="urgency-icon">local_shipping</mat-icon>
              <span>Free Shipping on Orders Above ₹500</span>
            </div>
            <div class="urgency-feature">
              <mat-icon class="urgency-icon">schedule</mat-icon>
              <span>Express 3-Day Delivery Available</span>
            </div>
            <div class="urgency-feature">
              <mat-icon class="urgency-icon">verified</mat-icon>
              <span>100% Quality Guarantee</span>
            </div>
          </div>
          <button mat-raised-button color="accent" class="urgency-button" (click)="goToProducts()">
            <mat-icon>flash_on</mat-icon>
            Start Creating Memories Now
          </button>
        </div>
      </div>

      <!-- Final CTA Section -->
      <div class="final-cta-section">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Transform Your Digital Photos Into Lasting Treasures?</h2>
          <p class="cta-subtitle">Join thousands of families who have discovered the joy of physical memories</p>
          <div class="cta-buttons">
            <button mat-raised-button color="primary" class="main-cta" (click)="goToProducts()">
              <mat-icon>photo_library</mat-icon>
              Browse Our Products
            </button>
            <button mat-stroked-button color="primary" class="secondary-cta" (click)="scrollToTop()">
              <mat-icon>keyboard_arrow_up</mat-icon>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 0;
      max-width: 100%;
      margin: 0;
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 20px;
      display: flex;
      align-items: center;
      min-height: 70vh;
    }

    .hero-content {
      flex: 1;
      max-width: 600px;
      margin-right: 40px;
    }

    .hero-title {
      font-size: 3.5em;
      font-weight: bold;
      margin-bottom: 20px;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.3em;
      margin-bottom: 40px;
      opacity: 0.9;
      line-height: 1.6;
    }

    .hero-stats {
      display: flex;
      gap: 40px;
      margin-bottom: 40px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 2.5em;
      font-weight: bold;
      color: #ffd700;
    }

    .stat-label {
      font-size: 0.9em;
      opacity: 0.8;
    }

    .hero-actions {
      display: flex;
      gap: 20px;
    }

    .cta-button {
      padding: 15px 30px;
      font-size: 1.1em;
      font-weight: bold;
    }

    .secondary-button {
      padding: 15px 30px;
      font-size: 1.1em;
    }

    .hero-image {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .image-placeholder {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 60px;
      text-align: center;
      backdrop-filter: blur(10px);
    }

    .hero-icon {
      font-size: 4em;
      margin-bottom: 20px;
    }

    /* Problem/Solution Section */
    .problem-solution-section {
      padding: 80px 20px;
      background: #f8f9fa;
    }

    .section-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      text-align: center;
      font-size: 2.5em;
      color: #2c3e50;
      margin-bottom: 60px;
    }

    .problem-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }

    .problem-card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .problem-icon {
      font-size: 3em;
      color: #e74c3c;
      margin-bottom: 20px;
    }

    .problem-card h3 {
      color: #2c3e50;
      margin-bottom: 15px;
    }

    .solution-section {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    .solution-title {
      text-align: center;
      font-size: 2em;
      color: #27ae60;
      margin-bottom: 40px;
    }

    .solution-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    .solution-card {
      text-align: center;
      padding: 20px;
    }

    .solution-icon {
      font-size: 2.5em;
      color: #27ae60;
      margin-bottom: 15px;
    }

    .solution-card h4 {
      color: #2c3e50;
      margin-bottom: 10px;
    }

    /* Popular Products Section */
    .popular-products-section {
      padding: 80px 20px;
      background: white;
    }

    .section-header {
      text-align: center;
      margin-bottom: 50px;
    }

    .section-header h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5em;
      color: #2c3e50;
      margin-bottom: 15px;
    }

    .section-icon {
      font-size: 1.2em;
      margin-right: 10px;
      color: #3498db;
    }

    .section-subtitle {
      font-size: 1.2em;
      color: #7f8c8d;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .product-card {
      position: relative;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      border-radius: 15px;
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-10px);
    }

    .product-image {
      height: 200px;
      object-fit: cover;
      width: 100%;
    }

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
    }

    .premium-badge.perfect-gift {
      background: linear-gradient(45deg, #ff6b6b, #ffd93d);
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

    .product-details p {
      margin: 5px 0;
      font-size: 0.9em;
    }

    .pricing-section {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
    }

    .price-range {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 5px;
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

    .order-button {
      width: 100%;
      padding: 12px;
      font-weight: bold;
    }

    /* Social Proof Section */
    .social-proof-section {
      padding: 80px 20px;
      background: #f8f9fa;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .testimonial-card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .quote-icon {
      color: #3498db;
      font-size: 2em;
      margin-bottom: 15px;
    }

    .testimonial-content p {
      font-style: italic;
      color: #555;
      line-height: 1.6;
      margin-bottom: 20px;
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
    }

    .author-info span {
      color: #7f8c8d;
      font-size: 14px;
    }

    /* Urgency Section */
    .urgency-section {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
      padding: 60px 20px;
      text-align: center;
    }

    .urgency-title {
      font-size: 2.5em;
      margin-bottom: 20px;
    }

    .urgency-subtitle {
      font-size: 1.2em;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .urgency-features {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .urgency-feature {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .urgency-icon {
      color: #ffd700;
    }

    .urgency-button {
      padding: 15px 40px;
      font-size: 1.2em;
      font-weight: bold;
    }

    /* Final CTA Section */
    .final-cta-section {
      background: #2c3e50;
      color: white;
      padding: 80px 20px;
      text-align: center;
    }

    .cta-title {
      font-size: 2.8em;
      margin-bottom: 20px;
    }

    .cta-subtitle {
      font-size: 1.3em;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .main-cta {
      padding: 20px 40px;
      font-size: 1.2em;
      font-weight: bold;
    }

    .secondary-cta {
      padding: 20px 40px;
      font-size: 1.2em;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 40px 20px;
      }

      .hero-content {
        margin-right: 0;
        margin-bottom: 40px;
      }

      .hero-title {
        font-size: 2.5em;
      }

      .hero-stats {
        flex-direction: column;
        gap: 20px;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;
      }

      .section-title {
        font-size: 2em;
      }

      .problem-grid {
        grid-template-columns: 1fr;
      }

      .solution-grid {
        grid-template-columns: 1fr;
      }

      .urgency-features {
        flex-direction: column;
        gap: 20px;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }

      .cta-title {
        font-size: 2.2em;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  premiumProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPremiumProducts();
  }

  loadPremiumProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.premiumProducts = products.filter(product => product.isPremium).slice(0, 3);
      },
      error: (error) => {
        console.error('Error loading premium products:', error);
      }
    });
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

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  scrollToTestimonials(): void {
    const element = document.getElementById('testimonials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

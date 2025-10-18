import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface OrderItem {
  fileName: string;
  size: string;
  paperType: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  publicId?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  customerEmail: string;
  customerName: string;
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="order-confirmation-container">
      <div class="confirmation-header">
        <mat-icon class="success-icon">check_circle</mat-icon>
        <h1>Order Confirmed!</h1>
        <p class="subtitle">Thank you for your order with We3Studio</p>
      </div>

      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading order details...</p>
      </div>

      <div *ngIf="!loading && order" class="order-details">
        <mat-card class="order-card">
          <mat-card-header>
            <mat-card-title>Order Details</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="order-info">
              <div class="info-row">
                <span class="label">Order Number:</span>
                <span class="value">{{ order.orderNumber }}</span>
              </div>
              <div class="info-row">
                <span class="label">Order Date:</span>
                <span class="value">{{ formatDate(order.createdAt) }}</span>
              </div>
              <div class="info-row">
                <span class="label">Status:</span>
                <span class="value status" [ngClass]="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
              </div>
              <div class="info-row">
                <span class="label">Customer:</span>
                <span class="value">{{ order.customerName }}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">{{ order.customerEmail }}</span>
              </div>
            </div>

            <mat-divider></mat-divider>

            <div class="order-items">
              <h3>Order Items</h3>
              <div class="item" *ngFor="let item of order.items">
                <div class="item-details">
                  <div class="item-image" *ngIf="item.imageUrl">
                    <img [src]="item.imageUrl" [alt]="item.fileName" class="product-image">
                  </div>
                  <div class="item-info">
                    <span class="item-name">{{ item.fileName }}</span>
                    <span class="item-specs">{{ item.size }} • {{ item.paperType }}</span>
                  </div>
                  <div class="item-quantity">
                    <span>Qty: {{ item.quantity }}</span>
                  </div>
                  <div class="item-price">
                    <span>₹{{ (item.price * item.quantity).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <mat-divider></mat-divider>

            <div class="order-total">
              <div class="total-row">
                <span class="total-label">Total Amount:</span>
                <span class="total-amount">₹{{ order.totalAmount.toFixed(2) }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <div class="action-buttons">
          <button mat-raised-button color="primary" (click)="goToProducts()">
            <mat-icon>shopping_bag</mat-icon>
            Continue Shopping
          </button>
          <button mat-raised-button color="accent" (click)="downloadReceipt()">
            <mat-icon>download</mat-icon>
            Download Receipt
          </button>
        </div>

        <div class="next-steps">
          <mat-card class="info-card">
            <mat-card-header>
              <mat-card-title>What's Next?</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="steps">
                <div class="step">
                  <mat-icon class="step-icon">email</mat-icon>
                  <div class="step-content">
                    <h4>Email Confirmation</h4>
                    <p>You'll receive an email confirmation shortly with your order details.</p>
                  </div>
                </div>
                <div class="step">
                  <mat-icon class="step-icon">schedule</mat-icon>
                  <div class="step-content">
                    <h4>Processing</h4>
                    <p>We'll process your order within 1-2 business days.</p>
                  </div>
                </div>
                <div class="step">
                  <mat-icon class="step-icon">local_shipping</mat-icon>
                  <div class="step-content">
                    <h4>Shipping</h4>
                    <p>Your order will be shipped and you'll receive tracking information.</p>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div *ngIf="!loading && !order" class="error-container">
        <mat-icon class="error-icon">error</mat-icon>
        <h2>Order Not Found</h2>
        <p>We couldn't find the order details. Please contact support if you continue to have issues.</p>
        <button mat-raised-button color="primary" (click)="goToProducts()">
          Go to Products
        </button>
      </div>
    </div>
  `,
  styles: [`
    .order-confirmation-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .confirmation-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .success-icon {
      font-size: 64px;
      color: #4CAF50;
      margin-bottom: 16px;
    }

    .confirmation-header h1 {
      color: #4CAF50;
      margin-bottom: 8px;
    }

    .subtitle {
      color: #666;
      font-size: 1.1em;
    }

    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
    }

    .error-icon {
      font-size: 64px;
      color: #f44336;
      margin-bottom: 16px;
    }

    .order-card {
      margin-bottom: 20px;
    }

    .order-info {
      margin-bottom: 20px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .label {
      font-weight: 500;
      color: #666;
    }

    .value {
      font-weight: 600;
    }

    .status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9em;
    }

    .status.confirmed {
      background-color: #e8f5e8;
      color: #2e7d32;
    }

    .status.processing {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .order-items h3 {
      margin-bottom: 16px;
      color: #333;
    }

    .item {
      margin-bottom: 12px;
    }

    .item-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background-color: #f5f5f5;
      border-radius: 8px;
      gap: 16px;
    }

    .item-image {
      flex-shrink: 0;
    }

    .product-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
      border: 2px solid #e0e0e0;
    }

    .item-info {
      flex: 1;
    }

    .item-name {
      display: block;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .item-specs {
      font-size: 0.9em;
      color: #666;
    }

    .item-quantity {
      margin-right: 16px;
      color: #666;
    }

    .item-price {
      font-weight: 600;
      color: #333;
    }

    .order-total {
      margin-top: 20px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: #e3f2fd;
      border-radius: 8px;
    }

    .total-label {
      font-size: 1.2em;
      font-weight: 600;
    }

    .total-amount {
      font-size: 1.4em;
      font-weight: 700;
      color: #1976d2;
    }

    .action-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin: 30px 0;
    }

    .action-buttons button {
      min-width: 180px;
    }

    .next-steps {
      margin-top: 30px;
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .step {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .step-icon {
      color: #1976d2;
      margin-top: 4px;
    }

    .step-content h4 {
      margin: 0 0 4px 0;
      color: #333;
    }

    .step-content p {
      margin: 0;
      color: #666;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .order-confirmation-container {
        padding: 16px;
      }

      .action-buttons {
        flex-direction: column;
        align-items: center;
      }

      .action-buttons button {
        width: 100%;
        max-width: 300px;
      }

      .item-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .item-quantity {
        margin-right: 0;
      }
    }
  `]
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get order data from route state or query params
    this.route.queryParams.subscribe(params => {
      const orderData = params['order'];
      if (orderData) {
        try {
          this.order = JSON.parse(decodeURIComponent(orderData));
          this.loading = false;
        } catch (error) {
          console.error('Error parsing order data:', error);
          this.loading = false;
        }
      } else {
        // If no order data, create a mock order for demonstration
        this.createMockOrder();
      }
    });
  }

  private createMockOrder(): void {
    // Create a mock order for demonstration purposes
    this.order = {
      _id: 'mock_order_123',
      orderNumber: 'WS' + Date.now().toString().slice(-6),
      items: [
        {
          fileName: 'family_photo.jpg',
          size: '8x10',
          paperType: 'Matte',
          quantity: 2,
          price: 15.00,
          imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&crop=center'
        },
        {
          fileName: 'vacation_sunset.jpg',
          size: '12x16',
          paperType: 'Glossy',
          quantity: 1,
          price: 25.00,
          imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center'
        },
        {
          fileName: 'wedding_memory.jpg',
          size: 'A4',
          paperType: 'Matte',
          quantity: 1,
          price: 20.00,
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center'
        }
      ],
      totalAmount: 75.00,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      customerEmail: 'customer@example.com',
      customerName: 'John Doe'
    };
    this.loading = false;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  downloadReceipt(): void {
    if (!this.order) return;

    // Create a simple receipt text
    const receipt = `
We3Studio - Order Receipt
========================

Order Number: ${this.order.orderNumber}
Order Date: ${this.formatDate(this.order.createdAt)}
Customer: ${this.order.customerName}
Email: ${this.order.customerEmail}

Items:
${this.order.items.map(item => 
  `- ${item.fileName} (${item.size}, ${item.paperType}) x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}${item.imageUrl ? `\n  Image: ${item.imageUrl}` : ''}`
).join('\n')}

Total Amount: ₹${this.order.totalAmount.toFixed(2)}

Thank you for choosing We3Studio!
    `.trim();

    // Create and download the file
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `We3Studio_Receipt_${this.order.orderNumber}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}

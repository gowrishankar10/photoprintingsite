import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-product-preview-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="product-preview-dialog">
      <h2 mat-dialog-title>
        <mat-icon>preview</mat-icon>
        Product Preview
      </h2>

      <mat-dialog-content class="preview-content">
        <div class="preview-container">
          <!-- Product Image -->
          <div class="product-image-section">
            <img [src]="productData.imageUrl" [alt]="productData.name" class="product-image">
            <div class="product-badges">
              <mat-chip *ngIf="productData.isPremium" class="premium-chip">
                {{ productData.premiumBadge || 'Premium' }}
              </mat-chip>
              <mat-chip *ngIf="productData.discountPercentage > 0" class="discount-chip">
                {{ productData.discountPercentage }}% OFF
              </mat-chip>
            </div>
          </div>

          <!-- Product Details -->
          <div class="product-details-section">
            <h3 class="product-name">{{ productData.name }}</h3>
            <p class="product-category">{{ productData.category }}</p>
            <p class="product-description">{{ productData.description }}</p>

            <!-- Sizes and Pricing -->
            <div class="sizes-section">
              <h4>Sizes & Pricing:</h4>
              <div class="sizes-list">
                <div class="size-item" *ngFor="let size of productData.sizes">
                  <span class="size-name">{{ size.size }}</span>
                  <span class="size-price">
                    <span class="original-price" *ngIf="productData.discountPercentage > 0">
                      ₹{{ size.price.toFixed(2) }}
                    </span>
                    <span class="discounted-price">
                      ₹{{ calculateDiscountedPrice(size.price, productData.discountPercentage).toFixed(2) }}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Paper Types -->
            <div class="paper-types-section" *ngIf="productData.paperTypes && productData.paperTypes.length > 0">
              <h4>Paper Types:</h4>
              <div class="paper-types-list">
                <mat-chip *ngFor="let paperType of productData.paperTypes" class="paper-type-chip">
                  {{ paperType }}
                </mat-chip>
              </div>
            </div>

            <!-- Category-Specific Fields -->
            <div class="category-specific-section" *ngIf="hasCategorySpecificFields()">
              <h4>{{ productData.category }} Specifications:</h4>
              <div class="specifications-grid">
                
                <!-- Frame Specifications -->
                <div *ngIf="productData.category === 'Frames'" class="frame-specs">
                  <div class="spec-item" *ngIf="productData.frameMaterial">
                    <strong>Material:</strong> {{ productData.frameMaterial }}
                  </div>
                  <div class="spec-item" *ngIf="productData.frameColor">
                    <strong>Color:</strong> {{ productData.frameColor }}
                  </div>
                  <div class="spec-item" *ngIf="productData.frameStyle">
                    <strong>Style:</strong> {{ productData.frameStyle }}
                  </div>
                  <div class="spec-item" *ngIf="productData.mountIncluded">
                    <strong>Mount:</strong> {{ productData.mountIncluded }}
                  </div>
                </div>

                <!-- Canvas Specifications -->
                <div *ngIf="productData.category === 'Canvas Prints'" class="canvas-specs">
                  <div class="spec-item" *ngIf="productData.canvasType">
                    <strong>Canvas Type:</strong> {{ productData.canvasType }}
                  </div>
                  <div class="spec-item" *ngIf="productData.galleryWrap">
                    <strong>Gallery Wrap:</strong> {{ productData.galleryWrap }}
                  </div>
                  <div class="spec-item" *ngIf="productData.finishType">
                    <strong>Finish:</strong> {{ productData.finishType }}
                  </div>
                  <div class="spec-item" *ngIf="productData.uvProtection">
                    <strong>UV Protection:</strong> {{ productData.uvProtection }}
                  </div>
                </div>

                <!-- Mug Specifications -->
                <div *ngIf="productData.category === 'Mug Printing'" class="mug-specs">
                  <div class="spec-item" *ngIf="productData.mugMaterial">
                    <strong>Material:</strong> {{ productData.mugMaterial }}
                  </div>
                  <div class="spec-item" *ngIf="productData.mugColor">
                    <strong>Color:</strong> {{ productData.mugColor }}
                  </div>
                  <div class="spec-item" *ngIf="productData.printArea">
                    <strong>Print Area:</strong> {{ productData.printArea }}
                  </div>
                  <div class="spec-item" *ngIf="productData.dishwasherSafe">
                    <strong>Dishwasher Safe:</strong> {{ productData.dishwasherSafe }}
                  </div>
                </div>

                <!-- T-shirt Specifications -->
                <div *ngIf="productData.category === 'T-shirt Printing'" class="tshirt-specs">
                  <div class="spec-item" *ngIf="productData.fabricType">
                    <strong>Fabric:</strong> {{ productData.fabricType }}
                  </div>
                  <div class="spec-item" *ngIf="productData.printMethod">
                    <strong>Print Method:</strong> {{ productData.printMethod }}
                  </div>
                  <div class="spec-item" *ngIf="productData.printLocation">
                    <strong>Print Location:</strong> {{ productData.printLocation }}
                  </div>
                  <div class="spec-item" *ngIf="productData.washCare">
                    <strong>Wash Care:</strong> {{ productData.washCare }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Premium Features -->
            <div class="premium-features-section" *ngIf="productData.isPremium && productData.premiumBadge">
              <h4>Premium Features:</h4>
              <div class="premium-badge-display">
                <mat-chip class="premium-badge-chip">{{ productData.premiumBadge }}</mat-chip>
              </div>
              <div class="discount-info" *ngIf="productData.discountPercentage > 0">
                <p><strong>Special Discount:</strong> {{ productData.discountPercentage }}% off on all sizes!</p>
              </div>
            </div>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions class="preview-actions">
        <button mat-button (click)="onClose()">Close Preview</button>
        <button mat-raised-button color="primary" (click)="onSave()">
          <mat-icon>save</mat-icon>
          Save Product
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .product-preview-dialog {
      max-width: 800px;
      width: 100%;
    }

    .preview-content {
      max-height: 70vh;
      overflow-y: auto;
      padding: 20px;
    }

    .preview-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    .product-image-section {
      position: relative;
    }

    .product-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .product-badges {
      position: absolute;
      top: 15px;
      right: 15px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .premium-chip {
      background: linear-gradient(45deg, #ff6b6b, #ffd93d);
      color: white;
      font-weight: bold;
    }

    .discount-chip {
      background: #e91e63;
      color: white;
      font-weight: bold;
    }

    .product-details-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .product-name {
      font-size: 1.8em;
      font-weight: bold;
      color: #2c3e50;
      margin: 0;
    }

    .product-category {
      color: #3498db;
      font-weight: bold;
      font-size: 1.1em;
      margin: 0;
    }

    .product-description {
      color: #7f8c8d;
      line-height: 1.6;
      margin: 0;
    }

    .sizes-section,
    .paper-types-section,
    .category-specific-section,
    .premium-features-section {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
      background: #f9f9f9;
    }

    .sizes-section h4,
    .paper-types-section h4,
    .category-specific-section h4,
    .premium-features-section h4 {
      margin: 0 0 15px 0;
      color: #2c3e50;
      font-size: 1.1em;
    }

    .sizes-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .size-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: white;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
    }

    .size-name {
      font-weight: bold;
      color: #2c3e50;
    }

    .size-price {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .original-price {
      text-decoration: line-through;
      color: #999;
      font-size: 0.9em;
    }

    .discounted-price {
      font-weight: bold;
      color: #e91e63;
      font-size: 1.1em;
    }

    .paper-types-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .paper-type-chip {
      background: #ecf0f1;
      color: #2c3e50;
    }

    .specifications-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .spec-item {
      padding: 8px 12px;
      background: white;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
      font-size: 0.9em;
    }

    .spec-item strong {
      color: #2c3e50;
    }

    .premium-badge-display {
      margin-bottom: 15px;
    }

    .premium-badge-chip {
      background: linear-gradient(45deg, #ff6b6b, #ffd93d);
      color: white;
      font-weight: bold;
      font-size: 1.1em;
    }

    .discount-info {
      background: #e8f5e8;
      padding: 12px;
      border-radius: 6px;
      border-left: 4px solid #4caf50;
    }

    .discount-info p {
      margin: 0;
      color: #2e7d32;
      font-weight: bold;
    }

    .preview-actions {
      padding: 20px;
      border-top: 1px solid #e0e0e0;
      justify-content: flex-end;
      gap: 10px;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .preview-container {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .specifications-grid {
        grid-template-columns: 1fr;
      }

      .product-image {
        height: 250px;
      }
    }
  `]
})
export class ProductPreviewDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ProductPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productData: any
  ) {}

  calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
    return originalPrice * (1 - discountPercentage / 100);
  }

  hasCategorySpecificFields(): boolean {
    const category = this.productData.category;
    return (
      (category === 'Frames' && (this.productData.frameMaterial || this.productData.frameColor || this.productData.frameStyle || this.productData.mountIncluded)) ||
      (category === 'Canvas Prints' && (this.productData.canvasType || this.productData.galleryWrap || this.productData.finishType || this.productData.uvProtection)) ||
      (category === 'Mug Printing' && (this.productData.mugMaterial || this.productData.mugColor || this.productData.printArea || this.productData.dishwasherSafe)) ||
      (category === 'T-shirt Printing' && (this.productData.fabricType || this.productData.printMethod || this.productData.printLocation || this.productData.washCare))
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close('save');
  }
}

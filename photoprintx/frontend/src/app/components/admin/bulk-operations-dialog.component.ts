import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

interface BulkOperationData {
  operation: string;
  selectedProducts: any[];
}

@Component({
  selector: 'app-bulk-operations-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTableModule,
    MatChipsModule
  ],
  template: `
    <div class="bulk-operations-dialog">
      <h2 mat-dialog-title>
        <mat-icon>batch_prediction</mat-icon>
        Bulk Operations
      </h2>

      <mat-dialog-content class="dialog-content">
        <div class="operation-info">
          <p><strong>{{ data.selectedProducts.length }}</strong> products selected for bulk operation</p>
        </div>

        <!-- Selected Products List -->
        <div class="selected-products-section">
          <h3>Selected Products:</h3>
          <div class="products-list">
            <mat-chip *ngFor="let product of data.selectedProducts" class="product-chip">
              {{ product.name }}
            </mat-chip>
          </div>
        </div>

        <!-- Bulk Category Update -->
        <div *ngIf="data.operation === 'category'" class="operation-section">
          <h3>Update Category</h3>
          <form [formGroup]="categoryForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>New Category</mat-label>
              <mat-select formControlName="newCategory">
                <mat-option value="Photo Prints">Photo Prints</mat-option>
                <mat-option value="Canvas Prints">Canvas Prints</mat-option>
                <mat-option value="Photo Books">Photo Books</mat-option>
                <mat-option value="Calendars">Calendars</mat-option>
                <mat-option value="Frames">Frames</mat-option>
                <mat-option value="Albums">Albums</mat-option>
                <mat-option value="Metal Prints">Metal Prints</mat-option>
                <mat-option value="Acrylic Prints">Acrylic Prints</mat-option>
                <mat-option value="Bamboo Prints">Bamboo Prints</mat-option>
                <mat-option value="Album Templates">Album Templates</mat-option>
                <mat-option value="Wedding Albums">Wedding Albums</mat-option>
                <mat-option value="Birthday Albums">Birthday Albums</mat-option>
                <mat-option value="Puberty Albums">Puberty Albums</mat-option>
                <mat-option value="Mug Printing">Mug Printing</mat-option>
                <mat-option value="T-shirt Printing">T-shirt Printing</mat-option>
                <mat-option value="Keychain Printing">Keychain Printing</mat-option>
                <mat-option value="Engraving Works">Engraving Works</mat-option>
              </mat-select>
              <mat-error *ngIf="categoryForm.get('newCategory')?.hasError('required')">
                Please select a category
              </mat-error>
            </mat-form-field>
          </form>
        </div>

        <!-- Bulk Pricing Update -->
        <div *ngIf="data.operation === 'pricing'" class="operation-section">
          <h3>Update Pricing</h3>
          <form [formGroup]="pricingForm">
            <div class="pricing-options">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Price Adjustment</mat-label>
                <mat-select formControlName="adjustmentType">
                  <mat-option value="percentage">Percentage</mat-option>
                  <mat-option value="fixed">Fixed Amount</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Value</mat-label>
                <input matInput formControlName="adjustmentValue" type="number" placeholder="Enter value">
                <span matSuffix *ngIf="pricingForm.get('adjustmentType')?.value === 'percentage'">%</span>
                <span matSuffix *ngIf="pricingForm.get('adjustmentType')?.value === 'fixed'">₹</span>
              </mat-form-field>
            </div>

            <div class="pricing-preview" *ngIf="pricingForm.valid">
              <h4>Price Preview:</h4>
              <div class="preview-item" *ngFor="let product of data.selectedProducts">
                <strong>{{ product.name }}:</strong>
                <div class="price-changes" *ngFor="let size of product.sizes">
                  {{ size.size }}: ₹{{ size.price.toFixed(2) }} → ₹{{ calculateNewPrice(size.price).toFixed(2) }}
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Bulk Premium Toggle -->
        <div *ngIf="data.operation === 'premium'" class="operation-section">
          <h3>Toggle Premium Status</h3>
          <form [formGroup]="premiumForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Premium Status</mat-label>
              <mat-select formControlName="premiumStatus">
                <mat-option value="enable">Enable Premium</mat-option>
                <mat-option value="disable">Disable Premium</mat-option>
                <mat-option value="toggle">Toggle Current Status</mat-option>
              </mat-select>
            </mat-form-field>

            <div *ngIf="premiumForm.get('premiumStatus')?.value === 'enable'" class="premium-settings">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Premium Badge</mat-label>
                <mat-select formControlName="premiumBadge">
                  <mat-option value="Perfect Gift">Perfect Gift</mat-option>
                  <mat-option value="Memories Forever">Memories Forever</mat-option>
                  <mat-option value="Love & Care">Love & Care</mat-option>
                  <mat-option value="Special Moments">Special Moments</mat-option>
                  <mat-option value="Heartfelt Gift">Heartfelt Gift</mat-option>
                  <mat-option value="Cherished Memories">Cherished Memories</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Discount Percentage</mat-label>
                <input matInput formControlName="discountPercentage" type="number" min="0" max="100">
              </mat-form-field>
            </div>
          </form>
        </div>

        <!-- Bulk Delete Confirmation -->
        <div *ngIf="data.operation === 'delete'" class="operation-section delete-section">
          <h3>⚠️ Delete Products</h3>
          <div class="warning-message">
            <mat-icon color="warn">warning</mat-icon>
            <p><strong>Warning:</strong> This action cannot be undone. The following products will be permanently deleted:</p>
          </div>
          
          <div class="products-to-delete">
            <div class="product-item" *ngFor="let product of data.selectedProducts">
              <mat-icon>inventory</mat-icon>
              <span>{{ product.name }}</span>
              <span class="category">{{ product.category }}</span>
            </div>
          </div>

          <div class="confirmation-checkbox">
            <mat-checkbox [(ngModel)]="confirmDelete">
              I understand that this action cannot be undone
            </mat-checkbox>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button 
                color="primary" 
                (click)="onApply()" 
                [disabled]="!isFormValid()"
                *ngIf="data.operation !== 'delete'">
          <mat-icon>check</mat-icon>
          Apply Changes
        </button>
        <button mat-raised-button 
                color="warn" 
                (click)="onDelete()" 
                [disabled]="!confirmDelete"
                *ngIf="data.operation === 'delete'">
          <mat-icon>delete</mat-icon>
          Delete Products
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .bulk-operations-dialog {
      max-width: 700px;
      width: 100%;
    }

    .dialog-content {
      max-height: 70vh;
      overflow-y: auto;
      padding: 20px;
    }

    .operation-info {
      background: #e3f2fd;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #2196f3;
    }

    .operation-info p {
      margin: 0;
      color: #1976d2;
      font-size: 1.1em;
    }

    .selected-products-section {
      margin-bottom: 25px;
    }

    .selected-products-section h3 {
      color: #2c3e50;
      margin-bottom: 10px;
    }

    .products-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .product-chip {
      background: #f0f0f0;
      color: #2c3e50;
    }

    .operation-section {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .operation-section h3 {
      margin-top: 0;
      color: #2c3e50;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 10px;
    }

    .form-field {
      width: 100%;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .pricing-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }

    .pricing-preview {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .pricing-preview h4 {
      margin-top: 0;
      color: #2c3e50;
    }

    .preview-item {
      margin-bottom: 10px;
    }

    .price-changes {
      margin-left: 20px;
      font-size: 0.9em;
      color: #666;
    }

    .premium-settings {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 15px;
    }

    .delete-section {
      background: #ffebee;
      border-color: #f44336;
    }

    .warning-message {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #fff3e0;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #ff9800;
    }

    .warning-message p {
      margin: 0;
      color: #e65100;
    }

    .products-to-delete {
      background: white;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }

    .product-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .product-item:last-child {
      border-bottom: none;
    }

    .product-item .category {
      color: #666;
      font-size: 0.9em;
      margin-left: auto;
    }

    .confirmation-checkbox {
      margin-top: 15px;
    }

    .dialog-actions {
      padding: 20px;
      border-top: 1px solid #e0e0e0;
      justify-content: flex-end;
      gap: 10px;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .pricing-options {
        grid-template-columns: 1fr;
      }

      .premium-settings {
        grid-template-columns: 1fr;
      }

      .products-list {
        flex-direction: column;
      }
    }
  `]
})
export class BulkOperationsDialogComponent {
  categoryForm: FormGroup;
  pricingForm: FormGroup;
  premiumForm: FormGroup;
  confirmDelete = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BulkOperationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BulkOperationData,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      newCategory: ['', Validators.required]
    });

    this.pricingForm = this.fb.group({
      adjustmentType: ['percentage', Validators.required],
      adjustmentValue: ['', [Validators.required, Validators.min(0.01)]]
    });

    this.premiumForm = this.fb.group({
      premiumStatus: ['toggle', Validators.required],
      premiumBadge: [''],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  calculateNewPrice(originalPrice: number): number {
    const adjustmentType = this.pricingForm.get('adjustmentType')?.value;
    const adjustmentValue = this.pricingForm.get('adjustmentValue')?.value;
    
    if (!adjustmentValue) return originalPrice;
    
    if (adjustmentType === 'percentage') {
      return originalPrice * (1 + adjustmentValue / 100);
    } else {
      return originalPrice + adjustmentValue;
    }
  }

  isFormValid(): boolean {
    switch (this.data.operation) {
      case 'category':
        return this.categoryForm.valid;
      case 'pricing':
        return this.pricingForm.valid;
      case 'premium':
        return this.premiumForm.valid;
      default:
        return false;
    }
  }

  onApply(): void {
    const result = {
      operation: this.data.operation,
      products: this.data.selectedProducts,
      data: {}
    };

    switch (this.data.operation) {
      case 'category':
        result.data = this.categoryForm.value;
        break;
      case 'pricing':
        result.data = this.pricingForm.value;
        break;
      case 'premium':
        result.data = this.premiumForm.value;
        break;
    }

    this.dialogRef.close(result);
  }

  onDelete(): void {
    if (this.confirmDelete) {
      this.dialogRef.close({
        operation: 'delete',
        products: this.data.selectedProducts
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

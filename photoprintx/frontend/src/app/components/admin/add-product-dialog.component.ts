import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductPreviewDialogComponent } from './product-preview-dialog.component';

interface ProductTemplate {
  category: string;
  name: string;
  description: string;
  sizes: Array<{size: string, price: number}>;
  paperTypes: string[];
  imageUrl: string;
  isPremium: boolean;
  premiumBadge?: string;
  discountPercentage: number;
  categorySpecificFields: any;
}

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule
  ],
  template: `
    <div class="add-product-dialog">
      <h2 mat-dialog-title>
        <mat-icon>add</mat-icon>
        Add New Product
      </h2>

      <mat-dialog-content class="dialog-content">
        <form [formGroup]="productForm" class="product-form">
          <!-- Category Selection -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Product Category</mat-label>
            <mat-select formControlName="category" (selectionChange)="onCategoryChange()">
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
            <mat-error *ngIf="productForm.get('category')?.hasError('required')">
              Category is required
            </mat-error>
          </mat-form-field>

          <!-- Basic Product Information -->
          <div class="form-row">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Product Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter product name">
              <mat-error *ngIf="productForm.get('name')?.hasError('required')">
                Product name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Image URL</mat-label>
              <input matInput formControlName="imageUrl" placeholder="Enter image URL">
              <mat-error *ngIf="productForm.get('imageUrl')?.hasError('required')">
                Image URL is required
              </mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Product Description</mat-label>
            <textarea matInput formControlName="description" rows="3" placeholder="Enter product description"></textarea>
            <mat-error *ngIf="productForm.get('description')?.hasError('required')">
              Description is required
            </mat-error>
          </mat-form-field>

          <!-- Category-Specific Templates -->
          <div class="template-section" *ngIf="selectedTemplate">
            <h3>Category Template: {{ selectedTemplate.category }}</h3>
            <p class="template-description">{{ getCategoryDescription(selectedTemplate.category) }}</p>
            
            <button mat-stroked-button (click)="applyTemplate()" class="apply-template-btn">
              <mat-icon>auto_fix_high</mat-icon>
              Apply Template
            </button>
          </div>

          <!-- Sizes and Pricing -->
          <div class="sizes-section">
            <h3>Sizes and Pricing</h3>
            <div formArrayName="sizes">
              <div *ngFor="let size of sizesArray.controls; let i = index" [formGroupName]="i" class="size-row">
                <mat-form-field appearance="outline" class="size-field">
                  <mat-label>Size</mat-label>
                  <input matInput formControlName="size" placeholder="e.g., 8x10, A4, Large">
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="price-field">
                  <mat-label>Price (₹)</mat-label>
                  <input matInput formControlName="price" type="number" min="0" step="0.01">
                </mat-form-field>
                
                <button mat-icon-button (click)="removeSize(i)" color="warn" matTooltip="Remove Size">
                  <mat-icon>remove</mat-icon>
                </button>
              </div>
            </div>
            
            <button mat-button (click)="addSize()" class="add-size-btn">
              <mat-icon>add</mat-icon>
              Add Size
            </button>
          </div>

          <!-- Paper Types (for applicable categories) -->
          <div class="paper-types-section" *ngIf="showPaperTypes()">
            <h3>Paper Types</h3>
            <div formArrayName="paperTypes">
              <div *ngFor="let paperType of paperTypesArray.controls; let i = index" class="paper-type-row">
                <mat-form-field appearance="outline" class="paper-type-field">
                  <mat-label>Paper Type</mat-label>
                  <input matInput [formControl]="$any(paperType)" placeholder="e.g., Matte, Glossy, Satin">
                </mat-form-field>
                
                <button mat-icon-button (click)="removePaperType(i)" color="warn" matTooltip="Remove Paper Type">
                  <mat-icon>remove</mat-icon>
                </button>
              </div>
            </div>
            
            <button mat-button (click)="addPaperType()" class="add-paper-type-btn">
              <mat-icon>add</mat-icon>
              Add Paper Type
            </button>
          </div>

          <!-- Category-Specific Fields -->
          <div class="category-specific-section" *ngIf="showCategorySpecificFields()">
            <h3>{{ selectedTemplate?.category }} Specific Fields</h3>
            
            <!-- Frame Specific Fields -->
            <div *ngIf="selectedTemplate?.category === 'Frames'" class="frame-fields">
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Frame Material</mat-label>
                  <mat-select formControlName="frameMaterial">
                    <mat-option value="Wood">Wood</mat-option>
                    <mat-option value="Metal">Metal</mat-option>
                    <mat-option value="Plastic">Plastic</mat-option>
                    <mat-option value="Glass">Glass</mat-option>
                    <mat-option value="Bamboo">Bamboo</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Frame Color</mat-label>
                  <mat-select formControlName="frameColor">
                    <mat-option value="Black">Black</mat-option>
                    <mat-option value="White">White</mat-option>
                    <mat-option value="Brown">Brown</mat-option>
                    <mat-option value="Gold">Gold</mat-option>
                    <mat-option value="Silver">Silver</mat-option>
                    <mat-option value="Natural">Natural</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Frame Style</mat-label>
                  <mat-select formControlName="frameStyle">
                    <mat-option value="Classic">Classic</mat-option>
                    <mat-option value="Modern">Modern</mat-option>
                    <mat-option value="Vintage">Vintage</mat-option>
                    <mat-option value="Minimalist">Minimalist</mat-option>
                    <mat-option value="Ornate">Ornate</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Mount Included</mat-label>
                  <mat-select formControlName="mountIncluded">
                    <mat-option value="Yes">Yes</mat-option>
                    <mat-option value="No">No</mat-option>
                    <mat-option value="Optional">Optional</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <!-- Canvas Print Specific Fields -->
            <div *ngIf="selectedTemplate?.category === 'Canvas Prints'" class="canvas-fields">
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Canvas Type</mat-label>
                  <mat-select formControlName="canvasType">
                    <mat-option value="Cotton">Cotton</mat-option>
                    <mat-option value="Linen">Linen</mat-option>
                    <mat-option value="Polyester">Polyester</mat-option>
                    <mat-option value="Mixed">Mixed</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Gallery Wrap</mat-label>
                  <mat-select formControlName="galleryWrap">
                    <mat-option value="Yes">Yes</mat-option>
                    <mat-option value="No">No</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Finish Type</mat-label>
                  <mat-select formControlName="finishType">
                    <mat-option value="Matte">Matte</mat-option>
                    <mat-option value="Glossy">Glossy</mat-option>
                    <mat-option value="Satin">Satin</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>UV Protection</mat-label>
                  <mat-select formControlName="uvProtection">
                    <mat-option value="Yes">Yes</mat-option>
                    <mat-option value="No">No</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <!-- Mug Printing Specific Fields -->
            <div *ngIf="selectedTemplate?.category === 'Mug Printing'" class="mug-fields">
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Mug Material</mat-label>
                  <mat-select formControlName="mugMaterial">
                    <mat-option value="Ceramic">Ceramic</mat-option>
                    <mat-option value="Porcelain">Porcelain</mat-option>
                    <mat-option value="Glass">Glass</mat-option>
                    <mat-option value="Stainless Steel">Stainless Steel</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Mug Color</mat-label>
                  <mat-select formControlName="mugColor">
                    <mat-option value="White">White</mat-option>
                    <mat-option value="Black">Black</mat-option>
                    <mat-option value="Red">Red</mat-option>
                    <mat-option value="Blue">Blue</mat-option>
                    <mat-option value="Green">Green</mat-option>
                    <mat-option value="Custom">Custom</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Print Area</mat-label>
                  <mat-select formControlName="printArea">
                    <mat-option value="Full Wrap">Full Wrap</mat-option>
                    <mat-option value="Front Only">Front Only</mat-option>
                    <mat-option value="Handle Area">Handle Area</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Dishwasher Safe</mat-label>
                  <mat-select formControlName="dishwasherSafe">
                    <mat-option value="Yes">Yes</mat-option>
                    <mat-option value="No">No</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <!-- T-shirt Printing Specific Fields -->
            <div *ngIf="selectedTemplate?.category === 'T-shirt Printing'" class="tshirt-fields">
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Fabric Type</mat-label>
                  <mat-select formControlName="fabricType">
                    <mat-option value="Cotton">Cotton</mat-option>
                    <mat-option value="Polyester">Polyester</mat-option>
                    <mat-option value="Cotton Blend">Cotton Blend</mat-option>
                    <mat-option value="Organic Cotton">Organic Cotton</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Print Method</mat-label>
                  <mat-select formControlName="printMethod">
                    <mat-option value="Screen Print">Screen Print</mat-option>
                    <mat-option value="Digital Print">Digital Print</mat-option>
                    <mat-option value="Heat Transfer">Heat Transfer</mat-option>
                    <mat-option value="Embroidery">Embroidery</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Print Location</mat-label>
                  <mat-select formControlName="printLocation">
                    <mat-option value="Front">Front</mat-option>
                    <mat-option value="Back">Back</mat-option>
                    <mat-option value="Front & Back">Front & Back</mat-option>
                    <mat-option value="Sleeve">Sleeve</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Wash Care</mat-label>
                  <mat-select formControlName="washCare">
                    <mat-option value="Machine Wash">Machine Wash</mat-option>
                    <mat-option value="Hand Wash">Hand Wash</mat-option>
                    <mat-option value="Dry Clean">Dry Clean</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>
          </div>

          <!-- Premium Settings -->
          <div class="premium-section">
            <h3>Premium Settings</h3>
            <div class="form-row">
              <mat-slide-toggle formControlName="isPremium" class="premium-toggle">
                Premium Product
              </mat-slide-toggle>
            </div>

            <div *ngIf="productForm.get('isPremium')?.value" class="premium-fields">
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
          </div>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button (click)="previewProduct()" color="primary">Preview</button>
        <button mat-raised-button (click)="onSave()" color="primary" [disabled]="productForm.invalid">
          <mat-icon>save</mat-icon>
          Save Product
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .add-product-dialog {
      max-width: 800px;
      width: 100%;
    }

    .dialog-content {
      max-height: 70vh;
      overflow-y: auto;
      padding: 20px;
    }

    .product-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .form-field {
      width: 100%;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .template-section {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #2196f3;
    }

    .template-description {
      color: #666;
      font-style: italic;
      margin: 10px 0;
    }

    .apply-template-btn {
      margin-top: 10px;
    }

    .sizes-section,
    .paper-types-section,
    .category-specific-section,
    .premium-section {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
    }

    .sizes-section h3,
    .paper-types-section h3,
    .category-specific-section h3,
    .premium-section h3 {
      margin-top: 0;
      color: #333;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 10px;
    }

    .size-row,
    .paper-type-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .size-field {
      flex: 1;
    }

    .price-field {
      flex: 1;
    }

    .paper-type-field {
      flex: 1;
    }

    .add-size-btn,
    .add-paper-type-btn {
      margin-top: 10px;
    }

    .frame-fields,
    .canvas-fields,
    .mug-fields,
    .tshirt-fields {
      margin-top: 15px;
    }

    .premium-toggle {
      margin-bottom: 15px;
    }

    .premium-fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
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
      .form-row {
        grid-template-columns: 1fr;
      }

      .premium-fields {
        grid-template-columns: 1fr;
      }

      .size-row,
      .paper-type-row {
        flex-direction: column;
        align-items: stretch;
      }

      .size-field,
      .price-field,
      .paper-type-field {
        width: 100%;
      }
    }
  `]
})
export class AddProductDialogComponent implements OnInit {
  productForm: FormGroup;
  selectedTemplate: ProductTemplate | null = null;

  // Category-specific templates
  private templates: ProductTemplate[] = [
    {
      category: 'Frames',
      name: 'Photo Frame',
      description: 'Beautiful frames to display your precious memories. Available in various materials and styles.',
      sizes: [
        { size: '4x6', price: 150 },
        { size: '5x7', price: 200 },
        { size: '8x10', price: 300 },
        { size: '11x14', price: 450 },
        { size: '16x20', price: 650 }
      ],
      paperTypes: [],
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      isPremium: false,
      discountPercentage: 0,
      categorySpecificFields: {
        frameMaterial: 'Wood',
        frameColor: 'Brown',
        frameStyle: 'Classic',
        mountIncluded: 'Yes'
      }
    },
    {
      category: 'Canvas Prints',
      name: 'Canvas Print',
      description: 'High-quality canvas prints that bring your photos to life. Museum-quality finish with gallery wrap edges.',
      sizes: [
        { size: '8x10', price: 800 },
        { size: '12x16', price: 1200 },
        { size: '16x20', price: 1800 },
        { size: '20x24', price: 2500 },
        { size: '24x36', price: 3500 }
      ],
      paperTypes: ['Cotton Canvas', 'Linen Canvas'],
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
      isPremium: true,
      premiumBadge: 'Perfect Gift',
      discountPercentage: 15,
      categorySpecificFields: {
        canvasType: 'Cotton',
        galleryWrap: 'Yes',
        finishType: 'Matte',
        uvProtection: 'Yes'
      }
    },
    {
      category: 'Mug Printing',
      name: 'Custom Printed Mug',
      description: 'Personalized mugs perfect for gifts. High-quality ceramic with vibrant printing.',
      sizes: [
        { size: '11oz', price: 250 },
        { size: '15oz', price: 300 },
        { size: '20oz', price: 350 }
      ],
      paperTypes: [],
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop',
      isPremium: true,
      premiumBadge: 'Love & Care',
      discountPercentage: 10,
      categorySpecificFields: {
        mugMaterial: 'Ceramic',
        mugColor: 'White',
        printArea: 'Full Wrap',
        dishwasherSafe: 'Yes'
      }
    },
    {
      category: 'T-shirt Printing',
      name: 'Custom T-shirt',
      description: 'Personalized t-shirts with your designs. Comfortable fabric with durable printing.',
      sizes: [
        { size: 'S', price: 400 },
        { size: 'M', price: 450 },
        { size: 'L', price: 500 },
        { size: 'XL', price: 550 },
        { size: 'XXL', price: 600 }
      ],
      paperTypes: [],
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      isPremium: false,
      discountPercentage: 0,
      categorySpecificFields: {
        fabricType: 'Cotton',
        printMethod: 'Screen Print',
        printLocation: 'Front',
        washCare: 'Machine Wash'
      }
    },
    {
      category: 'Photo Prints',
      name: 'Photo Print',
      description: 'High-quality photo prints on premium paper. Perfect for albums, frames, and displays.',
      sizes: [
        { size: '4x6', price: 15 },
        { size: '5x7', price: 25 },
        { size: '8x10', price: 50 },
        { size: '11x14', price: 80 },
        { size: '16x20', price: 150 }
      ],
      paperTypes: ['Matte', 'Glossy', 'Satin'],
      imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
      isPremium: false,
      discountPercentage: 0,
      categorySpecificFields: {}
    }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      sizes: this.fb.array([]),
      paperTypes: this.fb.array([]),
      isPremium: [false],
      premiumBadge: [''],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]],
      // Category-specific fields
      frameMaterial: [''],
      frameColor: [''],
      frameStyle: [''],
      mountIncluded: [''],
      canvasType: [''],
      galleryWrap: [''],
      finishType: [''],
      uvProtection: [''],
      mugMaterial: [''],
      mugColor: [''],
      printArea: [''],
      dishwasherSafe: [''],
      fabricType: [''],
      printMethod: [''],
      printLocation: [''],
      washCare: ['']
    });
  }

  ngOnInit(): void {
    this.addSize(); // Add one size by default
  }

  get sizesArray(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  get paperTypesArray(): FormArray {
    return this.productForm.get('paperTypes') as FormArray;
  }

  onCategoryChange(): void {
    const category = this.productForm.get('category')?.value;
    this.selectedTemplate = this.templates.find(t => t.category === category) || null;
  }

  applyTemplate(): void {
    if (!this.selectedTemplate) return;

    // Clear existing sizes and paper types
    while (this.sizesArray.length !== 0) {
      this.sizesArray.removeAt(0);
    }
    while (this.paperTypesArray.length !== 0) {
      this.paperTypesArray.removeAt(0);
    }

    // Apply template data
    this.productForm.patchValue({
      name: this.selectedTemplate.name,
      description: this.selectedTemplate.description,
      imageUrl: this.selectedTemplate.imageUrl,
      isPremium: this.selectedTemplate.isPremium,
      premiumBadge: this.selectedTemplate.premiumBadge,
      discountPercentage: this.selectedTemplate.discountPercentage
    });

    // Add template sizes
    this.selectedTemplate.sizes.forEach(size => {
      this.addSize(size.size, size.price);
    });

    // Add template paper types
    this.selectedTemplate.paperTypes.forEach(paperType => {
      this.addPaperType(paperType);
    });

    // Apply category-specific fields
    Object.keys(this.selectedTemplate.categorySpecificFields).forEach(key => {
      this.productForm.get(key)?.setValue(this.selectedTemplate!.categorySpecificFields[key]);
    });

    this.snackBar.open('Template applied successfully!', 'Close', { duration: 2000 });
  }

  addSize(size: string = '', price: number = 0): void {
    const sizeGroup = this.fb.group({
      size: [size, Validators.required],
      price: [price, [Validators.required, Validators.min(0)]]
    });
    this.sizesArray.push(sizeGroup);
  }

  removeSize(index: number): void {
    this.sizesArray.removeAt(index);
  }

  addPaperType(paperType: string = ''): void {
    const paperTypeControl = this.fb.control(paperType, Validators.required);
    this.paperTypesArray.push(paperTypeControl);
  }

  removePaperType(index: number): void {
    this.paperTypesArray.removeAt(index);
  }

  showPaperTypes(): boolean {
    const category = this.productForm.get('category')?.value;
    return ['Photo Prints', 'Canvas Prints', 'Photo Books'].includes(category);
  }

  showCategorySpecificFields(): boolean {
    return !!this.selectedTemplate;
  }

  getCategoryDescription(category: string): string {
    const descriptions: { [key: string]: string } = {
      'Frames': 'Frames protect and enhance your photos. Choose from various materials, colors, and styles.',
      'Canvas Prints': 'Canvas prints offer a premium look with gallery wrap edges. Perfect for wall displays.',
      'Mug Printing': 'Custom printed mugs make great gifts. Available in different sizes and materials.',
      'T-shirt Printing': 'Personalized t-shirts with your designs. Comfortable and durable.',
      'Photo Prints': 'High-quality photo prints on premium paper. Perfect for albums and frames.',
      'Photo Books': 'Professional photo books with high-quality binding and printing.',
      'Calendars': 'Custom calendars with your photos. Perfect for gifts and personal use.',
      'Albums': 'Traditional photo albums with protective sleeves and elegant covers.',
      'Metal Prints': 'Modern metal prints with vibrant colors and sleek finish.',
      'Acrylic Prints': 'Crystal-clear acrylic prints with stunning depth and clarity.',
      'Bamboo Prints': 'Eco-friendly bamboo prints with natural texture and warmth.',
      'Album Templates': 'Pre-designed album templates for weddings, birthdays, and special occasions.',
      'Wedding Albums': 'Elegant wedding albums with premium materials and professional layouts.',
      'Birthday Albums': 'Fun and colorful birthday album templates for memorable celebrations.',
      'Puberty Albums': 'Traditional puberty ceremony albums with cultural designs and layouts.',
      'Keychain Printing': 'Custom printed keychains with your photos. Perfect for gifts.',
      'Engraving Works': 'Personalized engraving on various materials including wood, metal, and glass.'
    };
    return descriptions[category] || 'Customize this product according to your needs.';
  }

  previewProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      
      const previewDialogRef = this.dialog.open(ProductPreviewDialogComponent, {
        width: '900px',
        maxHeight: '90vh',
        data: productData
      });

      previewDialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'save') {
          // If user clicked save from preview, save the product
          this.onSave();
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
    }
  }

  onSave(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.dialogRef.close(productData);
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

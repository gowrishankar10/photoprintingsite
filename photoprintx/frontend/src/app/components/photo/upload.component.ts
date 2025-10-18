import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService, UploadResponse } from '../../services/upload.service';
import { OrderService, OrderItem } from '../../services/order.service';

@Component({
  selector: 'app-photo-upload',
  template: `
    <div class="upload-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Upload Photos</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <!-- File upload area -->
          <div class="drop-zone" 
               (dragover)="onDragOver($event)" 
               (dragleave)="onDragLeave($event)" 
               (drop)="onDrop($event)"
               [class.drag-over]="isDragOver">
            <input #fileInput type="file" multiple (change)="onFileSelected($event)" accept="image/*" style="display: none;">
            <p>Drag & drop photos here or</p>
            <button mat-raised-button color="primary" (click)="fileInput.click()">Browse Files</button>
            <p *ngIf="selectedFiles.length > 0">{{ selectedFiles.length }} file(s) selected</p>
          </div>

          <!-- Selected files preview -->
          <div class="preview-container" *ngIf="selectedFiles.length > 0">
            <h3>Preview</h3>
            <div class="preview-grid">
              <div class="preview-item" *ngFor="let file of selectedFiles; let i = index">
                <img [src]="previewUrls[i]" alt="Preview" class="preview-image">
                <div class="preview-controls">
                  <mat-form-field appearance="fill" class="size-select">
                    <mat-label>Size</mat-label>
                    <mat-select [(value)]="fileOptions[i].size">
                      <mat-option value="4x6">4x6</mat-option>
                      <mat-option value="5x7">5x7</mat-option>
                      <mat-option value="A4">A4</mat-option>
                    </mat-select>
                  </mat-form-field>
                  
                  <mat-form-field appearance="fill" class="paper-select">
                    <mat-label>Paper</mat-label>
                    <mat-select [(value)]="fileOptions[i].paperType">
                      <mat-option value="Glossy">Glossy</mat-option>
                      <mat-option value="Matte">Matte</mat-option>
                    </mat-select>
                  </mat-form-field>
                  
                  <mat-form-field appearance="fill" class="quantity-input">
                    <mat-label>Quantity</mat-label>
                    <input matInput type="number" min="1" [(ngModel)]="fileOptions[i].quantity">
                  </mat-form-field>
                  
                  <button mat-icon-button color="warn" (click)="removeFile(i)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Order summary -->
          <div class="order-summary" *ngIf="selectedFiles.length > 0">
            <h3>Order Summary</h3>
            <div class="summary-item" *ngFor="let item of orderItems">
              <span>{{ item.size }} {{ item.paperType }} ({{ item.quantity }})</span>
              <span>₹{{ item.price }}</span>
            </div>
            <div class="total">
              <strong>Total: ₹{{ totalAmount }}</strong>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="actions" *ngIf="selectedFiles.length > 0">
            <button mat-raised-button color="primary" (click)="uploadPhotos()" [disabled]="uploading">
              <span *ngIf="!uploading">Upload & Checkout</span>
              <span *ngIf="uploading">Uploading...</span>
            </button>
            <button mat-raised-button (click)="clearAll()">Clear All</button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .upload-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .drop-zone {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      margin-bottom: 20px;
      transition: all 0.3s ease;
    }

    .drop-zone.drag-over {
      border-color: #1976d2;
      background-color: #e3f2fd;
    }

    .preview-container {
      margin-bottom: 20px;
    }

    .preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    .preview-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
    }

    .preview-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 4px;
    }

    .preview-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
      align-items: center;
    }

    .size-select, .paper-select, .quantity-input {
      flex: 1;
      min-width: 100px;
    }

    .order-summary {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    .total {
      text-align: right;
      margin-top: 10px;
      font-size: 18px;
    }

    .actions {
      display: flex;
      gap: 10px;
    }

    .actions button {
      flex: 1;
    }
  `]
})
export class PhotoUploadComponent implements OnInit {
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  fileOptions: { size: string; paperType: string; quantity: number }[] = [];
  orderItems: OrderItem[] = [];
  totalAmount = 0;
  isDragOver = false;
  uploading = false;

  constructor(
    private uploadService: UploadService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.processFiles(files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    if (event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  processFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file && file.type.startsWith('image/')) {
        this.selectedFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
        
        // Initialize options for this file
        this.fileOptions.push({
          size: '4x6',
          paperType: 'Glossy',
          quantity: 1
        });
      }
    }
    
    this.calculateTotal();
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
    this.fileOptions.splice(index, 1);
    this.calculateTotal();
  }

  clearAll(): void {
    this.selectedFiles = [];
    this.previewUrls = [];
    this.fileOptions = [];
    this.orderItems = [];
    this.totalAmount = 0;
  }

  calculateTotal(): void {
    this.orderItems = [];
    this.totalAmount = 0;
    
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const options = this.fileOptions[i];
      // Pricing logic (you can adjust these values)
      const basePrice = options.size === '4x6' ? 10 : options.size === '5x7' ? 15 : 20;
      const paperPrice = options.paperType === 'Glossy' ? 0 : 2;
      const price = (basePrice + paperPrice) * options.quantity;
      
      this.orderItems.push({
        imageUrl: '', // Will be filled after upload
        publicId: '', // Will be filled after upload
        size: options.size as any,
        paperType: options.paperType as any,
        quantity: options.quantity,
        price
      });
      
      this.totalAmount += price;
    }
  }

  uploadPhotos(): void {
    if (this.selectedFiles.length === 0) return;
    
    this.uploading = true;
    this.calculateTotal();
    
    // Upload files to Cloudinary
    this.uploadService.uploadMultipleImages(this.selectedFiles).subscribe({
      next: (responses: UploadResponse[]) => {
        // Update order items with uploaded image URLs
        for (let i = 0; i < responses.length; i++) {
          this.orderItems[i].imageUrl = responses[i].imageUrl;
          this.orderItems[i].publicId = responses[i].publicId;
        }
        
        // Create order
        this.orderService.createOrder({
          items: this.orderItems,
          totalAmount: this.totalAmount
        }).subscribe({
          next: (order) => {
            this.uploading = false;
            // Redirect to order confirmation page with order data
            const orderData = encodeURIComponent(JSON.stringify({
              _id: order._id,
              orderNumber: 'WS' + Date.now().toString().slice(-6),
              items: this.orderItems.map((item, index) => ({
                fileName: this.selectedFiles[index]?.name || 'photo.jpg',
                size: item.size,
                paperType: item.paperType,
                quantity: item.quantity,
                price: item.price / item.quantity, // Price per unit
                imageUrl: item.imageUrl, // Actual uploaded image URL
                publicId: item.publicId // Cloudinary public ID
              })),
              totalAmount: this.totalAmount,
              status: 'confirmed',
              createdAt: new Date().toISOString(),
              customerEmail: 'customer@example.com', // You can get this from auth service
              customerName: 'Customer' // You can get this from auth service
            }));
            
            this.router.navigate(['/order-confirmation'], { 
              queryParams: { order: orderData } 
            });
          },
          error: (err) => {
            this.uploading = false;
            console.error('Order creation failed:', err);
            alert('Order creation failed. Please try again.');
          }
        });
      },
      error: (err) => {
        this.uploading = false;
        console.error('Upload failed:', err);
        alert('Upload failed. Please try again.');
      }
    });
  }
}

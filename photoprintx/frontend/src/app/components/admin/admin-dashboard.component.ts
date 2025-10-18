import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ProductService, Product } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AddProductDialogComponent } from './add-product-dialog.component';
import { BulkOperationsDialogComponent } from './bulk-operations-dialog.component';
import { SettingsDialogComponent } from './settings-dialog.component';
import { SettingsService } from '../../services/settings.service';

interface ProductWithSelection extends Product {
  selected?: boolean;
}

interface Customer {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface RevenueData {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  revenueGrowth: number;
  orderGrowth: number;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentOrders: Order[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule
  ],
  template: `
    <div class="admin-dashboard">
      <!-- Modern Header -->
      <div class="dashboard-header">
        <div class="header-content">
          <div class="header-left">
            <div class="logo-section">
              <div class="logo-icon">🎨</div>
              <div class="logo-text">
                <h1>{{ getBusinessName() }}</h1>
                <span>Admin Dashboard</span>
              </div>
            </div>
          </div>
          <div class="header-right">
            <div class="header-actions">
              <button mat-icon-button class="action-btn" (click)="openSettings()" matTooltip="Settings">
                <mat-icon>settings</mat-icon>
              </button>
              <button mat-icon-button class="action-btn" [matMenuTriggerFor]="exportMenu" matTooltip="Export Data">
                <mat-icon>download</mat-icon>
              </button>
              <mat-menu #exportMenu="matMenu">
                <button mat-menu-item (click)="exportProductsToCSV()">
                  <mat-icon>inventory</mat-icon>
                  <span>Export Products</span>
                </button>
                <button mat-menu-item (click)="exportCustomersToCSV()">
                  <mat-icon>people</mat-icon>
                  <span>Export Customers</span>
                </button>
                <button mat-menu-item (click)="exportRevenueToCSV()">
                  <mat-icon>trending_up</mat-icon>
                  <span>Export Revenue Data</span>
                </button>
                <mat-divider></mat-divider>
                <button mat-menu-item (click)="exportAllDataToCSV()">
                  <mat-icon>download</mat-icon>
                  <span>Export All Data</span>
                </button>
              </mat-menu>
              <div class="user-profile">
                <div class="user-avatar">{{ getCurrentUserName()?.charAt(0) || 'A' }}</div>
                <div class="user-info">
                  <span class="user-name">{{ getCurrentUserName() || 'Admin' }}</span>
                  <span class="user-role">{{ getCurrentUserRole() || 'admin' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Dashboard Content -->
      <div class="dashboard-content">
        <!-- Quick Stats Overview -->
        <div class="stats-overview">
          <div class="stat-card primary">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <div class="stat-value">{{ formatCurrency(revenueData.totalRevenue) }}</div>
              <div class="stat-label">Total Revenue</div>
              <div class="stat-change positive">
                <mat-icon>trending_up</mat-icon>
                <span>{{ revenueData.revenueGrowth }}%</span>
              </div>
            </div>
          </div>
          
          <div class="stat-card success">
            <div class="stat-icon">📦</div>
            <div class="stat-content">
              <div class="stat-value">{{ revenueData.totalOrders }}</div>
              <div class="stat-label">Total Orders</div>
              <div class="stat-change positive">
                <mat-icon>trending_up</mat-icon>
                <span>{{ revenueData.orderGrowth }}%</span>
              </div>
            </div>
          </div>
          
          <div class="stat-card info">
            <div class="stat-icon">👥</div>
            <div class="stat-content">
              <div class="stat-value">{{ customers.length }}</div>
              <div class="stat-label">Customers</div>
              <div class="stat-change positive">
                <mat-icon>trending_up</mat-icon>
                <span>12%</span>
              </div>
            </div>
          </div>
          
          <div class="stat-card warning">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-value">{{ formatCurrency(revenueData.averageOrderValue) }}</div>
              <div class="stat-label">Avg Order Value</div>
              <div class="stat-change positive">
                <mat-icon>trending_up</mat-icon>
                <span>8%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Advanced Revenue Analytics -->
        <div class="analytics-section">
          <div class="section-header">
            <h2>📈 Revenue Analytics</h2>
            <div class="section-controls">
              <mat-form-field appearance="outline" class="date-filter">
                <mat-label>Time Period</mat-label>
                <mat-select [(value)]="selectedDateRange" (selectionChange)="onDateRangeChange()">
                  <mat-option value="7">Last 7 Days</mat-option>
                  <mat-option value="30">Last 30 Days</mat-option>
                  <mat-option value="90">Last 90 Days</mat-option>
                  <mat-option value="365">Last Year</mat-option>
                  <mat-option value="custom">Custom Range</mat-option>
                </mat-select>
              </mat-form-field>
              
              <div class="custom-date-range" *ngIf="selectedDateRange === 'custom'">
                <mat-form-field appearance="outline" class="date-field">
                  <mat-label>Start Date</mat-label>
                  <input matInput [matDatepicker]="startPicker" [(ngModel)]="customStartDate">
                  <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                  <mat-datepicker #startPicker></mat-datepicker>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="date-field">
                  <mat-label>End Date</mat-label>
                  <input matInput [matDatepicker]="endPicker" [(ngModel)]="customEndDate">
                  <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                  <mat-datepicker #endPicker></mat-datepicker>
                </mat-form-field>
              </div>
            </div>
          </div>

          <!-- Advanced Charts Grid -->
          <div class="charts-grid">
            <div class="chart-card large">
              <div class="chart-header">
                <h3>📊 Revenue Trend</h3>
                <div class="chart-actions">
                  <button mat-icon-button matTooltip="Export Chart">
                    <mat-icon>download</mat-icon>
                  </button>
                </div>
              </div>
              <div class="chart-content">
                <div class="chart-visual">
                  <div class="chart-value">{{ formatCurrency(revenueData.totalRevenue) }}</div>
                  <div class="chart-subtitle">{{ getDateRangeLabel() }} Revenue</div>
                  <div class="chart-growth" [style.color]="getRevenueTrendColor()">
                    <mat-icon>{{ revenueData.revenueGrowth > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                    <span>{{ revenueData.revenueGrowth > 0 ? '+' : '' }}{{ revenueData.revenueGrowth }}% {{ getRevenueTrend() }}</span>
                  </div>
                </div>
                <div class="chart-details">
                  <div class="detail-item">
                    <span class="detail-label">Online Sales:</span>
                    <span class="detail-value">{{ formatCurrency(revenueData.totalRevenue * 0.8) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Offline Sales:</span>
                    <span class="detail-value">{{ formatCurrency(revenueData.totalRevenue * 0.2) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-header">
                <h3>🛒 Orders Analysis</h3>
              </div>
              <div class="chart-content">
                <div class="chart-visual">
                  <div class="chart-value">{{ revenueData.totalOrders }}</div>
                  <div class="chart-subtitle">{{ getDateRangeLabel() }} Orders</div>
                  <div class="chart-growth" [style.color]="getOrderTrendColor()">
                    <mat-icon>{{ revenueData.orderGrowth > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                    <span>{{ revenueData.orderGrowth > 0 ? '+' : '' }}{{ revenueData.orderGrowth }}%</span>
                  </div>
                </div>
                <div class="chart-breakdown">
                  <div class="breakdown-item">
                    <div class="breakdown-bar completed"></div>
                    <span>{{ getCompletedOrders() }} Completed</span>
                  </div>
                  <div class="breakdown-item">
                    <div class="breakdown-bar pending"></div>
                    <span>{{ getPendingOrders() }} Pending</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-header">
                <h3>🎯 Performance Insights</h3>
              </div>
              <div class="chart-content">
                <div class="insights-grid">
                  <div class="insight-item" *ngFor="let insight of getRevenueInsights()">
                    <div class="insight-icon">✅</div>
                    <span class="insight-text">{{ insight }}</span>
                  </div>
                </div>
                <div class="chart-note">{{ getDateRangeLabel().toLowerCase() }} performance metrics</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Advanced Management Tabs -->
        <div class="management-section">
          <mat-tab-group class="management-tabs" (selectedTabChange)="onTabChange($event)">
            <!-- Products Management -->
            <mat-tab label="Products Management">
              <div class="tab-content">
                <div class="tab-header">
                  <h2>📦 Products Management</h2>
                  <div class="tab-actions">
                    <mat-form-field appearance="outline" class="search-field">
                      <mat-label>Search Products</mat-label>
                      <input matInput [(ngModel)]="productSearchQuery" (input)="filterProducts()" placeholder="Search by name, category...">
                      <mat-icon matSuffix>search</mat-icon>
                    </mat-form-field>
                    
                    <mat-form-field appearance="outline" class="filter-field">
                      <mat-label>Category Filter</mat-label>
                      <mat-select [(value)]="selectedCategory" (selectionChange)="filterProducts()">
                        <mat-option value="">All Categories</mat-option>
                        <mat-option value="Photo Prints">Photo Prints</mat-option>
                        <mat-option value="Canvas Prints">Canvas Prints</mat-option>
                        <mat-option value="Wedding Albums">Wedding Albums</mat-option>
                        <mat-option value="Mug Printing">Mug Printing</mat-option>
                        <mat-option value="T-shirt Printing">T-shirt Printing</mat-option>
                      </mat-select>
                    </mat-form-field>
                    
                    <button mat-raised-button color="primary" (click)="openAddProductDialog()">
                      <mat-icon>add</mat-icon>
                      Add Product
                    </button>
                  </div>
                </div>

                <!-- Bulk Operations Toolbar -->
                <div class="bulk-operations-toolbar" *ngIf="selectedProducts.length > 0">
                  <div class="bulk-info">
                    <mat-icon>check_circle</mat-icon>
                    <span>{{ selectedProducts.length }} product(s) selected</span>
                  </div>
                  <div class="bulk-actions">
                    <button mat-button (click)="bulkUpdateCategory()" matTooltip="Update Category">
                      <mat-icon>category</mat-icon>
                      Update Category
                    </button>
                    <button mat-button (click)="bulkUpdatePricing()" matTooltip="Update Pricing">
                      <mat-icon>attach_money</mat-icon>
                      Update Pricing
                    </button>
                    <button mat-button (click)="bulkTogglePremium()" matTooltip="Toggle Premium">
                      <mat-icon>star</mat-icon>
                      Toggle Premium
                    </button>
                    <button mat-button (click)="bulkDeleteProducts()" matTooltip="Delete Selected" color="warn">
                      <mat-icon>delete</mat-icon>
                      Delete Selected
                    </button>
                    <button mat-button (click)="clearSelection()" matTooltip="Clear Selection">
                      <mat-icon>clear</mat-icon>
                      Clear
                    </button>
                  </div>
                </div>

                <!-- Products Grid -->
                <div class="products-grid">
                  <div class="product-card" *ngFor="let product of filteredProducts" [class.selected]="product.selected">
                    <div class="product-selection">
                      <mat-checkbox [(ngModel)]="product.selected" (change)="toggleProductSelection(product)"></mat-checkbox>
                    </div>
                    <div class="product-image">
                      <img [src]="product.imageUrl" [alt]="product.name">
                      <div class="product-badges">
                        <span class="badge premium" *ngIf="product.isPremium">{{ product.premiumBadge }}</span>
                        <span class="badge discount" *ngIf="product.discountPercentage > 0">{{ product.discountPercentage }}% OFF</span>
                      </div>
                    </div>
                    <div class="product-content">
                      <h3 class="product-name">{{ product.name }}</h3>
                      <p class="product-category">{{ product.category }}</p>
                      <p class="product-description">{{ product.description }}</p>
                      <div class="product-pricing">
                        <span class="price">{{ formatCurrency(product.sizes[0].price || 0) }}</span>
                        <span class="original-price" *ngIf="product.discountPercentage > 0">
                          {{ formatCurrency((product.sizes[0].price || 0) * (1 + product.discountPercentage / 100)) }}
                        </span>
                      </div>
                      <div class="product-actions">
                        <button mat-icon-button (click)="editProduct(product)" matTooltip="Edit">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button (click)="duplicateProduct(product)" matTooltip="Duplicate">
                          <mat-icon>content_copy</mat-icon>
                        </button>
                        <button mat-icon-button (click)="deleteProduct(product)" matTooltip="Delete" color="warn">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Customers Management -->
            <mat-tab label="Customers Management">
              <div class="tab-content">
                <div class="tab-header">
                  <h2>👥 Customers Management</h2>
                  <div class="customer-stats">
                    <div class="stat-item">
                      <span class="stat-number">{{ customers.length }}</span>
                      <span class="stat-label">Total Customers</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-number">{{ getAdminCount() }}</span>
                      <span class="stat-label">Admins</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-number">{{ getUserCount() }}</span>
                      <span class="stat-label">Users</span>
                    </div>
                  </div>
                </div>

                <div class="customers-table">
                  <table mat-table [dataSource]="customers" class="mat-elevation-z2">
                    <ng-container matColumnDef="name">
                      <th mat-header-cell *matHeaderCellDef>Name</th>
                      <td mat-cell *matCellDef="let customer">
                        <div class="customer-info">
                          <div class="customer-avatar">{{ customer.name.charAt(0) }}</div>
                          <span>{{ customer.name }}</span>
                        </div>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="email">
                      <th mat-header-cell *matHeaderCellDef>Email</th>
                      <td mat-cell *matCellDef="let customer">{{ customer.email }}</td>
                    </ng-container>

                    <ng-container matColumnDef="role">
                      <th mat-header-cell *matHeaderCellDef>Role</th>
                      <td mat-cell *matCellDef="let customer">
                        <mat-chip [class]="customer.role === 'admin' ? 'admin-chip' : 'user-chip'">
                          {{ customer.role }}
                        </mat-chip>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="joinDate">
                      <th mat-header-cell *matHeaderCellDef>Join Date</th>
                      <td mat-cell *matCellDef="let customer">{{ customer.createdAt }}</td>
                    </ng-container>

                    <ng-container matColumnDef="orders">
                      <th mat-header-cell *matHeaderCellDef>Orders</th>
                      <td mat-cell *matCellDef="let customer">{{ customer.totalOrders }}</td>
                    </ng-container>

                    <ng-container matColumnDef="spent">
                      <th mat-header-cell *matHeaderCellDef>Total Spent</th>
                      <td mat-cell *matCellDef="let customer">{{ formatCurrency(customer.totalSpent) }}</td>
                    </ng-container>

                    <ng-container matColumnDef="actions">
                      <th mat-header-cell *matHeaderCellDef>Actions</th>
                      <td mat-cell *matCellDef="let customer">
                        <button mat-icon-button matTooltip="View Details">
                          <mat-icon>visibility</mat-icon>
                        </button>
                        <button mat-icon-button matTooltip="Edit">
                          <mat-icon>edit</mat-icon>
                        </button>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="customerColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: customerColumns;"></tr>
                  </table>
                </div>
              </div>
            </mat-tab>

            <!-- Analytics & Reports -->
            <mat-tab label="Analytics & Reports">
              <div class="tab-content">
                <div class="tab-header">
                  <h2>📊 Analytics & Reports</h2>
                  <div class="analytics-controls">
                    <button mat-raised-button color="primary" (click)="openReports()">
                      <mat-icon>assessment</mat-icon>
                      Generate Report
                    </button>
                    <button mat-raised-button [matMenuTriggerFor]="analyticsExportMenu">
                      <mat-icon>download</mat-icon>
                      Export Data
                    </button>
                    <mat-menu #analyticsExportMenu="matMenu">
                      <button mat-menu-item (click)="exportProductsToCSV()">
                        <mat-icon>inventory</mat-icon>
                        <span>Export Products</span>
                      </button>
                      <button mat-menu-item (click)="exportCustomersToCSV()">
                        <mat-icon>people</mat-icon>
                        <span>Export Customers</span>
                      </button>
                      <button mat-menu-item (click)="exportRevenueToCSV()">
                        <mat-icon>trending_up</mat-icon>
                        <span>Export Revenue Data</span>
                      </button>
                      <mat-divider></mat-divider>
                      <button mat-menu-item (click)="exportAllDataToCSV()">
                        <mat-icon>download</mat-icon>
                        <span>Export All Data</span>
                      </button>
                    </mat-menu>
                  </div>
                </div>

                <div class="analytics-grid">
                  <div class="analytics-card">
                    <h3>Top Selling Products</h3>
                    <div class="top-products">
                      <div class="product-item" *ngFor="let product of revenueData.topProducts">
                        <div class="product-rank">{{ revenueData.topProducts.indexOf(product) + 1 }}</div>
                        <div class="product-details">
                          <span class="product-name">{{ product.name }}</span>
                          <span class="product-sales">{{ product.sales }} sold</span>
                        </div>
                        <div class="product-revenue">{{ formatCurrency(product.revenue) }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="analytics-card">
                    <h3>Recent Orders</h3>
                    <div class="recent-orders">
                      <div class="order-item" *ngFor="let order of revenueData.recentOrders">
                        <div class="order-info">
                          <span class="customer-name">{{ order.customerName }}</span>
                          <span class="order-date">{{ order.createdAt }}</span>
                        </div>
                        <div class="order-status">
                          <mat-chip [class]="order.status + '-chip'">{{ order.status }}</mat-chip>
                        </div>
                        <div class="order-amount">{{ formatCurrency(order.totalAmount) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </mat-tab>
          </mat-tab-group>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    /* Modern Header */
    .dashboard-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-icon {
      font-size: 2.5rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .logo-text h1 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
      color: #2d3748;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .logo-text span {
      font-size: 0.9rem;
      color: #718096;
      font-weight: 500;
    }

    .header-right {
      display: flex;
      align-items: center;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .action-btn {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      background: rgba(102, 126, 234, 0.2);
      transform: translateY(-2px);
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 1rem;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 50px;
      border: 1px solid rgba(102, 126, 234, 0.2);
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 600;
      color: #2d3748;
      font-size: 0.9rem;
    }

    .user-role {
      font-size: 0.8rem;
      color: #718096;
      text-transform: capitalize;
    }

    /* Main Content */
    .dashboard-content {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    /* Stats Overview */
    .stats-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2);
    }

    .stat-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
    }

    .stat-card.primary::before { background: linear-gradient(90deg, #667eea, #764ba2); }
    .stat-card.success::before { background: linear-gradient(90deg, #48bb78, #38a169); }
    .stat-card.info::before { background: linear-gradient(90deg, #4299e1, #3182ce); }
    .stat-card.warning::before { background: linear-gradient(90deg, #ed8936, #dd6b20); }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .stat-icon {
      font-size: 3rem;
      opacity: 0.8;
    }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      color: #718096;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }

    .stat-change {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .stat-change.positive {
      color: #48bb78;
    }

    .stat-change mat-icon {
      font-size: 1.2rem;
    }

    /* Analytics Section */
    .analytics-section {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 2rem;
      margin-bottom: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .section-header h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0;
    }

    .section-controls {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .date-filter {
      width: 200px;
    }

    .custom-date-range {
      display: flex;
      gap: 1rem;
    }

    .date-field {
      width: 150px;
    }

    /* Charts Grid */
    .charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 1.5rem;
    }

    .chart-card {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .chart-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }

    .chart-card.large {
      grid-column: span 1;
    }

    .chart-header {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chart-header h3 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .chart-actions button {
      color: white;
    }

    .chart-content {
      padding: 1.5rem;
    }

    .chart-visual {
      text-align: center;
      margin-bottom: 1rem;
    }

    .chart-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .chart-subtitle {
      color: #718096;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .chart-growth {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .chart-details {
      border-top: 1px solid #e2e8f0;
      padding-top: 1rem;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .detail-label {
      color: #718096;
      font-size: 0.9rem;
    }

    .detail-value {
      font-weight: 600;
      color: #2d3748;
    }

    .chart-breakdown {
      margin-top: 1rem;
    }

    .breakdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .breakdown-bar {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .breakdown-bar.completed {
      background: #48bb78;
    }

    .breakdown-bar.pending {
      background: #ed8936;
    }

    .insights-grid {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .insight-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 8px;
    }

    .insight-icon {
      font-size: 1.2rem;
    }

    .insight-text {
      font-size: 0.9rem;
      color: #2d3748;
    }

    .chart-note {
      font-size: 0.8rem;
      color: #718096;
      font-style: italic;
      margin-top: 1rem;
      text-align: center;
    }

    /* Management Section */
    .management-section {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .management-tabs {
      margin-top: 1rem;
    }

    .tab-content {
      padding: 1rem 0;
    }

    .tab-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .tab-header h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0;
    }

    .tab-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    /* Bulk Operations Toolbar */
    .bulk-operations-toolbar {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .bulk-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 600;
    }

    .bulk-info mat-icon {
      color: #4ade80;
    }

    .bulk-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .bulk-actions button {
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .bulk-actions button:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    .bulk-actions button[color="warn"] {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.5);
    }

    .bulk-actions button[color="warn"]:hover {
      background: rgba(239, 68, 68, 0.3);
      border-color: rgba(239, 68, 68, 0.7);
    }

    .search-field {
      width: 300px;
    }

    .filter-field {
      width: 200px;
    }

    /* Products Grid */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .product-card {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
    }

    .product-card.selected {
      border: 2px solid #667eea;
      box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
    }

    .product-selection {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 2;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      padding: 4px;
    }

    .product-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-image img {
      transform: scale(1.05);
    }

    .product-badges {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      color: white;
    }

    .badge.premium {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .badge.discount {
      background: linear-gradient(135deg, #f56565, #e53e3e);
    }

    .product-content {
      padding: 1.5rem;
    }

    .product-name {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 0.5rem 0;
    }

    .product-category {
      color: #667eea;
      font-size: 0.9rem;
      font-weight: 500;
      margin: 0 0 0.75rem 0;
    }

    .product-description {
      color: #718096;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0 0 1rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-pricing {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 1.3rem;
      font-weight: 700;
      color: #2d3748;
    }

    .original-price {
      font-size: 1rem;
      color: #a0aec0;
      text-decoration: line-through;
    }

    .product-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .product-actions button {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .product-actions button:hover {
      background: rgba(102, 126, 234, 0.2);
      transform: translateY(-2px);
    }

    /* Customer Stats */
    .customer-stats {
      display: flex;
      gap: 2rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #718096;
    }

    /* Customers Table */
    .customers-table {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .customer-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .customer-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.9rem;
    }

    /* Analytics Controls */
    .analytics-controls {
      display: flex;
      gap: 1rem;
    }

    /* Analytics Grid */
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .analytics-card {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .analytics-card h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 1rem 0;
    }

    .top-products .product-item,
    .recent-orders .order-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .top-products .product-item:last-child,
    .recent-orders .order-item:last-child {
      border-bottom: none;
    }

    .product-rank {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .product-details {
      flex: 1;
    }

    .product-name {
      font-weight: 600;
      color: #2d3748;
      display: block;
      margin-bottom: 0.25rem;
    }

    .product-sales {
      font-size: 0.9rem;
      color: #718096;
    }

    .product-revenue {
      font-weight: 600;
      color: #48bb78;
    }

    .order-info {
      flex: 1;
    }

    .customer-name {
      font-weight: 600;
      color: #2d3748;
      display: block;
      margin-bottom: 0.25rem;
    }

    .order-date {
      font-size: 0.9rem;
      color: #718096;
    }

    .order-status {
      margin-right: 1rem;
    }

    .order-amount {
      font-weight: 600;
      color: #2d3748;
    }

    /* Chip Styles */
    .admin-chip {
      background: #667eea;
      color: white;
    }

    .user-chip {
      background: #48bb78;
      color: white;
    }

    .completed-chip {
      background: #48bb78;
      color: white;
    }

    .pending-chip {
      background: #ed8936;
      color: white;
    }

    .cancelled-chip {
      background: #f56565;
      color: white;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .dashboard-content {
        padding: 1rem;
      }

      .header-content {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
      }

      .stats-overview {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .charts-grid {
        grid-template-columns: 1fr;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .section-controls {
        width: 100%;
        flex-direction: column;
      }

      .date-filter,
      .date-field {
        width: 100%;
      }

      .custom-date-range {
        flex-direction: column;
      }

      .tab-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .tab-actions {
        width: 100%;
        flex-direction: column;
      }

      .search-field,
      .filter-field {
        width: 100%;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }

      .customer-stats {
        flex-direction: column;
        gap: 1rem;
      }

      .analytics-grid {
        grid-template-columns: 1fr;
      }

      .analytics-controls {
        flex-direction: column;
      }
    }

    @media (max-width: 1024px) {
      .charts-grid {
        grid-template-columns: 1fr 1fr;
      }

      .chart-card.large {
        grid-column: span 2;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  products: ProductWithSelection[] = [];
  filteredProducts: ProductWithSelection[] = [];
  selectedProducts: ProductWithSelection[] = [];
  customers: Customer[] = [];
  revenueData: RevenueData = {
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    revenueGrowth: 0,
    orderGrowth: 0,
    topProducts: [],
    recentOrders: []
  };
  loading = false;
  customerColumns = ['name', 'email', 'role', 'joinDate', 'orders', 'spent', 'actions'];
  
  // Filter and search properties
  productSearchQuery = '';
  selectedCategory = '';
  selectedDateRange = '30';
  customStartDate: Date | null = null;
  customEndDate: Date | null = null;
  
  // UI state properties
  showRevenueDetails = false;
  monthlyTrend = 12;
  
  // Forms
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private settingsService: SettingsService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
      isPremium: [false],
      premiumBadge: [''],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.updateRevenueData();
  }

  loadDashboardData(): void {
    this.loading = true;
    setTimeout(() => {
      this.products = this.generateMockProducts();
      this.filterProducts();
      this.customers = this.generateMockCustomers();
      this.loadRevenueData();
      this.loading = false;
    }, 1000);
  }

  loadRevenueData(): void {
    this.revenueData = {
      totalRevenue: 125000,
      monthlyRevenue: 18500,
      totalOrders: 156,
      averageOrderValue: 801,
      revenueGrowth: 15,
      orderGrowth: 12,
      topProducts: [
        { name: 'Canvas Print 8x10', sales: 45, revenue: 6750 },
        { name: 'Tamil Wedding Album Template', sales: 32, revenue: 6400 },
        { name: 'Metal Print 8x10', sales: 28, revenue: 4200 },
        { name: 'Mug Printing', sales: 25, revenue: 2500 },
        { name: 'T-shirt Printing', sales: 22, revenue: 2200 }
      ],
      recentOrders: [
        {
          _id: '1',
          customerName: 'Priya Sharma',
          customerEmail: 'priya@example.com',
          items: [
            { productName: 'Canvas Print 8x10', quantity: 2, price: 150, imageUrl: '' }
          ],
          totalAmount: 300,
          status: 'completed',
          createdAt: '2024-03-15'
        },
        {
          _id: '2',
          customerName: 'Rahul Singh',
          customerEmail: 'rahul@example.com',
          items: [
            { productName: 'Tamil Wedding Album Template', quantity: 1, price: 200, imageUrl: '' }
          ],
          totalAmount: 200,
          status: 'pending',
          createdAt: '2024-03-14'
        },
        {
          _id: '3',
          customerName: 'Amit Kumar',
          customerEmail: 'amit@example.com',
          items: [
            { productName: 'Mug Printing', quantity: 3, price: 100, imageUrl: '' }
          ],
          totalAmount: 300,
          status: 'completed',
          createdAt: '2024-03-13'
        },
        {
          _id: '4',
          customerName: 'Sneha Reddy',
          customerEmail: 'sneha@example.com',
          items: [
            { productName: 'T-shirt Printing', quantity: 2, price: 100, imageUrl: '' }
          ],
          totalAmount: 200,
          status: 'cancelled',
          createdAt: '2024-03-12'
        },
        {
          _id: '5',
          customerName: 'Anjali Gupta',
          customerEmail: 'anjali@example.com',
          items: [
            { productName: 'Metal Print 8x10', quantity: 1, price: 150, imageUrl: '' }
          ],
          totalAmount: 150,
          status: 'completed',
          createdAt: '2024-03-11'
        }
      ]
    };
    this.updateRevenueData();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.productSearchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(this.productSearchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  editProduct(product: ProductWithSelection): void {
    this.snackBar.open(`Editing product: ${product.name}`, 'Close', { duration: 2000 });
  }

  deleteProduct(product: ProductWithSelection): void {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      this.products = this.products.filter(p => p._id !== product._id);
      this.filterProducts();
      this.snackBar.open(`${product.name} deleted successfully`, 'Close', { duration: 2000 });
    }
  }

  duplicateProduct(product: ProductWithSelection): void {
    const duplicated: ProductWithSelection = { ...product, _id: this.generateId(), name: `${product.name} (Copy)`, selected: false };
    this.products.unshift(duplicated);
    this.filterProducts();
    this.snackBar.open('Product duplicated successfully', 'Close', { duration: 2000 });
  }

  onDateRangeChange(): void {
    this.updateRevenueData();
    this.snackBar.open(`Revenue data filtered for ${this.selectedDateRange}`, 'Close', { duration: 2000 });
  }

  private updateRevenueData(): void {
    const days = this.getDaysFromRange(this.selectedDateRange);
    const filteredData = this.calculateFilteredRevenue(days);
    
    this.revenueData = {
      ...this.revenueData,
      ...filteredData
    };
  }

  private getDaysFromRange(range: string): number {
    switch (range) {
      case '7': return 7;
      case '30': return 30;
      case '90': return 90;
      case '365': return 365;
      default: return 30;
    }
  }

  private calculateFilteredRevenue(days: number): any {
    const baseRevenue = 125000;
    const baseOrders = 450;
    
    const dailyRevenue = baseRevenue / 30;
    const dailyOrders = baseOrders / 30;
    
    const filteredRevenue = Math.round(dailyRevenue * days);
    const filteredOrders = Math.round(dailyOrders * days);
    const avgOrderValue = Math.round(filteredRevenue / filteredOrders);
    
    const monthlyRevenue = Math.round(filteredRevenue * (30 / days));
    
    return {
      totalRevenue: filteredRevenue,
      monthlyRevenue: monthlyRevenue,
      totalOrders: filteredOrders,
      averageOrderValue: avgOrderValue,
      revenueGrowth: this.calculateGrowthPercentage(days),
      orderGrowth: this.calculateOrderGrowthPercentage(days)
    };
  }

  private calculateGrowthPercentage(days: number): number {
    if (days <= 7) return Math.round(Math.random() * 20 + 5);
    if (days <= 30) return Math.round(Math.random() * 15 + 10);
    if (days <= 90) return Math.round(Math.random() * 10 + 15);
    return Math.round(Math.random() * 5 + 20);
  }

  private calculateOrderGrowthPercentage(days: number): number {
    if (days <= 7) return Math.round(Math.random() * 15 + 3);
    if (days <= 30) return Math.round(Math.random() * 12 + 8);
    if (days <= 90) return Math.round(Math.random() * 8 + 12);
    return Math.round(Math.random() * 4 + 16);
  }

  getRevenueTrend(): string {
    const growth = this.revenueData.revenueGrowth;
    if (growth > 15) return 'Excellent';
    if (growth > 10) return 'Good';
    if (growth > 5) return 'Moderate';
    return 'Needs Attention';
  }

  getOrderTrend(): string {
    const growth = this.revenueData.orderGrowth;
    if (growth > 12) return 'Excellent';
    if (growth > 8) return 'Good';
    if (growth > 4) return 'Moderate';
    return 'Needs Attention';
  }

  getRevenueTrendColor(): string {
    const growth = this.revenueData.revenueGrowth;
    if (growth > 15) return '#48bb78';
    if (growth > 10) return '#8bc34a';
    if (growth > 5) return '#ed8936';
    return '#f56565';
  }

  getOrderTrendColor(): string {
    const growth = this.revenueData.orderGrowth;
    if (growth > 12) return '#48bb78';
    if (growth > 8) return '#8bc34a';
    if (growth > 4) return '#ed8936';
    return '#f56565';
  }

  formatCurrency(amount: number): string {
    const currencySymbol = this.settingsService?.getCurrencySymbol() || '₹';
    return `${currencySymbol}${amount.toLocaleString()}`;
  }

  getRevenueInsights(): string[] {
    const insights = [];
    const revenue = this.revenueData.totalRevenue;
    const orders = this.revenueData.totalOrders;
    const avgOrder = this.revenueData.averageOrderValue;

    if (revenue > 100000) {
      insights.push('Revenue exceeding ₹1L target');
    }
    if (orders > 400) {
      insights.push('High order volume achieved');
    }
    if (avgOrder > 250) {
      insights.push('Strong average order value');
    }
    if (this.revenueData.revenueGrowth > 20) {
      insights.push('Exceptional growth rate');
    }

    return insights.length > 0 ? insights : ['Revenue tracking normally'];
  }

  getDateRangeLabel(): string {
    if (this.customStartDate && this.customEndDate) {
      const days = this.calculateDaysBetween(this.customStartDate, this.customEndDate);
      return `${days} days`;
    }
    
    switch (this.selectedDateRange) {
      case '7': return 'Last 7 days';
      case '30': return 'Last 30 days';
      case '90': return 'Last 90 days';
      case '365': return 'Last year';
      default: return 'Last 30 days';
    }
  }

  getCompletedOrders(): number {
    return Math.floor(this.revenueData.totalOrders * 0.85);
  }

  getPendingOrders(): number {
    return this.revenueData.totalOrders - this.getCompletedOrders();
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '900px',
      maxHeight: '90vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const newProduct: ProductWithSelection = {
          ...result,
          _id: this.generateId(),
          isActive: true,
          selected: false
        };
        
        this.products.unshift(newProduct);
        this.filterProducts();
        
        this.snackBar.open('Product added successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '900px',
      maxHeight: '90vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.snackBar.open('Settings updated successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  openReports(): void {
    this.snackBar.open('Reports generator would open here', 'Close', { duration: 3000 });
  }

  exportData(): void {
    // Open export options dialog
    const exportOptions = [
      { type: 'products', label: 'Export Products', icon: 'inventory' },
      { type: 'customers', label: 'Export Customers', icon: 'people' },
      { type: 'revenue', label: 'Export Revenue Data', icon: 'trending_up' },
      { type: 'all', label: 'Export All Data', icon: 'download' }
    ];

    // For now, let's implement direct CSV export
    this.showExportMenu(exportOptions);
  }

  private showExportMenu(options: any[]): void {
    // Create a simple export menu
    const exportType = prompt('Choose export type:\n1. Products\n2. Customers\n3. Revenue Data\n4. All Data\n\nEnter number (1-4):');
    
    switch(exportType) {
      case '1':
        this.exportProductsToCSV();
        break;
      case '2':
        this.exportCustomersToCSV();
        break;
      case '3':
        this.exportRevenueToCSV();
        break;
      case '4':
        this.exportAllDataToCSV();
        break;
      default:
        this.snackBar.open('Export cancelled', 'Close', { duration: 2000 });
    }
  }

  exportProductsToCSV(): void {
    const csvContent = this.generateProductsCSV();
    this.downloadCSV(csvContent, 'products-export.csv');
    this.snackBar.open('Products exported successfully!', 'Close', { duration: 3000 });
  }

  exportCustomersToCSV(): void {
    const csvContent = this.generateCustomersCSV();
    this.downloadCSV(csvContent, 'customers-export.csv');
    this.snackBar.open('Customers exported successfully!', 'Close', { duration: 3000 });
  }

  exportRevenueToCSV(): void {
    const csvContent = this.generateRevenueCSV();
    this.downloadCSV(csvContent, 'revenue-export.csv');
    this.snackBar.open('Revenue data exported successfully!', 'Close', { duration: 3000 });
  }

  exportAllDataToCSV(): void {
    const csvContent = this.generateAllDataCSV();
    this.downloadCSV(csvContent, 'complete-data-export.csv');
    this.snackBar.open('All data exported successfully!', 'Close', { duration: 3000 });
  }

  private generateProductsCSV(): string {
    const headers = ['ID', 'Name', 'Description', 'Category', 'Price', 'Premium', 'Discount %', 'Status', 'Created Date'];
    const rows = this.products.map(product => [
      product._id,
      `"${product.name}"`,
      `"${product.description}"`,
      product.category,
      product.sizes[0]?.price || 0,
      product.isPremium ? 'Yes' : 'No',
      product.discountPercentage || 0,
      product.isActive ? 'Active' : 'Inactive',
      product.createdAt || 'N/A'
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private generateCustomersCSV(): string {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Total Orders', 'Total Spent', 'Join Date'];
    const rows = this.customers.map(customer => [
      customer._id,
      `"${customer.name}"`,
      customer.email,
      customer.role,
      customer.totalOrders,
      customer.totalSpent,
      customer.createdAt
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private generateRevenueCSV(): string {
    const headers = ['Metric', 'Value', 'Growth %', 'Period'];
    const rows = [
      ['Total Revenue', this.revenueData.totalRevenue, this.revenueData.revenueGrowth, this.getDateRangeLabel()],
      ['Monthly Revenue', this.revenueData.monthlyRevenue, this.revenueData.revenueGrowth, 'Monthly'],
      ['Total Orders', this.revenueData.totalOrders, this.revenueData.orderGrowth, this.getDateRangeLabel()],
      ['Average Order Value', this.revenueData.averageOrderValue, 'N/A', this.getDateRangeLabel()],
      ['Online Revenue', Math.round(this.revenueData.totalRevenue * 0.8), 'N/A', this.getDateRangeLabel()],
      ['Offline Revenue', Math.round(this.revenueData.totalRevenue * 0.2), 'N/A', this.getDateRangeLabel()]
    ];

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private generateAllDataCSV(): string {
    const timestamp = new Date().toISOString().split('T')[0];
    const header = `We3Studio Complete Data Export - ${timestamp}\n\n`;
    
    const productsSection = `PRODUCTS DATA\n${this.generateProductsCSV()}\n\n`;
    const customersSection = `CUSTOMERS DATA\n${this.generateCustomersCSV()}\n\n`;
    const revenueSection = `REVENUE DATA\n${this.generateRevenueCSV()}\n\n`;
    
    const topProductsSection = `TOP SELLING PRODUCTS\n${this.generateTopProductsCSV()}\n\n`;
    const recentOrdersSection = `RECENT ORDERS\n${this.generateRecentOrdersCSV()}\n\n`;

    return header + productsSection + customersSection + revenueSection + topProductsSection + recentOrdersSection;
  }

  private generateTopProductsCSV(): string {
    const headers = ['Rank', 'Product Name', 'Sales Count', 'Revenue'];
    const rows = this.revenueData.topProducts.map((product, index) => [
      index + 1,
      `"${product.name}"`,
      product.sales,
      product.revenue
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private generateRecentOrdersCSV(): string {
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Total Amount', 'Status', 'Order Date'];
    const rows = this.revenueData.recentOrders.map(order => [
      order._id,
      `"${order.customerName}"`,
      order.customerEmail,
      order.totalAmount,
      order.status,
      order.createdAt
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private downloadCSV(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  onCustomDateRangeChange(): void {
    if (this.customStartDate && this.customEndDate) {
      const days = this.calculateDaysBetween(this.customStartDate, this.customEndDate);
      const filteredData = this.calculateFilteredRevenue(days);
      
      this.revenueData = {
        ...this.revenueData,
        ...filteredData
      };
      
      this.snackBar.open(`Revenue data filtered for custom range: ${this.customStartDate.toDateString()} to ${this.customEndDate.toDateString()}`, 'Close', { duration: 3000 });
    }
  }

  private calculateDaysBetween(startDate: Date, endDate: Date): number {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  onTabChange(event: any): void {
    console.log('Tab changed:', event);
  }

  generateMockProducts(): ProductWithSelection[] {
    return [
      {
        _id: '1',
        name: 'Premium Canvas Print 8x10',
        description: 'High-quality canvas print perfect for home decoration',
        category: 'Canvas Prints',
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
        sizes: [{ size: '8x10', price: 150 }],
        paperTypes: ['Canvas'],
        isActive: true,
        isPremium: true,
        premiumBadge: 'Perfect Gift',
        discountPercentage: 15,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        selected: false
      },
      {
        _id: '2',
        name: 'Tamil Wedding Album Template',
        description: 'Beautiful traditional Tamil wedding album design',
        category: 'Wedding Albums',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        sizes: [{ size: '12x12', price: 200 }],
        paperTypes: ['Premium Paper'],
        isActive: true,
        isPremium: true,
        premiumBadge: 'Memories Forever',
        discountPercentage: 20,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        selected: false
      },
      {
        _id: '3',
        name: 'Custom Mug Printing',
        description: 'Personalized mug with your favorite photo',
        category: 'Mug Printing',
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400',
        sizes: [{ size: 'Standard', price: 100 }],
        paperTypes: ['Ceramic'],
        isActive: true,
        isPremium: false,
        premiumBadge: undefined,
        discountPercentage: 0,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        selected: false
      }
    ];
  }

  generateMockCustomers(): Customer[] {
    return [
      {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: '2024-01-15',
        totalOrders: 5,
        totalSpent: 750
      },
      {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'admin',
        createdAt: '2024-01-10',
        totalOrders: 12,
        totalSpent: 1800
      },
      {
        _id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'user',
        createdAt: '2024-02-01',
        totalOrders: 3,
        totalSpent: 450
      }
    ];
  }

  // Helper methods for template
  getBusinessName(): string {
    return this.settingsService?.getBusinessName() || 'We3Studio';
  }

  getCurrentUserName(): string | undefined {
    return this.authService.getCurrentUser()?.name;
  }

  getCurrentUserRole(): string | undefined {
    return this.authService.getCurrentUser()?.role;
  }

  getAdminCount(): number {
    return this.customers.filter(c => c.role === 'admin').length;
  }

  getUserCount(): number {
    return this.customers.filter(c => c.role === 'user').length;
  }

  // Bulk Operations Methods
  toggleProductSelection(product: ProductWithSelection): void {
    if (product.selected) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p._id !== product._id);
    }
  }

  clearSelection(): void {
    this.products.forEach(product => {
      product.selected = false;
    });
    this.selectedProducts = [];
    this.snackBar.open('Selection cleared', 'Close', { duration: 2000 });
  }

  bulkUpdateCategory(): void {
    if (this.selectedProducts.length === 0) {
      this.snackBar.open('Please select products first', 'Close', { duration: 3000 });
      return;
    }

    const newCategory = prompt(`Update category for ${this.selectedProducts.length} products:\n\nAvailable categories:\n- Photo Prints\n- Canvas Prints\n- Wedding Albums\n- Mug Printing\n- T-shirt Printing\n\nEnter new category:`);
    
    if (newCategory && newCategory.trim()) {
      this.selectedProducts.forEach(product => {
        product.category = newCategory.trim();
      });
      this.filterProducts();
      this.snackBar.open(`Category updated to "${newCategory}" for ${this.selectedProducts.length} products`, 'Close', { duration: 3000 });
      this.clearSelection();
    }
  }

  bulkUpdatePricing(): void {
    if (this.selectedProducts.length === 0) {
      this.snackBar.open('Please select products first', 'Close', { duration: 3000 });
      return;
    }

    const adjustmentType = prompt(`Update pricing for ${this.selectedProducts.length} products:\n\n1. Percentage increase/decrease (e.g., 10 for +10%, -5 for -5%)\n2. Fixed amount increase/decrease (e.g., 50 for +₹50, -25 for -₹25)\n\nEnter adjustment:`);
    
    if (adjustmentType && adjustmentType.trim()) {
      const adjustmentValue = parseFloat(adjustmentType);
      
      if (!isNaN(adjustmentValue)) {
        this.selectedProducts.forEach(product => {
          product.sizes.forEach(size => {
            if (adjustmentValue > 0 && adjustmentValue <= 100) {
              // Percentage adjustment
              size.price = Math.round(size.price * (1 + adjustmentValue / 100));
            } else if (adjustmentValue > 100) {
              // Fixed amount adjustment
              size.price = Math.round(size.price + adjustmentValue);
            } else if (adjustmentValue < 0 && adjustmentValue >= -100) {
              // Percentage decrease
              size.price = Math.round(size.price * (1 + adjustmentValue / 100));
            } else if (adjustmentValue < -100) {
              // Fixed amount decrease
              size.price = Math.round(size.price + adjustmentValue);
            }
            // Ensure price doesn't go below 0
            size.price = Math.max(0, size.price);
          });
        });
        
        this.filterProducts();
        this.snackBar.open(`Pricing updated for ${this.selectedProducts.length} products`, 'Close', { duration: 3000 });
        this.clearSelection();
      } else {
        this.snackBar.open('Invalid adjustment value', 'Close', { duration: 3000 });
      }
    }
  }

  bulkTogglePremium(): void {
    if (this.selectedProducts.length === 0) {
      this.snackBar.open('Please select products first', 'Close', { duration: 3000 });
      return;
    }

    const premiumStatus = prompt(`Toggle premium status for ${this.selectedProducts.length} products:\n\n1. Enable premium\n2. Disable premium\n3. Toggle (switch current status)\n\nEnter choice (1, 2, or 3):`);
    
    if (premiumStatus && premiumStatus.trim()) {
      const choice = parseInt(premiumStatus);
      
      if (choice === 1) {
        // Enable premium
        const badgeOptions = ['Perfect Gift', 'Memories Forever', 'Love & Care', 'Special Moments', 'Heartfelt Gift', 'Cherished Memories'];
        const badgeChoice = prompt(`Choose premium badge for ${this.selectedProducts.length} products:\n\n1. Perfect Gift\n2. Memories Forever\n3. Love & Care\n4. Special Moments\n5. Heartfelt Gift\n6. Cherished Memories\n\nEnter number (1-6):`);
        
        const badgeIndex = parseInt(badgeChoice || '1') - 1;
        const selectedBadge = badgeOptions[Math.max(0, Math.min(5, badgeIndex))] as 'Perfect Gift' | 'Memories Forever' | 'Love & Care' | 'Special Moments' | 'Heartfelt Gift' | 'Cherished Memories';
        
        const discount = prompt('Enter discount percentage (0-50):') || '15';
        const discountValue = Math.min(50, Math.max(0, parseInt(discount) || 15));
        
        this.selectedProducts.forEach(product => {
          product.isPremium = true;
          product.premiumBadge = selectedBadge;
          product.discountPercentage = discountValue;
        });
        
        this.snackBar.open(`Premium enabled for ${this.selectedProducts.length} products`, 'Close', { duration: 3000 });
      } else if (choice === 2) {
        // Disable premium
        this.selectedProducts.forEach(product => {
          product.isPremium = false;
          product.premiumBadge = undefined;
          product.discountPercentage = 0;
        });
        
        this.snackBar.open(`Premium disabled for ${this.selectedProducts.length} products`, 'Close', { duration: 3000 });
      } else if (choice === 3) {
        // Toggle
        this.selectedProducts.forEach(product => {
          product.isPremium = !product.isPremium;
          if (product.isPremium && !product.premiumBadge) {
            product.premiumBadge = 'Perfect Gift';
            product.discountPercentage = 15;
          } else if (!product.isPremium) {
            product.premiumBadge = undefined;
            product.discountPercentage = 0;
          }
        });
        
        this.snackBar.open(`Premium status toggled for ${this.selectedProducts.length} products`, 'Close', { duration: 3000 });
      } else {
        this.snackBar.open('Invalid choice', 'Close', { duration: 3000 });
        return;
      }
      
      this.filterProducts();
      this.clearSelection();
    }
  }

  bulkDeleteProducts(): void {
    if (this.selectedProducts.length === 0) {
      this.snackBar.open('Please select products first', 'Close', { duration: 3000 });
      return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete ${this.selectedProducts.length} products?\n\nThis action cannot be undone.`);
    
    if (confirmDelete) {
      const productNames = this.selectedProducts.map(p => p.name).join(', ');
      
      this.selectedProducts.forEach(product => {
        const index = this.products.indexOf(product);
        if (index > -1) {
          this.products.splice(index, 1);
        }
      });
      
      this.selectedProducts = [];
      this.filterProducts();
      this.snackBar.open(`${this.selectedProducts.length} products deleted successfully`, 'Close', { duration: 3000 });
    }
  }
}
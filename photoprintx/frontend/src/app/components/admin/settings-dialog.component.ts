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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { SettingsService, AppSettings } from '../../services/settings.service';

@Component({
  selector: 'app-settings-dialog',
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
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDividerModule
  ],
  template: `
    <div class="settings-dialog">
      <h2 mat-dialog-title>
        <mat-icon>settings</mat-icon>
        We3Studio Settings
      </h2>

      <mat-dialog-content class="dialog-content">
        <mat-tab-group>
          <!-- General Settings Tab -->
          <mat-tab label="General">
            <div class="tab-content">
              <form [formGroup]="generalForm">
                <mat-card class="settings-card">
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>business</mat-icon>
                      Business Information
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="form-row">
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Business Name</mat-label>
                        <input matInput formControlName="businessName" placeholder="We3Studio">
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Business Email</mat-label>
                        <input matInput formControlName="businessEmail" type="email" placeholder="info@we3studio.com">
                      </mat-form-field>
                    </div>
                    <div class="form-row">
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Phone Number</mat-label>
                        <input matInput formControlName="phoneNumber" placeholder="+91 9876543210">
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Website</mat-label>
                        <input matInput formControlName="website" placeholder="https://we3studio.com">
                      </mat-form-field>
                    </div>
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Business Address</mat-label>
                      <textarea matInput formControlName="address" rows="3" placeholder="Enter your business address"></textarea>
                    </mat-form-field>
                  </mat-card-content>
                </mat-card>

                <mat-card class="settings-card">
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>palette</mat-icon>
                      Branding
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="form-row">
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Primary Color</mat-label>
                        <input matInput formControlName="primaryColor" type="color" value="#2196f3">
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Secondary Color</mat-label>
                        <input matInput formControlName="secondaryColor" type="color" value="#ff6b6b">
                      </mat-form-field>
                    </div>
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Logo URL</mat-label>
                      <input matInput formControlName="logoUrl" placeholder="https://example.com/logo.png">
                    </mat-form-field>
                  </mat-card-content>
                </mat-card>
              </form>
            </div>
          </mat-tab>

          <!-- Product Settings Tab -->
          <mat-tab label="Products">
            <div class="tab-content">
              <form [formGroup]="productForm">
                <mat-card class="settings-card">
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>inventory</mat-icon>
                      Product Management
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="form-row">
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Default Currency</mat-label>
                        <mat-select formControlName="defaultCurrency">
                          <mat-option value="INR">Indian Rupee (₹)</mat-option>
                          <mat-option value="USD">US Dollar ($)</mat-option>
                          <mat-option value="EUR">Euro (€)</mat-option>
                        </mat-select>
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Default Tax Rate (%)</mat-label>
                        <input matInput formControlName="taxRate" type="number" min="0" max="100">
                      </mat-form-field>
                    </div>
                    <div class="form-row">
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Minimum Order Value</mat-label>
                        <input matInput formControlName="minOrderValue" type="number" min="0">
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Free Shipping Threshold</mat-label>
                        <input matInput formControlName="freeShippingThreshold" type="number" min="0">
                      </mat-form-field>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="settings-card">
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>local_shipping</mat-icon>
                      Shipping & Delivery
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="form-row">
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Standard Shipping Days</mat-label>
                        <input matInput formControlName="standardShippingDays" type="number" min="1">
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Express Shipping Days</mat-label>
                        <input matInput formControlName="expressShippingDays" type="number" min="1">
                      </mat-form-field>
                    </div>
                    <div class="form-row">
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Standard Shipping Cost</mat-label>
                        <input matInput formControlName="standardShippingCost" type="number" min="0">
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="form-field">
                        <mat-label>Express Shipping Cost</mat-label>
                        <input matInput formControlName="expressShippingCost" type="number" min="0">
                      </mat-form-field>
                    </div>
                  </mat-card-content>
                </mat-card>
              </form>
            </div>
          </mat-tab>

          <!-- User Preferences Tab -->
          <mat-tab label="Preferences">
            <div class="tab-content">
              <form [formGroup]="preferencesForm">
                <mat-card class="settings-card">
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>person</mat-icon>
                      User Preferences
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="preference-item">
                      <mat-slide-toggle formControlName="darkMode">
                        <div class="preference-content">
                          <mat-icon>dark_mode</mat-icon>
                          <div>
                            <strong>Dark Mode</strong>
                            <p>Switch to dark theme for better viewing in low light</p>
                          </div>
                        </div>
                      </mat-slide-toggle>
                    </div>

                    <div class="preference-item">
                      <mat-slide-toggle formControlName="notifications">
                        <div class="preference-content">
                          <mat-icon>notifications</mat-icon>
                          <div>
                            <strong>Email Notifications</strong>
                            <p>Receive email updates about orders and system changes</p>
                          </div>
                        </div>
                      </mat-slide-toggle>
                    </div>

                    <div class="preference-item">
                      <mat-slide-toggle formControlName="autoSave">
                        <div class="preference-content">
                          <mat-icon>save</mat-icon>
                          <div>
                            <strong>Auto Save</strong>
                            <p>Automatically save changes while editing products</p>
                          </div>
                        </div>
                      </mat-slide-toggle>
                    </div>

                    <div class="preference-item">
                      <mat-slide-toggle formControlName="showTutorials">
                        <div class="preference-content">
                          <mat-icon>help</mat-icon>
                          <div>
                            <strong>Show Tutorials</strong>
                            <p>Display helpful tips and tutorials for new features</p>
                          </div>
                        </div>
                      </mat-slide-toggle>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="settings-card">
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>dashboard</mat-icon>
                      Dashboard Preferences
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <mat-form-field appearance="outline" class="form-field">
                      <mat-label>Default Date Range</mat-label>
                      <mat-select formControlName="defaultDateRange">
                        <mat-option value="7">Last 7 days</mat-option>
                        <mat-option value="30">Last 30 days</mat-option>
                        <mat-option value="90">Last 90 days</mat-option>
                        <mat-option value="365">Last year</mat-option>
                      </mat-select>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="form-field">
                      <mat-label>Products Per Page</mat-label>
                      <mat-select formControlName="productsPerPage">
                        <mat-option value="10">10 products</mat-option>
                        <mat-option value="25">25 products</mat-option>
                        <mat-option value="50">50 products</mat-option>
                        <mat-option value="100">100 products</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </mat-card-content>
                </mat-card>
              </form>
            </div>
          </mat-tab>

          <!-- System Settings Tab -->
          <mat-tab label="System">
            <div class="tab-content">
              <form [formGroup]="systemForm">
                <mat-card class="settings-card">
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>security</mat-icon>
                      Security Settings
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="preference-item">
                      <mat-slide-toggle formControlName="twoFactorAuth">
                        <div class="preference-content">
                          <mat-icon>security</mat-icon>
                          <div>
                            <strong>Two-Factor Authentication</strong>
                            <p>Add an extra layer of security to your account</p>
                          </div>
                        </div>
                      </mat-slide-toggle>
                    </div>

                    <div class="preference-item">
                      <mat-slide-toggle formControlName="sessionTimeout">
                        <div class="preference-content">
                          <mat-icon>schedule</mat-icon>
                          <div>
                            <strong>Auto Logout</strong>
                            <p>Automatically logout after period of inactivity</p>
                          </div>
                        </div>
                      </mat-slide-toggle>
                    </div>

                    <mat-form-field appearance="outline" class="form-field">
                      <mat-label>Session Timeout (minutes)</mat-label>
                      <input matInput formControlName="sessionTimeoutMinutes" type="number" min="5" max="480">
                    </mat-form-field>
                  </mat-card-content>
                </mat-card>

                <mat-card class="settings-card">
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>backup</mat-icon>
                      Backup & Maintenance
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="preference-item">
                      <mat-slide-toggle formControlName="autoBackup">
                        <div class="preference-content">
                          <mat-icon>backup</mat-icon>
                          <div>
                            <strong>Automatic Backup</strong>
                            <p>Automatically backup data daily</p>
                          </div>
                        </div>
                      </mat-slide-toggle>
                    </div>

                    <div class="preference-item">
                      <mat-slide-toggle formControlName="maintenanceMode">
                        <div class="preference-content">
                          <mat-icon>build</mat-icon>
                          <div>
                            <strong>Maintenance Mode</strong>
                            <p>Enable maintenance mode for system updates</p>
                          </div>
                        </div>
                      </mat-slide-toggle>
                    </div>

                    <div class="action-buttons">
                      <button mat-raised-button color="primary" (click)="exportData()">
                        <mat-icon>download</mat-icon>
                        Export Data
                      </button>
                      <button mat-raised-button color="accent" (click)="clearCache()">
                        <mat-icon>cached</mat-icon>
                        Clear Cache
                      </button>
                    </div>
                  </mat-card-content>
                </mat-card>
              </form>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button (click)="resetToDefaults()">Reset to Defaults</button>
        <button mat-raised-button color="primary" (click)="onSave()">
          <mat-icon>save</mat-icon>
          Save Settings
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .settings-dialog {
      max-width: 900px;
      width: 100%;
    }

    .dialog-content {
      max-height: 80vh;
      overflow-y: auto;
      padding: 20px;
    }

    .tab-content {
      padding: 20px 0;
    }

    .settings-card {
      margin-bottom: 20px;
    }

    .settings-card mat-card-header {
      background: #f5f5f5;
      margin: -16px -16px 16px -16px;
      padding: 16px;
      border-radius: 4px 4px 0 0;
    }

    .settings-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #2c3e50;
      font-size: 1.1em;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 15px;
    }

    .form-field {
      width: 100%;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .preference-item {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;
    }

    .preference-content {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .preference-content mat-icon {
      color: #666;
    }

    .preference-content div {
      flex: 1;
    }

    .preference-content strong {
      display: block;
      color: #2c3e50;
      margin-bottom: 4px;
    }

    .preference-content p {
      margin: 0;
      color: #666;
      font-size: 0.9em;
    }

    .action-buttons {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }

    .dialog-actions {
      padding: 20px;
      border-top: 1px solid #e0e0e0;
      justify-content: space-between;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .action-buttons {
        flex-direction: column;
      }

      .preference-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  `]
})
export class SettingsDialogComponent {
  generalForm!: FormGroup;
  productForm!: FormGroup;
  preferencesForm!: FormGroup;
  systemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) {
    this.initializeForms();
    this.loadSettings();
  }

  private initializeForms(): void {
    this.generalForm = this.fb.group({
      businessName: ['We3Studio'],
      businessEmail: ['info@we3studio.com'],
      phoneNumber: ['+91 9876543210'],
      website: ['https://we3studio.com'],
      address: [''],
      primaryColor: ['#2196f3'],
      secondaryColor: ['#ff6b6b'],
      logoUrl: ['']
    });

    this.productForm = this.fb.group({
      defaultCurrency: ['INR'],
      taxRate: [18],
      minOrderValue: [500],
      freeShippingThreshold: [2000],
      standardShippingDays: [5],
      expressShippingDays: [2],
      standardShippingCost: [100],
      expressShippingCost: [250]
    });

    this.preferencesForm = this.fb.group({
      darkMode: [false],
      notifications: [true],
      autoSave: [true],
      showTutorials: [true],
      defaultDateRange: ['30'],
      productsPerPage: ['25']
    });

    this.systemForm = this.fb.group({
      twoFactorAuth: [false],
      sessionTimeout: [true],
      sessionTimeoutMinutes: [30],
      autoBackup: [true],
      maintenanceMode: [false]
    });
  }

  private loadSettings(): void {
    // Load settings from settings service
    const currentSettings = this.settingsService.getSettings();
    this.generalForm.patchValue(currentSettings.general);
    this.productForm.patchValue(currentSettings.product);
    this.preferencesForm.patchValue(currentSettings.preferences);
    this.systemForm.patchValue(currentSettings.system);
  }

  onSave(): void {
    const settings = {
      general: this.generalForm.value,
      product: this.productForm.value,
      preferences: this.preferencesForm.value,
      system: this.systemForm.value
    };

    // Save using settings service
    this.settingsService.updateSettings(settings);
    this.snackBar.open('Settings saved and applied successfully!', 'Close', { duration: 3000 });
    this.dialogRef.close(settings);
  }

  resetToDefaults(): void {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      this.settingsService.resetToDefaults();
      this.loadSettings();
      this.snackBar.open('Settings reset to defaults', 'Close', { duration: 2000 });
    }
  }

  exportData(): void {
    const settings = {
      general: this.generalForm.value,
      product: this.productForm.value,
      preferences: this.preferencesForm.value,
      system: this.systemForm.value,
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'we3studio-settings.json';
    link.click();
    
    URL.revokeObjectURL(url);
    this.snackBar.open('Settings exported successfully!', 'Close', { duration: 2000 });
  }

  clearCache(): void {
    if (confirm('Are you sure you want to clear the application cache?')) {
      localStorage.removeItem('we3studio-cache');
      this.snackBar.open('Cache cleared successfully!', 'Close', { duration: 2000 });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

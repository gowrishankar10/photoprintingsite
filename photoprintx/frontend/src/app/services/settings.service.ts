import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface GeneralSettings {
  businessName: string;
  businessEmail: string;
  phoneNumber: string;
  website: string;
  address: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
}

export interface ProductSettings {
  defaultCurrency: string;
  taxRate: number;
  minOrderValue: number;
  freeShippingThreshold: number;
  standardShippingDays: number;
  expressShippingDays: number;
  standardShippingCost: number;
  expressShippingCost: number;
}

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  autoSave: boolean;
  showTutorials: boolean;
  defaultDateRange: string;
  productsPerPage: number;
}

export interface SystemSettings {
  twoFactorAuth: boolean;
  sessionTimeout: boolean;
  sessionTimeoutMinutes: number;
  autoBackup: boolean;
  maintenanceMode: boolean;
}

export interface AppSettings {
  general: GeneralSettings;
  product: ProductSettings;
  preferences: UserPreferences;
  system: SystemSettings;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject = new BehaviorSubject<AppSettings>(this.getDefaultSettings());
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.loadSettings();
  }

  private getDefaultSettings(): AppSettings {
    return {
      general: {
        businessName: 'We3Studio',
        businessEmail: 'info@we3studio.com',
        phoneNumber: '+91 9876543210',
        website: 'https://we3studio.com',
        address: '',
        primaryColor: '#2196f3',
        secondaryColor: '#ff6b6b',
        logoUrl: ''
      },
      product: {
        defaultCurrency: 'INR',
        taxRate: 18,
        minOrderValue: 500,
        freeShippingThreshold: 2000,
        standardShippingDays: 5,
        expressShippingDays: 2,
        standardShippingCost: 100,
        expressShippingCost: 250
      },
      preferences: {
        darkMode: false,
        notifications: true,
        autoSave: true,
        showTutorials: true,
        defaultDateRange: '30',
        productsPerPage: 25
      },
      system: {
        twoFactorAuth: false,
        sessionTimeout: true,
        sessionTimeoutMinutes: 30,
        autoBackup: true,
        maintenanceMode: false
      },
      lastUpdated: new Date().toISOString()
    };
  }

  private loadSettings(): void {
    const savedSettings = localStorage.getItem('we3studio-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        this.settingsSubject.next({ ...this.getDefaultSettings(), ...settings });
        this.applySettings(settings);
      } catch (error) {
        console.error('Error loading settings:', error);
        this.settingsSubject.next(this.getDefaultSettings());
      }
    } else {
      this.applySettings(this.getDefaultSettings());
    }
  }

  public getSettings(): AppSettings {
    return this.settingsSubject.value;
  }

  public updateSettings(newSettings: Partial<AppSettings>): void {
    const currentSettings = this.settingsSubject.value;
    const updatedSettings = {
      ...currentSettings,
      ...newSettings,
      lastUpdated: new Date().toISOString()
    };

    this.settingsSubject.next(updatedSettings);
    localStorage.setItem('we3studio-settings', JSON.stringify(updatedSettings));
    this.applySettings(updatedSettings);
  }

  private applySettings(settings: AppSettings): void {
    this.applyGeneralSettings(settings.general);
    this.applyProductSettings(settings.product);
    this.applyUserPreferences(settings.preferences);
    this.applySystemSettings(settings.system);
  }

  private applyGeneralSettings(general: GeneralSettings): void {
    // Apply business name to document title
    document.title = `${general.businessName} - Admin Dashboard`;
    
    // Apply primary and secondary colors to CSS custom properties
    document.documentElement.style.setProperty('--primary-color', general.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', general.secondaryColor);
    
    // Update meta tags
    this.updateMetaTag('description', `${general.businessName} - Professional photo printing services`);
    this.updateMetaTag('keywords', `${general.businessName}, photo printing, canvas prints, photo books`);
    
    // Store business info for use in components
    localStorage.setItem('business-info', JSON.stringify(general));
  }

  private applyProductSettings(product: ProductSettings): void {
    // Store product settings for use in pricing calculations
    localStorage.setItem('product-settings', JSON.stringify(product));
    
    // Apply currency symbol
    const currencySymbols: { [key: string]: string } = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€'
    };
    
    const currencySymbol = currencySymbols[product.defaultCurrency] || '₹';
    document.documentElement.style.setProperty('--currency-symbol', currencySymbol);
  }

  private applyUserPreferences(preferences: UserPreferences): void {
    // Apply dark mode
    if (preferences.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Store preferences for use in components
    localStorage.setItem('user-preferences', JSON.stringify(preferences));
    
    // Apply products per page setting
    localStorage.setItem('products-per-page', preferences.productsPerPage.toString());
    
    // Apply default date range
    localStorage.setItem('default-date-range', preferences.defaultDateRange);
  }

  private applySystemSettings(system: SystemSettings): void {
    // Store system settings
    localStorage.setItem('system-settings', JSON.stringify(system));
    
    // Apply session timeout if enabled
    if (system.sessionTimeout) {
      this.setupSessionTimeout(system.sessionTimeoutMinutes);
    }
    
    // Apply maintenance mode
    if (system.maintenanceMode) {
      this.enableMaintenanceMode();
    } else {
      this.disableMaintenanceMode();
    }
  }

  private updateMetaTag(name: string, content: string): void {
    let metaTag = document.querySelector(`meta[name="${name}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', name);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  }

  private setupSessionTimeout(minutes: number): void {
    // Clear existing timeout
    if ((window as any).sessionTimeoutId) {
      clearTimeout((window as any).sessionTimeoutId);
    }
    
    // Set new timeout
    const timeoutMs = minutes * 60 * 1000;
    (window as any).sessionTimeoutId = setTimeout(() => {
      this.handleSessionTimeout();
    }, timeoutMs);
    
    // Reset timeout on user activity
    const resetTimeout = () => {
      clearTimeout((window as any).sessionTimeoutId);
      (window as any).sessionTimeoutId = setTimeout(() => {
        this.handleSessionTimeout();
      }, timeoutMs);
    };
    
    // Listen for user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetTimeout, true);
    });
  }

  private handleSessionTimeout(): void {
    alert('Your session has expired due to inactivity. Please log in again.');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  private enableMaintenanceMode(): void {
    const maintenanceBanner = document.createElement('div');
    maintenanceBanner.id = 'maintenance-banner';
    maintenanceBanner.innerHTML = `
      <div style="background: #ff9800; color: white; text-align: center; padding: 10px; font-weight: bold;">
        🔧 System is currently under maintenance. Some features may be unavailable.
      </div>
    `;
    document.body.insertBefore(maintenanceBanner, document.body.firstChild);
  }

  private disableMaintenanceMode(): void {
    const maintenanceBanner = document.getElementById('maintenance-banner');
    if (maintenanceBanner) {
      maintenanceBanner.remove();
    }
  }

  // Helper methods for components to access specific settings
  public getBusinessName(): string {
    return this.settingsSubject.value.general.businessName;
  }

  public getCurrencySymbol(): string {
    const currency = this.settingsSubject.value.product.defaultCurrency;
    const currencySymbols: { [key: string]: string } = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€'
    };
    return currencySymbols[currency] || '₹';
  }

  public getTaxRate(): number {
    return this.settingsSubject.value.product.taxRate;
  }

  public getMinOrderValue(): number {
    return this.settingsSubject.value.product.minOrderValue;
  }

  public getFreeShippingThreshold(): number {
    return this.settingsSubject.value.product.freeShippingThreshold;
  }

  public isDarkMode(): boolean {
    return this.settingsSubject.value.preferences.darkMode;
  }

  public getProductsPerPage(): number {
    return this.settingsSubject.value.preferences.productsPerPage;
  }

  public getDefaultDateRange(): string {
    return this.settingsSubject.value.preferences.defaultDateRange;
  }

  public isMaintenanceMode(): boolean {
    return this.settingsSubject.value.system.maintenanceMode;
  }

  public resetToDefaults(): void {
    const defaultSettings = this.getDefaultSettings();
    this.settingsSubject.next(defaultSettings);
    localStorage.setItem('we3studio-settings', JSON.stringify(defaultSettings));
    this.applySettings(defaultSettings);
  }
}

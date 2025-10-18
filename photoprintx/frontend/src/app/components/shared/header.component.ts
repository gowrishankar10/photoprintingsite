import { Component, HostListener } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <span routerLink="/home" style="cursor: pointer; font-weight: bold; font-size: 1.2em;">{{ businessName }}</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/home">
        <mat-icon>home</mat-icon>
        Home
      </button>
      <button mat-button routerLink="/products">
        <mat-icon>inventory</mat-icon>
        Products
      </button>
      <button mat-button routerLink="/contact">
        <mat-icon>contact_phone</mat-icon>
        Contact
      </button>
      <button mat-button routerLink="/admin" *ngIf="authService.isLoggedIn() && authService.getCurrentUser()?.role === 'admin'">
        <mat-icon>admin_panel_settings</mat-icon>
        Admin Dashboard
      </button>
      <button mat-button routerLink="/login" *ngIf="!authService.isLoggedIn()">
        <mat-icon>login</mat-icon>
        Login
      </button>
      <button mat-button routerLink="/register" *ngIf="!authService.isLoggedIn()">
        <mat-icon>person_add</mat-icon>
        Register
      </button>
      <button mat-button (click)="logout()" *ngIf="authService.isLoggedIn()">
        <mat-icon>logout</mat-icon>
        Logout
      </button>
    </mat-toolbar>

    <!-- Mobile Navigation (Hamburger Menu) -->
    <mat-toolbar class="mobile-toolbar" *ngIf="isMobile">
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>menu</mat-icon>
      </button>
      <span routerLink="/home" style="cursor: pointer; font-weight: bold; font-size: 1.2em; flex: 1;">{{ businessName }}</span>
      <mat-menu #menu="matMenu">
        <button mat-menu-item routerLink="/home">
          <mat-icon>home</mat-icon>
          Home
        </button>
        <button mat-menu-item routerLink="/products">
          <mat-icon>inventory</mat-icon>
          Products
        </button>
        <button mat-menu-item routerLink="/contact">
          <mat-icon>contact_phone</mat-icon>
          Contact
        </button>
        <button mat-menu-item routerLink="/admin" *ngIf="authService.isLoggedIn() && authService.getCurrentUser()?.role === 'admin'">
          <mat-icon>admin_panel_settings</mat-icon>
          Admin Dashboard
        </button>
        <button mat-menu-item routerLink="/login" *ngIf="!authService.isLoggedIn()">
          <mat-icon>login</mat-icon>
          Login
        </button>
        <button mat-menu-item routerLink="/register" *ngIf="!authService.isLoggedIn()">
          <mat-icon>person_add</mat-icon>
          Register
        </button>
        <button mat-menu-item (click)="logout()" *ngIf="authService.isLoggedIn()">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    .mobile-toolbar {
      display: none;
    }

    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
      .mobile-toolbar {
        display: flex;
      }
      
      mat-toolbar:not(.mobile-toolbar) {
        display: none;
      }
      mat-toolbar {
        padding: 0 8px;
      }

      mat-toolbar span {
        font-size: 16px;
      }

      mat-toolbar button {
        font-size: 12px;
        padding: 0 8px;
        min-width: auto;
      }

      mat-toolbar button mat-icon {
        font-size: 16px;
        margin-right: 4px;
      }

      .spacer {
        flex: 0.5 1 auto;
      }
    }

    @media (max-width: 480px) {
      mat-toolbar {
        padding: 0 4px;
      }

      mat-toolbar span {
        font-size: 14px;
      }

      mat-toolbar button {
        font-size: 10px;
        padding: 0 4px;
        min-width: auto;
      }

      mat-toolbar button mat-icon {
        font-size: 14px;
        margin-right: 2px;
      }

      .spacer {
        flex: 0.3 1 auto;
      }
    }
  `]
})
export class HeaderComponent {
  businessName = 'We3Studio';
  isMobile = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private settingsService: SettingsService
  ) {
    // Subscribe to settings changes
    this.settingsService.settings$.subscribe(settings => {
      this.businessName = settings.general.businessName;
    });
    
    // Check initial screen size
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

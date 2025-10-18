import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  template: `
    <div class="contact-container">
      <!-- Header Section -->
      <div class="contact-header">
        <h1 class="contact-title">Get in Touch with We3Studio</h1>
        <p class="contact-subtitle">We're here to help you preserve your precious memories. Reach out to us anytime!</p>
      </div>

      <div class="contact-content">
        <!-- Contact Methods Section -->
        <div class="contact-methods-section">
          <h2 class="section-title">
            <mat-icon class="section-icon">contact_phone</mat-icon>
            Ways to Reach Us
          </h2>
          
          <div class="contact-methods-grid">
            <!-- Phone Contact -->
            <mat-card class="contact-method-card">
              <mat-card-header>
                <mat-icon class="method-icon phone-icon">phone</mat-icon>
                <mat-card-title>Call Us</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p class="contact-info">Speak directly with our customer service team</p>
                <div class="contact-details">
                  <div class="contact-item">
                    <strong>Customer Service:</strong>
                    <a href="tel:+919876543210" class="contact-link">+91 98765 43210</a>
                  </div>
                  <div class="contact-item">
                    <strong>Business Hours:</strong>
                    <span>Mon-Sat: 9:00 AM - 7:00 PM</span>
                  </div>
                  <div class="contact-item">
                    <strong>Sunday:</strong>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                </div>
                <button mat-raised-button color="primary" class="action-button" (click)="callNow()">
                  <mat-icon>phone</mat-icon>
                  Call Now
                </button>
              </mat-card-content>
            </mat-card>

            <!-- WhatsApp Contact -->
            <mat-card class="contact-method-card">
              <mat-card-header>
                <mat-icon class="method-icon whatsapp-icon">chat</mat-icon>
                <mat-card-title>WhatsApp</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p class="contact-info">Quick support and instant responses</p>
                <div class="contact-details">
                  <div class="contact-item">
                    <strong>WhatsApp Number:</strong>
                    <a href="https://wa.me/919876543210" class="contact-link" target="_blank">+91 98765 43210</a>
                  </div>
                  <div class="contact-item">
                    <strong>Response Time:</strong>
                    <span>Usually within 5 minutes</span>
                  </div>
                  <div class="contact-item">
                    <strong>Available:</strong>
                    <span>24/7 for urgent queries</span>
                  </div>
                </div>
                <button mat-raised-button color="accent" class="action-button" (click)="openWhatsApp()">
                  <mat-icon>chat</mat-icon>
                  Chat on WhatsApp
                </button>
              </mat-card-content>
            </mat-card>

            <!-- Email Contact -->
            <mat-card class="contact-method-card">
              <mat-card-header>
                <mat-icon class="method-icon email-icon">email</mat-icon>
                <mat-card-title>Email Us</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p class="contact-info">Send us detailed queries and feedback</p>
                <div class="contact-details">
                  <div class="contact-item">
                    <strong>General Inquiries:</strong>
                    <a href="mailto:info&#64;we3studio.com" class="contact-link">info&#64;we3studio.com</a>
                  </div>
                  <div class="contact-item">
                    <strong>Support:</strong>
                    <a href="mailto:support&#64;we3studio.com" class="contact-link">support&#64;we3studio.com</a>
                  </div>
                  <div class="contact-item">
                    <strong>Business:</strong>
                    <a href="mailto:business&#64;we3studio.com" class="contact-link">business&#64;we3studio.com</a>
                  </div>
                </div>
                <button mat-raised-button color="primary" class="action-button" (click)="sendEmail()">
                  <mat-icon>email</mat-icon>
                  Send Email
                </button>
              </mat-card-content>
            </mat-card>

            <!-- Visit Us -->
            <mat-card class="contact-method-card">
              <mat-card-header>
                <mat-icon class="method-icon location-icon">location_on</mat-icon>
                <mat-card-title>Visit Our Studio</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p class="contact-info">Come see our work and discuss your project</p>
                <div class="contact-details">
                  <div class="contact-item">
                    <strong>Address:</strong>
                    <span>123 Memory Lane,<br>Creative District,<br>Chennai - 600001</span>
                  </div>
                  <div class="contact-item">
                    <strong>Studio Hours:</strong>
                    <span>Mon-Sat: 10:00 AM - 6:00 PM</span>
                  </div>
                  <div class="contact-item">
                    <strong>Appointment:</strong>
                    <span>Recommended for consultations</span>
                  </div>
                </div>
                <button mat-raised-button color="primary" class="action-button" (click)="openMaps()">
                  <mat-icon>directions</mat-icon>
                  Get Directions
                </button>
              </mat-card-content>
            </mat-card>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="contact-form-section">
          <h2 class="section-title">
            <mat-icon class="section-icon">message</mat-icon>
            Send Us a Message
          </h2>
          
          <mat-card class="contact-form-card">
            <mat-card-content>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
                <div class="form-row">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Full Name</mat-label>
                    <input matInput formControlName="name" placeholder="Enter your full name">
                    <mat-icon matSuffix>person</mat-icon>
                    <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
                      Name is required
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Email Address</mat-label>
                    <input matInput formControlName="email" type="email" placeholder="Enter your email">
                    <mat-icon matSuffix>email</mat-icon>
                    <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                      Email is required
                    </mat-error>
                    <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                      Please enter a valid email
                    </mat-error>
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Phone Number</mat-label>
                    <input matInput formControlName="phone" placeholder="Enter your phone number">
                    <mat-icon matSuffix>phone</mat-icon>
                    <mat-error *ngIf="contactForm.get('phone')?.hasError('required')">
                      Phone number is required
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Subject</mat-label>
                    <mat-select formControlName="subject">
                      <mat-option value="general">General Inquiry</mat-option>
                      <mat-option value="order">Order Support</mat-option>
                      <mat-option value="custom">Custom Project</mat-option>
                      <mat-option value="feedback">Feedback</mat-option>
                      <mat-option value="complaint">Complaint</mat-option>
                      <mat-option value="business">Business Partnership</mat-option>
                    </mat-select>
                    <mat-icon matSuffix>subject</mat-icon>
                    <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">
                      Please select a subject
                    </mat-error>
                  </mat-form-field>
                </div>

                <mat-form-field appearance="outline" class="form-field full-width">
                  <mat-label>Message</mat-label>
                  <textarea matInput formControlName="message" rows="5" placeholder="Tell us how we can help you..."></textarea>
                  <mat-icon matSuffix>message</mat-icon>
                  <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                    Message is required
                  </mat-error>
                  <mat-error *ngIf="contactForm.get('message')?.hasError('minlength')">
                    Message must be at least 10 characters
                  </mat-error>
                </mat-form-field>

                <div class="form-actions">
                  <button mat-raised-button color="primary" type="submit" [disabled]="contactForm.invalid || isSubmitting" class="submit-button">
                    <mat-icon *ngIf="!isSubmitting">send</mat-icon>
                    <mat-icon *ngIf="isSubmitting">hourglass_empty</mat-icon>
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                  <button mat-stroked-button type="button" (click)="resetForm()" class="reset-button">
                    <mat-icon>refresh</mat-icon>
                    Reset Form
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- FAQ Section -->
        <div class="faq-section">
          <h2 class="section-title">
            <mat-icon class="section-icon">help</mat-icon>
            Frequently Asked Questions
          </h2>
          
          <mat-accordion class="faq-accordion">
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>schedule</mat-icon>
                  How long does it take to process my order?
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p>Standard orders take 3-5 business days to process and ship. Express orders can be delivered within 24-48 hours. Custom projects may take 7-10 business days depending on complexity.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>local_shipping</mat-icon>
                  Do you offer free shipping?
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p>Yes! We offer free shipping on all orders above ₹500. For orders below ₹500, shipping charges are ₹50. Express delivery is available for ₹100 extra.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>photo_camera</mat-icon>
                  What photo formats do you accept?
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p>We accept all common image formats including JPEG, PNG, TIFF, and RAW files. For best quality, we recommend high-resolution images (300 DPI or higher).</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>undo</mat-icon>
                  What is your return policy?
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p>We offer a 100% satisfaction guarantee. If you're not happy with your order, contact us within 7 days of delivery for a full refund or replacement.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>payment</mat-icon>
                  What payment methods do you accept?
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p>We accept all major credit/debit cards, UPI, net banking, and digital wallets. Cash on delivery is also available for orders above ₹1000.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>build</mat-icon>
                  Do you offer custom design services?
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p>Yes! Our design team can help create custom albums, collages, and personalized products. Contact us with your requirements for a custom quote.</p>
            </mat-expansion-panel>
          </mat-accordion>
        </div>

        <!-- Business Hours Section -->
        <div class="business-hours-section">
          <h2 class="section-title">
            <mat-icon class="section-icon">schedule</mat-icon>
            Business Hours
          </h2>
          
          <div class="hours-grid">
            <div class="hours-card">
              <h3>Customer Service</h3>
              <div class="hours-list">
                <div class="hours-item">
                  <span class="day">Monday - Saturday</span>
                  <span class="time">9:00 AM - 7:00 PM</span>
                </div>
                <div class="hours-item">
                  <span class="day">Sunday</span>
                  <span class="time">10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <div class="hours-card">
              <h3>Studio Visits</h3>
              <div class="hours-list">
                <div class="hours-item">
                  <span class="day">Monday - Saturday</span>
                  <span class="time">10:00 AM - 6:00 PM</span>
                </div>
                <div class="hours-item">
                  <span class="day">Sunday</span>
                  <span class="time">By Appointment Only</span>
                </div>
              </div>
            </div>

            <div class="hours-card">
              <h3>WhatsApp Support</h3>
              <div class="hours-list">
                <div class="hours-item">
                  <span class="day">24/7</span>
                  <span class="time">For Urgent Queries</span>
                </div>
                <div class="hours-item">
                  <span class="day">Regular Support</span>
                  <span class="time">9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Header Section */
    .contact-header {
      text-align: center;
      margin-bottom: 50px;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 15px;
      color: white;
    }

    .contact-title {
      font-size: 2.8em;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .contact-subtitle {
      font-size: 1.2em;
      opacity: 0.9;
    }

    /* Section Titles */
    .section-title {
      display: flex;
      align-items: center;
      font-size: 2.2em;
      color: #2c3e50;
      margin-bottom: 30px;
      font-weight: bold;
    }

    .section-icon {
      font-size: 1.2em;
      margin-right: 10px;
      color: #3498db;
    }

    /* Contact Methods Section */
    .contact-methods-section {
      margin-bottom: 50px;
    }

    .contact-methods-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
    }

    .contact-method-card {
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .contact-method-card:hover {
      transform: translateY(-5px);
    }

    .method-icon {
      font-size: 2.5em;
      margin-bottom: 10px;
    }

    .phone-icon {
      color: #27ae60;
    }

    .whatsapp-icon {
      color: #25d366;
    }

    .email-icon {
      color: #e74c3c;
    }

    .location-icon {
      color: #f39c12;
    }

    .contact-info {
      color: #7f8c8d;
      margin-bottom: 20px;
    }

    .contact-details {
      margin-bottom: 20px;
    }

    .contact-item {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .contact-item strong {
      color: #2c3e50;
      font-size: 0.9em;
    }

    .contact-link {
      color: #3498db;
      text-decoration: none;
      font-weight: bold;
    }

    .contact-link:hover {
      text-decoration: underline;
    }

    .action-button {
      width: 100%;
      padding: 12px;
      font-weight: bold;
    }

    /* Contact Form Section */
    .contact-form-section {
      margin-bottom: 50px;
    }

    .contact-form-card {
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .contact-form {
      padding: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-field {
      width: 100%;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 30px;
    }

    .submit-button {
      padding: 15px 30px;
      font-size: 1.1em;
      font-weight: bold;
    }

    .reset-button {
      padding: 15px 30px;
      font-size: 1.1em;
    }

    /* FAQ Section */
    .faq-section {
      margin-bottom: 50px;
    }

    .faq-accordion {
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .faq-accordion mat-expansion-panel {
      border-radius: 0;
    }

    .faq-accordion mat-panel-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .faq-accordion mat-icon {
      color: #3498db;
    }

    /* Business Hours Section */
    .business-hours-section {
      margin-bottom: 50px;
    }

    .hours-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
    }

    .hours-card {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      text-align: center;
    }

    .hours-card h3 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.3em;
    }

    .hours-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .hours-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .day {
      font-weight: bold;
      color: #2c3e50;
    }

    .time {
      color: #7f8c8d;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .contact-container {
        padding: 15px;
      }

      .contact-header {
        padding: 30px 15px;
      }

      .contact-title {
        font-size: 2.2em;
      }

      .contact-subtitle {
        font-size: 1em;
      }

      .section-title {
        font-size: 1.8em;
      }

      .contact-methods-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .form-actions {
        flex-direction: column;
        align-items: center;
      }

      .submit-button,
      .reset-button {
        width: 100%;
        max-width: 300px;
      }

      .hours-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    @media (max-width: 480px) {
      .contact-title {
        font-size: 1.8em;
      }

      .section-title {
        font-size: 1.5em;
      }

      .contact-form {
        padding: 15px;
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.snackBar.open('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.resetForm();
      }, 2000);
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  resetForm(): void {
    this.contactForm.reset();
  }

  callNow(): void {
    window.open('tel:+919876543210', '_self');
  }

  openWhatsApp(): void {
    const message = 'Hi! I\'m interested in your photo printing services. Can you help me?';
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  sendEmail(): void {
    const subject = 'Inquiry from We3Studio Website';
    const body = 'Hi,\n\nI would like to know more about your photo printing services.\n\nPlease contact me at your earliest convenience.\n\nThank you!';
    const mailtoUrl = `mailto:info@we3studio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_self');
  }

  openMaps(): void {
    const address = '123 Memory Lane, Creative District, Chennai - 600001';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  }
}

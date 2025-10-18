import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreateOrderRequest {
  amount: number;
  currency?: string;
  receipt?: string;
}

export interface CreateOrderResponse {
  id: string;
  currency: string;
  amount: number;
}

export interface VerifyPaymentRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createRazorpayOrder(orderData: CreateOrderRequest): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(`${this.apiUrl}/payment/create-order`, orderData);
  }

  verifyPayment(paymentData: VerifyPaymentRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payment/verify-payment`, paymentData);
  }
}

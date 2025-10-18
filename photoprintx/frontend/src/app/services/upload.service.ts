import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UploadResponse {
  imageUrl: string;
  publicId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);
    
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload/single`, formData);
  }

  uploadMultipleImages(files: File[]): Observable<UploadResponse[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    
    return this.http.post<UploadResponse[]>(`${this.apiUrl}/upload/multiple`, formData);
  }
}

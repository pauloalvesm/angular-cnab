import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/api/Admin`;

  constructor(private http: HttpClient) {}

  getTotalBalance(): Observable<{ totalBalance: number }> {
    return this.http.get<{ totalBalance: number }>(
      `${this.apiUrl}/total-balance`,
    );
  }

  getStoreCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/store-count`);
  }

  getTransactionCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/transaction-count`);
  }
}

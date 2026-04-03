import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CnabService {
  private readonly apiUrl = `${environment.apiUrl}/CNAB/upload-cnab-file`;

  constructor(private http: HttpClient) {}

  uploadCnabFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiUrl, formData);
  }

}

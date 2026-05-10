import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertMessage {
  type: 'success' | 'danger' | 'info' | 'warning';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<AlertMessage | null>();
  alert$ = this.alertSubject.asObservable();

  showAlert(type: 'success' | 'danger' | 'info' | 'warning', text: string) {
    this.alertSubject.next({ type, text });

    setTimeout(() => {
      this.alertSubject.next(null);
    }, 3000);
  }

  clearAlert() {
    this.alertSubject.next(null);
  }
}

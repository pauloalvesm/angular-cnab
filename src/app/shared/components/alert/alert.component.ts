import { Component, inject } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  standalone: false,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  private alertService = inject(AlertService);

  alert$ = this.alertService.alert$;

  getIcon(type: string): string {
    const icons: any = {
      success: 'bi bi-check-circle-fill',
      danger: 'bi bi-exclamation-triangle-fill',
      warning: 'bi bi-exclamation-circle-fill',
      info: 'bi bi-info-circle-fill'
    };
    return icons[type];
  }

  close() {
    this.alertService.clearAlert();
  }
}

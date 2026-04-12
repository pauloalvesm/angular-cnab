import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class Utility {
  registerForm!: FormGroup;

  public cleanForm(form: FormGroup): void {
    if (form) {
      form.reset();
    }
  }

  public cleanSearchField(context: any, fieldName: string): void {
    if (context && fieldName in context) {
      context[fieldName] = '';

      if (typeof context.onSearchChange === 'function') {
        context.onSearchChange();
      }
    }
  }

  public formatCpf(value: string): string {
    if (!value) return '';
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  public formatCard(value: string): string {
    if (!value) return '';

    const cleanValue = value.replace(/\s/g, '');

    return cleanValue
      .replace(/(.{4})(?=.+)/g, '$1 ')
      .substring(0, 19);
  }
}

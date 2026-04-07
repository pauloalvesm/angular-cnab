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
}

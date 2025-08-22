import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionBase } from '../question-base';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-dinamic-form-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dinamic-form-question.component.html',
  styleUrl: './dinamic-form-question.component.css'
})
export class DinamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];

  constructor(private notif: NotificationService) {}

  // small map to avoid spamming the same field error repeatedly
  private recentlyNotifiedError: { [key: string]: number } = {};

  private canNotifyError(fieldKey: string, cooldownMs = 3000): boolean {
    const last = this.recentlyNotifiedError[fieldKey] || 0;
    const now = Date.now();
    if (now - last > cooldownMs) {
      this.recentlyNotifiedError[fieldKey] = now;
      return true;
    }
    return false;
  }
  
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  /**
   * Validates input based on question type
   */
  validateInput(event: KeyboardEvent, questionType: string): void {
    const key = event.key;
    const target = event.target as HTMLInputElement;
    const currentValue = target.value;
    
    // Allow special keys
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (allowedKeys.includes(key)) return;

    switch (questionType.toLowerCase()) {
      case 'text':
        // Only letters, spaces, accented characters, and common punctuation
        const textRegex = /^[A-Za-zÀ-ÿ\s\-\'.]+$/;
        if (!textRegex.test(key)) {
          event.preventDefault();
        }
        break;
        
      case 'email':
        // Allow alphanumeric, @, ., -, _
        const emailRegex = /^[A-Za-z0-9@.\-_]+$/;
        if (!emailRegex.test(key)) {
          event.preventDefault();
        }
        break;
        
      case 'number':
        // Only numbers and one decimal point
        if (!/[\d]/.test(key) && key !== '.' && key !== '-') {
          event.preventDefault();
        }
        // Prevent multiple decimal points
        if (key === '.' && currentValue.includes('.')) {
          event.preventDefault();
        }
        // Prevent multiple minus signs or minus not at start
        if (key === '-' && (currentValue.includes('-') || currentValue.length > 0)) {
          event.preventDefault();
        }
        break;
        
      case 'tel':
      case 'phone':
        // Only numbers, spaces, hyphens, parentheses, and plus
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        if (!phoneRegex.test(key)) {
          event.preventDefault();
        }
        break;
    }
  }

  /**
   * Handles field blur events
   */
  onFieldBlur(fieldKey: string): void {
    const control = this.form.controls[fieldKey];
    
    if (control.valid && control.value) {
      this.notif.showSuccess('Campo completado correctamente', 3000);
      return;
    }

    if (control.invalid && control.touched && this.canNotifyError(fieldKey)) {
      const err = this.getErrorMessage();
      if (err) this.notif.showError(err, 5000);
    }
  }

  /**
   * Handles real-time input validation
   */
  onFieldInput(fieldKey: string, event: any): void {
    const value = event.target.value;
    const control = this.form.controls[fieldKey];
    
    // Real-time validation for specific types
    switch (this.question.type.toLowerCase()) {
      case 'email':
        this.validateEmail(value, control);
        break;
      case 'phone':
      case 'tel':
        this.formatPhoneNumber(event.target);
        break;
      case 'text':
        this.validateTextLength(value, control);
        break;
    }
  }

  /**
   * Handles field change events
   */
  onFieldChange(fieldKey: string): void {
    const control = this.form.controls[fieldKey];
    if (control.valid) {
  this.notif.showSuccess('Campo completado correctamente', 2500);
    }
    else if (control.invalid && control.touched && this.canNotifyError(fieldKey)) {
      const err = this.getErrorMessage();
      if (err) this.notif.showError(err, 5000);
    }
  }

  /**
   * Handles file input changes
   */
  onFileChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const control = this.form.controls[this.question.key];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        control.setErrors({ maxSize: true });
        return;
      }
      
      // Validate file type
      const allowedTypes = this.getAllowedFileTypes();
      if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        control.setErrors({ invalidType: true });
        return;
      }
      
      control.setValue(file);
      control.setErrors(null);
    }
  }

  /**
   * Gets placeholder text for different input types
   */
  getPlaceholder(question: QuestionBase<string>): string {
    const placeholders: { [key: string]: string } = {
      'text': 'Ingrese su respuesta aquí...',
      'email': 'ejemplo@correo.com',
      'password': 'Ingrese su contraseña',
      'number': 'Ingrese un número',
      'tel': '+1 234 567 8900',
      'phone': '+1 234 567 8900',
      'date': 'dd/mm/yyyy',
      'url': 'https://ejemplo.com'
    };
    
    return placeholders[question.type.toLowerCase()] || 'Ingrese su respuesta...';
  }

  /**
   * Gets accepted file types for file inputs
   */
  getAcceptedFileTypes(question: QuestionBase<string>): string {
    const fileTypes: { [key: string]: string } = {
      'image': 'image/*',
      'document': '.pdf,.doc,.docx,.txt',
      'spreadsheet': '.xlsx,.xls,.csv',
      'any': '*/*'
    };
    
    return fileTypes[question.type.toLowerCase()] || '*/*';
  }

  /**
   * Gets appropriate error message based on validation errors
   */
  getErrorMessage(): string {
    const control = this.form.controls[this.question.key];
    const errors = control.errors;
    
    if (!errors) return '';
    
    const errorMessages: { [key: string]: string } = {
      'required': `${this.question.label} es obligatorio`,
      'pattern': this.getPatternErrorMessage(),
      'minlength': `Mínimo ${errors['minlength']?.requiredLength} caracteres`,
      'maxlength': `Máximo ${errors['maxlength']?.requiredLength} caracteres`,
      'email': 'Ingrese un email válido',
      'min': `El valor mínimo es ${errors['min']?.min}`,
      'max': `El valor máximo es ${errors['max']?.max}`,
      'minDate': 'La fecha debe ser posterior a hoy',
      'invalidPhone': 'Ingrese un número telefónico válido',
      'maxSize': 'El archivo no puede superar los 5MB',
      'invalidType': 'Tipo de archivo no permitido',
      'invalidLength': 'La longitud del texto no es válida'
    };
    
    // Return the first error message found
    for (const errorKey in errors) {
      if (errorMessages[errorKey]) {
        return errorMessages[errorKey];
      }
    }
    
    return 'Campo inválido';
  }

  /**
   * Gets pattern-specific error messages
   */
  private getPatternErrorMessage(): string {
    switch (this.question.type.toLowerCase()) {
      case 'text':
        return 'Solo se permiten letras y espacios';
      case 'email':
        return 'Formato de email inválido';
      case 'phone':
      case 'tel':
        return 'Formato de teléfono inválido';
      default:
        return 'Formato inválido';
    }
  }

  /**
   * Validates email format in real-time
   */
  private validateEmail(value: string, control: any): void {
    if (value && value.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        control.setErrors({ ...control.errors, email: true });
      } else if (control.errors?.email) {
        delete control.errors.email;
        if (Object.keys(control.errors).length === 0) {
          control.setErrors(null);
        }
      }
    }
  }

  /**
   * Formats phone number input
   */
  private formatPhoneNumber(input: HTMLInputElement): void {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (value.length >= 3) {
      value = value.replace(/(\d{3})(\d{3})/, '$1-$2');
    }
    
    input.value = value;
  }

  /**
   * Validates text length
   */
  private validateTextLength(value: string, control: any): void {
    if (value && (value.length < 2 || value.length > 100)) {
      control.setErrors({ ...control.errors, invalidLength: true });
    } else if (control.errors?.invalidLength) {
      delete control.errors.invalidLength;
      if (Object.keys(control.errors).length === 0) {
        control.setErrors(null);
      }
    }
  }

  /**
   * Gets allowed file types based on question type
   */
  private getAllowedFileTypes(): string[] {
    const typeMap: { [key: string]: string[] } = {
      'image': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      'document': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
      'spreadsheet': ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv']
    };
    
    return typeMap[this.question.type.toLowerCase()] || [];
  }
}

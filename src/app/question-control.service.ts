import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {

  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};

    questions.forEach(question => {
      const validators = this.getValidatorsForQuestion(question);
      group[question.key] = new FormControl(
        question.value || '', 
        validators
      );
    });

    return new FormGroup(group);
  }

  /**
   * Get appropriate validators for each question type
   */
  private getValidatorsForQuestion(question: QuestionBase<string>): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    
    // Add required validation if necessary
    if (question.required) {
      validators.push(Validators.required);
    }

    // Add type-specific validations
    switch (question.type.toLowerCase()) {
      case 'text':
        validators.push(
          Validators.minLength(2),
          Validators.maxLength(100),
          this.onlyLettersValidator()
        );
        break;
        
      case 'email':
        validators.push(
          Validators.email,
          this.customEmailValidator()
        );
        break;
        
      case 'password':
        validators.push(
          Validators.minLength(8),
          Validators.maxLength(128),
          this.strongPasswordValidator()
        );
        break;
        
      case 'number':
        validators.push(
          this.numericValidator(),
          Validators.min(-999999),
          Validators.max(999999)
        );
        break;
        
      case 'phone':
      case 'tel':
        validators.push(
          this.phoneValidator()
        );
        break;
        
      case 'date':
        validators.push(this.minDateValidator());
        break;
        
      case 'url':
        validators.push(this.urlValidator());
        break;
        
      case 'file':
        validators.push(this.fileValidator());
        break;
        
      case 'radio':
        if (question.required) {
          validators.push(Validators.required);
        }
        break;
    }

    return validators;
  }

  /**
   * Validator for text fields - only letters, spaces, and accented characters
   */
  private onlyLettersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const regex = /^[A-Za-zÀ-ÿ\s\-\'.]+$/;
      return regex.test(control.value) ? null : { pattern: true };
    };
  }

  /**
   * Enhanced email validator
   */
  private customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(control.value);
      
      if (!isValid) {
        return { email: true };
      }
      
      // Additional checks
      const domain = control.value.split('@')[1];
      if (domain && (domain.length < 3 || domain.length > 255)) {
        return { email: true };
      }
      
      return null;
    };
  }

  /**
   * Strong password validator
   */
  private strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const password = control.value;
      const errors: any = {};
      
      // At least one lowercase letter
      if (!/[a-z]/.test(password)) {
        errors.missingLowercase = true;
      }
      
      // At least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        errors.missingUppercase = true;
      }
      
      // At least one number
      if (!/\d/.test(password)) {
        errors.missingNumber = true;
      }
      
      // At least one special character
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.missingSpecialChar = true;
      }
      
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  /**
   * Numeric validator
   */
  private numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const numericRegex = /^-?\d*\.?\d+$/;
      return numericRegex.test(control.value) ? null : { numeric: true };
    };
  }

  /**
   * Phone number validator
   */
  private phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      // Remove all non-digit characters
      const cleaned = control.value.replace(/\D/g, '');
      
      // Check if it has 10-15 digits (international range)
      if (cleaned.length < 10 || cleaned.length > 15) {
        return { invalidPhone: true };
      }
      
      // Additional pattern validation
      const phoneRegex = /^[\+]?[1-9][\d]{0,3}?[\-\.\s]?[\(]?[\d]{3}[\)]?[\-\.\s]?[\d]{3}[\-\.\s]?[\d]{4}$/;
      return phoneRegex.test(control.value) ? null : { invalidPhone: true };
    };
  }

  /**
   * Date validator - must be today or future
   */
  private minDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const inputDate = new Date(control.value);
      inputDate.setHours(0, 0, 0, 0);
      
      return inputDate >= today ? null : { minDate: true };
    };
  }

  /**
   * URL validator
   */
  private urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      try {
        const url = new URL(control.value);
        // Check if it's http or https
        return ['http:', 'https:'].includes(url.protocol) ? null : { invalidUrl: true };
      } catch {
        return { invalidUrl: true };
      }
    };
  }

  /**
   * File validator
   */
  private fileValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const file = control.value;
      
      // Check if it's actually a file
      if (!(file instanceof File)) {
        return { invalidFile: true };
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return { maxSize: true };
      }
      
      // Check for empty file
      if (file.size === 0) {
        return { emptyFile: true };
      }
      
      return null;
    };
  }

  /**
   * Cross-field validator for form-level validation
   */
  crossFieldValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      if (!(form instanceof FormGroup)) return null;
      
      const errors: any = {};
      
      // Example: Password confirmation validation
      const password = form.get('password');
      const confirmPassword = form.get('confirmPassword');
      
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        errors.passwordMismatch = true;
      }
      
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  /**
   * Dynamic validator based on other field values
   */
  conditionalValidator(condition: (form: AbstractControl) => boolean, validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!condition(control.parent!)) {
        return null;
      }
      return validator(control);
    };
  }
}

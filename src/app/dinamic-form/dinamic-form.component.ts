import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DinamicFormQuestionComponent } from '../dinamic-form-question/dinamic-form-question.component';
import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../question-control.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-dinamic-form',
  standalone: true,
  imports: [CommonModule, DinamicFormQuestionComponent, ReactiveFormsModule],
  providers: [QuestionControlService],
  templateUrl: './dinamic-form.component.html',
  styleUrl: './dinamic-form.component.css'
})
export class DinamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  isSubmitting = false;

  constructor(private qcs: QuestionControlService, private notif: NotificationService) {}

  ngOnInit() {
    if (this.questions && this.questions.length > 0) {
      this.form = this.qcs.toFormGroup(this.questions);
      
      // Listen to form changes for real-time validation feedback
      this.form.valueChanges.subscribe(() => {
        this.hideMessages();
      });
    }
  }

  /**
   * Handle form submission
   */
  async onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.hideMessages();
      
      try {
        // Simulate API call
        await this.simulateApiCall();
        
        this.payLoad = JSON.stringify(this.form.getRawValue(), null, 2);
        // show global success notification
        this.notif.showSuccess('Campo completado correctamente');
        
        // Log form data for debugging
        console.log('Form Data:', this.form.getRawValue());
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          this.hideMessages();
        }, 5000);
        
      } catch (error) {
        console.error('Form submission error:', error);
        this.notif.showError('Error al enviar el formulario. Por favor, intente de nuevo.');
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.form);
      
      // Scroll to first invalid field
      this.scrollToFirstInvalidField();
    }
  }

  /**
   * Reset form to initial state
   */
  onReset() {
    this.form.reset();
    this.hideMessages();
    this.payLoad = '';
    
    // Remove touched state from all fields
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setErrors(null);
      this.form.controls[key].markAsUntouched();
      this.form.controls[key].markAsPristine();
    });
  }

  /**
   * Get form completion progress as percentage
   */
  getFormProgress(): number {
    if (!this.questions || this.questions.length === 0) return 0;
    
    const completedFields = this.getCompletedFields();
    const totalFields = this.getTotalFields();
    
    return Math.round((completedFields / totalFields) * 100);
  }

  /**
   * Get number of completed fields
   */
  getCompletedFields(): number {
    if (!this.questions) return 0;
    
    return this.questions.filter(question => {
      const control = this.form.get(question.key);
      return control && control.value && control.valid;
    }).length;
  }

  /**
   * Get total number of required fields
   */
  getTotalFields(): number {
    return this.questions ? this.questions.filter(q => q.required).length : 0;
  }

  /**
   * TrackBy function for ngFor optimization
   */
  trackByKey(index: number, question: QuestionBase<string>): string {
    return question.key;
  }

  /**
   * Mark all form controls as touched
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Scroll to first invalid field
   */
  private scrollToFirstInvalidField() {
    const firstInvalidField = document.querySelector('.form-input.ng-invalid');
    if (firstInvalidField) {
      firstInvalidField.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Focus the field for better UX
      setTimeout(() => {
        (firstInvalidField as HTMLElement).focus();
      }, 500);
    }
  }

  /**
   * Hide all messages
   */
  private hideMessages() {
  // noop — messages moved to NotificationService
  }

  /**
   * Simulate API call for form submission
   */
  private async simulateApiCall(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% success rate for demo purposes
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Simulated network error'));
        }
      }, 2000); // 2 second delay
    });
  }

  /**
   * Check if form has any errors
   */
  hasFormErrors(): boolean {
    return this.form.invalid && this.form.touched;
  }

  /**
   * Get form validation summary
   */
  getValidationSummary(): string[] {
    const errors: string[] = [];
    
    if (!this.questions) return errors;
    
    this.questions.forEach(question => {
      const control = this.form.get(question.key);
      if (control && control.invalid && control.touched) {
        if (control.errors?.['required']) {
          errors.push(`${question.label} es obligatorio`);
        } else if (control.errors?.['email']) {
          errors.push(`${question.label} debe ser un email válido`);
        } else if (control.errors?.['pattern']) {
          errors.push(`${question.label} tiene un formato inválido`);
        }
        // Add more error types as needed
      }
    });
    
    return errors;
  }
}

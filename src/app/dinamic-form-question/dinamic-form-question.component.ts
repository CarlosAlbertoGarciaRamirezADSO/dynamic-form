import { Component, Input } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {QuestionBase} from '../question-base';

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
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
  solo_letras(event: KeyboardEvent) {
    const regex = /^[A-Za-zÀ-ÿ\s]+$/; 
    const key = event.key;
  
    if (!regex.test(key)) {
      event.preventDefault();  
    }
  }
  previewImages: { [key: string]: string | ArrayBuffer | null } = {}; 
  
}

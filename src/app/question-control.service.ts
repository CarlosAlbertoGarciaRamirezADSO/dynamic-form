import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {

toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};

    const validationRules: Record<string, ValidatorFn[]> = {
    'date': [Validators.required, this.minDateValidator()],
    'radio': [Validators.required],
    'text': [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)], 
    'file': [Validators.required]
    };

    questions.forEach(question => {
    group[question.key] = new FormControl(
        question.value || '', 
        validationRules[question.type] || (question.required ? [Validators.required] : [])
    );
    });

    return new FormGroup(group);
}

private minDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; 

    const today = new Date().toISOString().split('T')[0];
    return control.value < today ? { minDate: true } : null;
    };
}
}

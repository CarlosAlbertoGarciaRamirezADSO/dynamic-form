import { Injectable } from '@angular/core';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './texbox';
import { RadioQuestion } from './radio'; 
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  getQuestions() {
    const questions: QuestionBase<string>[] = [

      new TextboxQuestion({
        key: 'nombre',
        label: 'Ingrese su nombre',
        type: 'text',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'Date',
        label: 'Fecha de nacimiento',
        type: 'Date',
        order: 2
      }),

      new RadioQuestion({
        key: 'Rangos_programacion',
        label: 'Rango de promación',
        options: [
          { key: 'junior', value: 'Junior' },
          { key: 'semi-senior', value: 'Semi-senior' },
          { key: 'senior', value: 'Senior' },
          { key: 'psicopata', value: 'Psicopata' },
        ],
        required: true,
        order: 3
      }),

      new TextboxQuestion({
        key: 'file',
        label: 'Adjuntar imagen',
        type: 'file',
        order: 4
      }),

    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}

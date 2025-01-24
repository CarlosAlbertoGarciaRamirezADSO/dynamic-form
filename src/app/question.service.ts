import { Injectable } from '@angular/core';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './texbox';

import { of } from 'rxjs';
@Injectable()
export class QuestionService {

getQuestions() {

    const questions: QuestionBase<string>[] = [


    new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
    }),

    new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
    }),

    new TextboxQuestion({
        key: 'password',
        label: 'password',
        type: 'password',
        order: 2
    })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
}
}
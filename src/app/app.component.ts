import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DinamicFormComponent } from './dinamic-form/dinamic-form.component';
import {AsyncPipe} from '@angular/common';
import { NotificationComponent } from './shared/notification.component';
import {QuestionService} from './question.service';
import {QuestionBase} from './question-base';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DinamicFormComponent, AsyncPipe, NotificationComponent],
  providers: [QuestionService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formulario_dinamico';

  questions$: Observable<QuestionBase<any>[]>;

  constructor(private service: QuestionService) {
    
    this.questions$ = service.getQuestions();
    console.log(this.questions$);
    
  }
}

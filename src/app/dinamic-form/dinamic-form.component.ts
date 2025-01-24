import { Component ,Input, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import  { DinamicFormQuestionComponent } from '../dinamic-form-question/dinamic-form-question.component';
import  { QuestionBase} from '../question-base';
import {QuestionControlService} from '../question-control.service';

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

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    console.log(this.form);
      
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}

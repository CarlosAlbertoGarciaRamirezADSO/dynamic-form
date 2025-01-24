import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicFormQuestionComponent } from './dinamic-form-question.component';

describe('DinamicFormQuestionComponent', () => {
  let component: DinamicFormQuestionComponent;
  let fixture: ComponentFixture<DinamicFormQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamicFormQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamicFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

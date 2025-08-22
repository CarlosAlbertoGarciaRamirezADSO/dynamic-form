import { Injectable } from '@angular/core';
import { QuestionBase, TextboxQuestion, RadioQuestion } from './question-base';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  getQuestions() {
    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'nombre',
        label: 'Nombre Completo',
        type: 'text',
        required: true,
        order: 1,
        placeholder: 'Ingrese su nombre completo',
        minLength: 2,
        maxLength: 50,
        helpText: 'Solo se permiten letras y espacios'
      }),

      new TextboxQuestion({
        key: 'email',
        label: 'Correo Electrónico',
        type: 'email',
        required: true,
        order: 2,
        placeholder: 'ejemplo@correo.com',
        helpText: 'Ingrese un email válido'
      }),

      new TextboxQuestion({
        key: 'telefono',
        label: 'Número de Teléfono',
        type: 'phone',
        required: true,
        order: 3,
        placeholder: '+1 234 567 8900',
        helpText: 'Formato: +1 234 567 8900'
      }),

      new TextboxQuestion({
        key: 'fechaNacimiento',
        label: 'Fecha de Nacimiento',
        type: 'date',
        required: true,
        order: 4,
        helpText: 'Debe ser mayor de edad'
      }),

      new RadioQuestion({
        key: 'experienciaProgramacion',
        label: '¿Cuál es tu nivel de experiencia en programación?',
        options: [
          { key: 'principiante', value: 'Principiante (0-1 años)' },
          { key: 'junior', value: 'Junior (1-3 años)' },
          { key: 'intermedio', value: 'Intermedio (3-5 años)' },
          { key: 'senior', value: 'Senior (5+ años)' },
          { key: 'experto', value: 'Experto/Arquitecto (10+ años)' }
        ],
        required: true,
        order: 5,
        helpText: 'Selecciona tu nivel actual de experiencia'
      }),

      new RadioQuestion({
        key: 'lenguajeFavorito',
        label: '¿Cuál es tu lenguaje de programación favorito?',
        options: [
          { key: 'javascript', value: 'JavaScript/TypeScript' },
          { key: 'python', value: 'Python' },
          { key: 'java', value: 'Java' },
          { key: 'csharp', value: 'C#' },
          { key: 'php', value: 'PHP' },
          { key: 'go', value: 'Go' },
          { key: 'rust', value: 'Rust' },
          { key: 'otros', value: 'Otros' }
        ],
        required: true,
        order: 6
      }),

      new TextboxQuestion({
        key: 'sitioWeb',
        label: 'Sitio Web o Portfolio (Opcional)',
        type: 'url',
        required: false,
        order: 7,
        placeholder: 'https://mi-portfolio.com',
        helpText: 'Comparte tu portfolio o sitio web personal'
      }),

      new TextboxQuestion({
        key: 'curriculum',
        label: 'Adjuntar Curriculum Vitae',
        type: 'file',
        controlType: 'file',
        required: true,
        order: 8,
        accept: '.pdf,.doc,.docx',
        helpText: 'Formatos permitidos: PDF, DOC, DOCX (máximo 5MB)'
      })

    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  /**
   * Get questions for a specific category or use case
   */
  getQuestionsForCategory(category: 'personal' | 'professional' | 'contact'): QuestionBase<any>[] {
    const allQuestions = [
      // Personal Information
      new TextboxQuestion({
        key: 'nombre',
        label: 'Nombre Completo',
        type: 'text',
        required: true,
        order: 1,
        placeholder: 'Ingrese su nombre completo'
      }),
      
      new TextboxQuestion({
        key: 'fechaNacimiento',
        label: 'Fecha de Nacimiento',
        type: 'date',
        required: true,
        order: 2
      }),

      // Contact Information
      new TextboxQuestion({
        key: 'email',
        label: 'Correo Electrónico',
        type: 'email',
        required: true,
        order: 3,
        placeholder: 'ejemplo@correo.com'
      }),

      new TextboxQuestion({
        key: 'telefono',
        label: 'Teléfono',
        type: 'phone',
        required: true,
        order: 4,
        placeholder: '+1 234 567 8900'
      }),

      // Professional Information
      new RadioQuestion({
        key: 'experiencia',
        label: 'Nivel de Experiencia',
        options: [
          { key: 'entry', value: 'Nivel de entrada' },
          { key: 'mid', value: 'Nivel intermedio' },
          { key: 'senior', value: 'Nivel senior' }
        ],
        required: true,
        order: 5
      })
    ];

    switch (category) {
      case 'personal':
        return allQuestions.filter(q => ['nombre', 'fechaNacimiento'].includes(q.key));
      case 'contact':
        return allQuestions.filter(q => ['email', 'telefono'].includes(q.key));
      case 'professional':
        return allQuestions.filter(q => ['experiencia'].includes(q.key));
      default:
        return allQuestions;
    }
  }
}

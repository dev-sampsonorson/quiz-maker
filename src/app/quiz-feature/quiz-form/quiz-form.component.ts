import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../types';
import { QuizFormMode } from './quiz-form-mode.type';
import { QuizItemComponent } from './quiz-item';
import { MatButtonModule } from '@angular/material/button';

type QuizDisplayFormSchema = {
  questions: FormArray<FormGroup<{ answer: FormControl<string | null> }>>;
};

type QuizDisplayFormGroup = FormGroup<QuizDisplayFormSchema>;

export type QuestionAnswer = { answer: string | null; };

@Component({
  selector: 'so-quiz-form',
  standalone: true,
  imports: [NgIf, NgFor, JsonPipe, AsyncPipe, ReactiveFormsModule, MatButtonModule, QuizItemComponent],
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizFormComponent implements OnInit {

  private readonly fb = inject(FormBuilder);

  @Input({ required: true }) questions: Question[] = [];
  @Input() userAnswers: QuestionAnswer[] = [];
  @Input({ required: true }) formMode: QuizFormMode = 'form';

  @Output() submitAnswers = new EventEmitter<QuestionAnswer[]>();

  @ViewChild(FormGroupDirective, { static: true }) formGroupDirective!: FormGroupDirective;

  form: QuizDisplayFormGroup = this.fb.group({
    questions: this.fb.array<FormGroup<{ answer: FormControl<string | null> }>>([])
  });

  @HostBinding('class.so-form-mode')
  get isFormMode() {
    return this.formMode === 'form';
  }

  @HostBinding('class.so-display-mode')
  get isDisplayMode() {
    return this.formMode === 'display';
  }

  ngOnInit(): void {
    this.initializeForm(this.questions);
  }

  submitQuiz(){
    if (this.formMode === 'form' && this.form.value.questions) {
      this.submitAnswers.emit(this.form.value.questions as QuestionAnswer[]);
    }
  }

  getFormGroup(index: number) {
    return this.form.controls.questions.controls[index];
  }


  resetForm() {
    this.form.enable();
    this.formGroupDirective.resetForm();
  }

  private initializeForm(questions: Question[]) {
    for (let i = 0; i < questions.length; i++) {
      this.form.controls.questions.push(
        new FormGroup({
          answer: new FormControl<string | null>(
            null,
            this.formMode === 'form' ? Validators.required: null)
        })
      );
    }

    if (this.formMode === 'display') {
      this.form.disable();
      this.form.setValue({
        questions: this.userAnswers
      });
    }
  }
}


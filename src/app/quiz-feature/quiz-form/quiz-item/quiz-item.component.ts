import { JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Question } from '../../types';
import { QuizFormMode } from '../quiz-form-mode.type';
import { SafeHtmlPipe } from '../../../shared/pipes';

@Component({
  selector: 'so-quiz-item',
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe, JsonPipe, ReactiveFormsModule, MatButtonToggleModule, SafeHtmlPipe],
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizItemComponent {

  @Input({ required: true }) question: Question | null = null;
  @Input({ required: true }) formGroup!: FormGroup<{ answer: FormControl<string | null> }>;
  @Input({ required: true }) formMode!: QuizFormMode;

  isCorrectAnswer(answer: string) {
    if (this.formMode === 'form' || !this.question) return false;

    return this.question.correct_answer === answer;
  }
}

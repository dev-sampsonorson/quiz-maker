import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question } from '../../types';
import { JsonPipe, NgFor } from '@angular/common';
import { QuizItemComponent } from '../quiz-item';

@Component({
  selector: 'so-quiz-display',
  standalone: true,
  imports: [NgFor, QuizItemComponent],
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizDisplayComponent {

  @Input({ required: true }) questions: Question[] = [];

}

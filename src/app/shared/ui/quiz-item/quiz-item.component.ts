import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question } from '../../types';

@Component({
  selector: 'so-quiz-item',
  standalone: true,
  imports: [],
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizItemComponent {
  @Input({ required: true }) question: Question | null = null;
}

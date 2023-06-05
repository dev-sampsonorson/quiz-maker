import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question } from '../../types';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'so-quiz-display',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizDisplayComponent {

  @Input({ required: true }) questions: Question[] = [];

}

import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuizFormComponent } from '../quiz-form';
import { QuizService } from '../services';
import { combineLatest, map } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'so-quiz-result',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgClass, RouterLink, MatDividerModule, MatButtonModule, QuizFormComponent],
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizResultComponent  {
  private readonly quizService = inject(QuizService);

  viewModel$ = combineLatest([
    this.quizService.currentQuestions$,
    this.quizService.userAnswers$,
    this.quizService.score$,
    this.quizService.scoreDisplay$
  ]).pipe(
    map(([questions, userAnswers, score, scoreDisplay]) => ({ questions, userAnswers, score, scoreDisplay }))
  );

  scoreGradeClass(score: number) {
    if ([4, 5].includes(score)) {
      return 'so-good';
    }

    if ([2, 3].includes(score)) {
      return 'so-average';
    }

    return 'so-bad';
  }
}

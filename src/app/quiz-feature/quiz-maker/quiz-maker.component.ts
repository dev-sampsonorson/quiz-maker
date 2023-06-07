import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { QuestionAnswer, QuizFormComponent } from '../quiz-form';
import { QuestionCategory, QuestionDifficulty, QuestionSearchQuery, QuizSearchComponent } from './quiz-search';
import { OpentdbService, QuizService } from '../services';
import { DifficultyLevels } from '../types';

const DIFFICULTY_LEVELS: DifficultyLevels[] = ['Easy', 'Medium', 'Hard'];

@Component({
  selector: 'so-quiz-maker',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, RouterOutlet, RouterLink, MatDividerModule, QuizSearchComponent, QuizFormComponent],
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizMakerComponent {
  private readonly opentdbService = inject(OpentdbService);
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  questions$ = this.opentdbService.questions$.pipe(
    tap(questions => this.quizService.storeCurrentQuestions(questions))
  );
  categories$: Observable<QuestionCategory[]> = this.opentdbService.categories$.pipe(
    map(categories => categories.map(category => ({ value: category.id, label: category.name })))
  );

  difficulties: QuestionDifficulty[] = DIFFICULTY_LEVELS.map(level => ({
    value: level.toLocaleLowerCase(),
    label: level,
  }));

  searchForQuestions(query: QuestionSearchQuery) {
    this.opentdbService.searchForQuestions(query);
  }

  createNewQuiz() {
    this.opentdbService.searchForQuestions(null);
    this.router.navigate(['/']);
  }

  displayResult(userAnswers: QuestionAnswer[]) {
    this.quizService.updateUserAnswers(userAnswers);
    this.router.navigate(['/result']);
  }

}

import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OpentdbService } from './shared/services';
import { DifficultyLevels } from './shared/types';
import { QuestionDifficulty as DifficultyLevel, QuestionCategory, QuestionSearchComponent, QuestionSearchQuery } from './shared/ui';
import { QuizDisplayComponent } from './shared/ui/quiz-display';

const DIFFICULTY_LEVELS: DifficultyLevels[] = ['Easy', 'Medium', 'Hard'];

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, QuestionSearchComponent, QuizDisplayComponent],
  providers: [OpentdbService],
  selector: 'so-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private opentdbService = inject(OpentdbService);

  questions$ = this.opentdbService.questions$;
  categories$: Observable<QuestionCategory[]> = this.opentdbService.categories$.pipe(
    map(categories => categories.map(category => ({ value: category.id, label: category.name })))
  );

  difficulties: DifficultyLevel[] = DIFFICULTY_LEVELS.map(level => ({
    value: level.toLocaleLowerCase(),
    label: level,
  }));

  searchForQuestions(query: QuestionSearchQuery) {
    this.opentdbService.searchForQuestions(query);
  }
}

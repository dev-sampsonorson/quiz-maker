import { Component, OnInit, inject } from '@angular/core';
import { QuestionCategory, QuestionDifficulty as DifficultyLevel, QuestionSearchComponent, QuestionSearchQuery } from './shared/ui';
import { OpentdbService } from './shared/services';
import { Observable, map } from 'rxjs';
import { DifficultyLevels } from './shared/types';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

const DIFFICULTY_LEVELS: DifficultyLevels[] = ['Easy', 'Medium', 'Hard'];

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, QuestionSearchComponent],
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

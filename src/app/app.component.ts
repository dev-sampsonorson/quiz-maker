import { Component, OnInit, inject } from '@angular/core';
import { QuestionCategory, QuestionDifficulty as DifficultyLevel, QuestionSearchComponent } from './shared/ui';
import { OpentdbService } from './shared/services';
import { Observable, map } from 'rxjs';
import { DifficultyLevels } from './shared/types';
import { AsyncPipe } from '@angular/common';

const DIFFICULTY_LEVELS: DifficultyLevels[] = ['Easy', 'Medium', 'Hard'];

@Component({
  standalone: true,
  imports: [AsyncPipe, QuestionSearchComponent],
  providers: [OpentdbService],
  selector: 'so-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  opentdbService = inject(OpentdbService);

  categories$: Observable<QuestionCategory[]> = this.opentdbService.categories$.pipe(
    map(categories => categories.map(category => ({ value: category.id, label: category.name })))
  );

  difficulties: DifficultyLevel[] = DIFFICULTY_LEVELS.map(level => ({
    value: level.toLocaleLowerCase(),
    label: level,
  }));

  ngOnInit(): void {
  }
}

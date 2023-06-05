import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuestionCategory, QuestionDifficulty, QuestionSearchFormGroup, QuestionSearchQuery } from './question-search.type';

@Component({
  selector: 'so-question-search',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionSearchComponent {
  fb = inject(FormBuilder);
  form: QuestionSearchFormGroup = this.fb.group({
    category: this.fb.control<number | null>(null, {
      validators: Validators.required
    }),
    difficulty: this.fb.control<string | null>(null, {
      validators: Validators.required
    }),
  })

  @Input({ required: true }) categories: QuestionCategory[] = [];
  @Input({ required: true }) difficulties: QuestionDifficulty[] = [];

  @Output() search = new EventEmitter<QuestionSearchQuery>();


  sendSelector(form: QuestionSearchFormGroup) {
    if (form.invalid) return;
    if (!form.value.category || !form.value.difficulty) return;

    this.search.emit({
      category: form.value.category,
      difficulty: form.value.difficulty
    });
  }

  categoryTrackBy = (index: number, category: QuestionCategory) => category.value;
  difficultyTrackBy = (index: number, difficulty: QuestionDifficulty) => difficulty.value;
}

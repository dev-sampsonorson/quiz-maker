import { Component, OnInit } from '@angular/core';
import { QuestionCategory, QuestionDifficulty, QuestionSearchComponent } from './shared/ui';

@Component({
  standalone: true,
  imports: [QuestionSearchComponent],
  selector: 'so-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories: QuestionCategory[] = [
    { value: 9, label: 'General Knowledge' },
    { value: 10, label: 'Entertainment: Books' },
    { value: 11, label: 'Entertainment: Film' },
  ];

  difficulties: QuestionDifficulty[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ]

  ngOnInit(): void {
  }
}

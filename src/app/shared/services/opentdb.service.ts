import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap } from 'rxjs';
import { Category, Question } from '../types';

type QuestionsResponse = {
  response_code: number;
  results: Exclude<Question, 'answers'>[];
}

type CategoriesResponse = {
  trivia_categories: Category[];
}

type QuestionSearchQueryInternal = {
  category: number;
  difficulty: string;
};

@Injectable()
export class OpentdbService {
  http = inject(HttpClient);

  private searchForQuestions$$ = new Subject<QuestionSearchQueryInternal>();
  questions$: Observable<Question[]> = this.searchForQuestions$$.asObservable().pipe(
    switchMap(({ category, difficulty }) => {
      return this.http.get<QuestionsResponse>(
        `/api/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
      ).pipe(
        map(response => response.results),
        map(results => this.combineAnswersRandomly(results)),
        catchError(() => of([])),
      );
    })
  )

  categories$ = this.http.get<CategoriesResponse>('/api/api_category.php').pipe(
    map(respose => respose.trivia_categories),
    catchError(() => of([]))
  );

  searchForQuestions(query: any) {
    this.searchForQuestions$$.next(query);
  }

  private combineAnswersRandomly(results: QuestionsResponse['results']) {
    return results.map(result => ({
      ...result,
      answers: [...result.incorrect_answers, result.correct_answer].sort(() => Math.random() - 0.5)
    }));
  }
}

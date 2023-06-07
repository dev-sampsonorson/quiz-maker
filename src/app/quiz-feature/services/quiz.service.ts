import { Injectable } from '@angular/core';
import { Question } from '../types';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { QuestionAnswer } from '../quiz-form';

@Injectable()
export class QuizService {

  private readonly _userAnswers$$ = new BehaviorSubject<QuestionAnswer[]>([]);
  userAnswers$ = this._userAnswers$$.asObservable();

  private readonly _currentQuestions$$ = new BehaviorSubject<Question[]>([]);
  currentQuestions$ = this._currentQuestions$$.asObservable();

  score$ = combineLatest([
    this.currentQuestions$,
    this.userAnswers$
  ]).pipe(
    map(([questions, answers]) => {
      return questions.reduce<number>((score, question, index) => {
        if (question.correct_answer === answers[index].answer) {
          return score + 1;
        }
        return score;
      }, 0);
    })
  );

  scoreDisplay$ = combineLatest([
    this.score$,
    this.currentQuestions$
  ]).pipe(
    map(([score, questions]) => `You scored ${score} out of ${questions.length}`)
  );

  storeCurrentQuestions(questions: Question[]) {
    this._currentQuestions$$.next(questions);
  }

  updateUserAnswers(answers: QuestionAnswer[]) {
    this._userAnswers$$.next(answers);
  }
}

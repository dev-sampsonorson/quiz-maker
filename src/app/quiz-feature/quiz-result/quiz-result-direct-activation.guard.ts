import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { QuizService } from "../services";
import { map } from "rxjs";

export const guardQuizResultsFromDirectActivation = () => {
  const router = inject(Router);
  const quizService = inject(QuizService);

  return quizService.currentQuestions$.pipe(
    map(questions => {
      if (questions.length === 0) {
        router.navigate(['/']);
        return false;
      }

      return true;
    })
  )
};

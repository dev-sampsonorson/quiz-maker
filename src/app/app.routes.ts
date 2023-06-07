import { Routes } from "@angular/router";
import { QuizMakerComponent, QuizResultComponent, guardQuizResultsFromDirectActivation } from "./quiz-feature";

export const appRoutes: Routes = [
  {
    path: '',
    component: QuizMakerComponent,
  },
  {
    path: 'result',
    component: QuizResultComponent,
    canActivate: [guardQuizResultsFromDirectActivation]
  }
];

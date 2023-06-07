import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { OpentdbService, QuizService } from "./quiz-feature/services";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    OpentdbService,
    QuizService,
  ]
};

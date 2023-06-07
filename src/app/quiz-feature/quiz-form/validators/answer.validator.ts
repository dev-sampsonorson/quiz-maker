import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Question } from "../../../../types";

export function answerCorrectValidator(question: Question): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = control.value === question.correct_answer;

    return isValid ? null : { answerCorrect: true };
  }
}

import { FormControl, FormGroup } from "@angular/forms";

export type QuestionCategory = {
  value: number;
  label: string;
}

export type QuestionDifficulty = {
  value: string;
  label: 'Easy' | 'Medium' | 'Hard';
}

export type QuestionSearchQuery = {
  category: QuestionCategory['value'];
  difficulty: QuestionDifficulty['value'];
};

export type QuestionSearchFormSchema = {
  category: FormControl<QuestionCategory['value'] | null>;
  difficulty: FormControl<QuestionDifficulty['value'] | null>;
};

export type QuestionSearchFormGroup = FormGroup<QuestionSearchFormSchema>;

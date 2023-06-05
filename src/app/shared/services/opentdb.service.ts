import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

type TriviaCategoriesResponse = {
  trivia_categories: {
    id: number;
    name: string;
  }[];
}

@Injectable()
export class OpentdbService {
  http = inject(HttpClient);

  categories$ = this.http.get<TriviaCategoriesResponse>('/api/api_category.php').pipe(
    map(respose => respose.trivia_categories)
  );

  constructor() { }
}

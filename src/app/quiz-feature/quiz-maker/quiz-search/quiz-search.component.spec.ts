import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSearchComponent } from './quiz-search.component';

describe('QuizSearchComponent', () => {
  let component: QuizSearchComponent;
  let fixture: ComponentFixture<QuizSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizSearchComponent]
    });
    fixture = TestBed.createComponent(QuizSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

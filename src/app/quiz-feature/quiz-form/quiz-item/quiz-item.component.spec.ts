import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizItemComponent } from './quiz-item.component';

describe('QuizItemComponent', () => {
  let component: QuizItemComponent;
  let fixture: ComponentFixture<QuizItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizItemComponent]
    });
    fixture = TestBed.createComponent(QuizItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

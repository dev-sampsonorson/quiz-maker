import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSearchComponent } from './question-search.component';

describe('QuestionSearchComponent', () => {
  let component: QuestionSearchComponent;
  let fixture: ComponentFixture<QuestionSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionSearchComponent]
    });
    fixture = TestBed.createComponent(QuestionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

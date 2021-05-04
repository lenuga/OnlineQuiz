import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqQuizComponent } from './mcq-quiz.component';

describe('McqQuizComponent', () => {
  let component: McqQuizComponent;
  let fixture: ComponentFixture<McqQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McqQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McqQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

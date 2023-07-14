import { TestBed } from '@angular/core/testing';

import { GameOverComponent } from './game-over.component';

describe('GameOverComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [GameOverComponent],
    }),
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(GameOverComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

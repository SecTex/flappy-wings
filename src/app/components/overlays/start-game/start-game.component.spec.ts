import { TestBed } from '@angular/core/testing';

import { StartGameComponent } from './start-game.component';

describe('StartGameComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [StartGameComponent],
    }),
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(StartGameComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { StartGameComponent } from './components/overlays/start-game/start-game.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent, StartGameComponent],
    }),
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

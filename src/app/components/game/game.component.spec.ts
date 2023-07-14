import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { GameComponent } from './game.component';
import { AppState } from '../../states/app.state';
import { SettingsComponent } from '../overlays/settings/settings.component';
import { GameOverComponent } from '../overlays/game-over/game-over.component';

describe('GameComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [GameComponent, SettingsComponent, GameOverComponent],
      imports: [NgxsModule.forRoot([AppState])],
    }),
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(GameComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

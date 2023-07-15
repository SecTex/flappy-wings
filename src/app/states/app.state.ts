import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetBackground, SetLevelSeed } from '../actions/actions';
import { Background } from '../models/background';

export class AppStateModel {
  seed!: number;
  background!: Background;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    seed: 15000,
    background: 'background-1',
  },
})
@Injectable()
export class AppState {
  @Selector()
  static getLevelSeed({ seed }: AppStateModel): number {
    return seed;
  }

  @Selector()
  static getBackground({ background }: AppStateModel): Background {
    return background;
  }

  @Action(SetLevelSeed)
  setLevelSeed(ctx: StateContext<AppStateModel>, { seed }: SetLevelSeed) {
    ctx.patchState({ seed: seed });
  }

  @Action(SetBackground)
  setBackground(ctx: StateContext<AppStateModel>, { background }: SetBackground) {
    ctx.patchState({ background: background });
  }
}

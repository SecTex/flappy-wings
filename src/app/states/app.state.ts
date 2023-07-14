import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetLevelSeed } from '../actions/actions';

export class AppStateModel {
  seed!: number;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    seed: 15000,
  },
})
@Injectable()
export class AppState {
  @Selector()
  static getLevelSeed({ seed }: AppStateModel): number {
    return seed;
  }

  @Action(SetLevelSeed)
  setLevelSeed(ctx: StateContext<AppStateModel>, { seed }: SetLevelSeed) {
    ctx.patchState({ seed: seed });
  }
}

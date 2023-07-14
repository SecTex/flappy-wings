import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { SettingsComponent } from './settings.component';
import { AppState } from '../../../states/app.state';

describe('SettingsComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [NgxsModule.forRoot([AppState])],
    }),
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SettingsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

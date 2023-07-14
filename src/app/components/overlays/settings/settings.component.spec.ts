import { TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
    }),
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SettingsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

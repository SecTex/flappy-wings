import { TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }),
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

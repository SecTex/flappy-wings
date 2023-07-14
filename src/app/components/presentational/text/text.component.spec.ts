import { TestBed } from '@angular/core/testing';

import { TextComponent } from './text.component';

describe('TextComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [TextComponent],
    }),
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TextComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should render', async () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture).toBeTruthy();
  });
});

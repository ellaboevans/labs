import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeTextComponent } from './welcome-text.component';

describe('WelcomeTextComponent', () => {
  let component: WelcomeTextComponent;
  let fixture: ComponentFixture<WelcomeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain('Welcome to the Frontend Quiz!');
  });

  it('should have a sub text', () => {
    const subTextElement: HTMLElement =
      fixture.nativeElement.querySelector('p');
    expect(subTextElement.textContent).toContain(
      'Pick a subject to get started'
    );
  });

  it('should a marked text in the title', () => {
    const markedTextElement: HTMLElement =
      fixture.nativeElement.querySelector('span');
    expect(markedTextElement.textContent).toContain('Frontend Quiz!');
  });
});

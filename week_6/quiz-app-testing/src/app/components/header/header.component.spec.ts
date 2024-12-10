import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SubjectType } from '../../interface/quiz';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize theme from localStorage', () => {
    localStorage.setItem('theme', 'dark-mode');
    component.ngOnInit();
    fixture.detectChanges();
    expect(document.body.className).toBe('dark-mode');
    expect(component.isDarkMode).toBe(true);

    localStorage.setItem('theme', 'light-mode');
    component.ngOnInit();
    fixture.detectChanges();
    expect(document.body.className).toBe('light-mode');
    expect(component.isDarkMode).toBe(false);
  });

  it('should toggle theme and emit event', () => {
    const emitSpy = jest.spyOn(component.themeToggle, 'emit');

    component.onThemeToggle();
    expect(component.isDarkMode).toBe(true);

    expect(document.body.className).toBe('dark-mode');
    expect(emitSpy).toHaveBeenCalled();
    component.onThemeToggle();

    expect(component.isDarkMode).toBe(false);
    expect(document.body.className).toBe('light-mode');
    expect(emitSpy).toHaveBeenCalledTimes(2);
  });

  it('should accept selectedSubject as input', () => {
    const mockSubject: SubjectType = {
      id: '1',
      title: 'HTML',
      icon: 'html-icon',
      questions: [],
    };
    component.selectedSubject = mockSubject;
    fixture.detectChanges();
    expect(component.selectedSubject).toEqual(mockSubject);
  });
});

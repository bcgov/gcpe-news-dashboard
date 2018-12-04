import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeCardComponent } from './theme-card.component';
import { Theme } from '../../shared/theme';

describe('ThemeCardComponent', () => {
  let component: ThemeCardComponent;
  let fixture: ComponentFixture<ThemeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with theme', () => {
    const theme = new Theme("Test Theme", "Test description", 0, true, false, new Date());
    component.theme = theme;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with proper title', () => {
    const theme = new Theme("Test Theme", "Test description", 0, true, false, new Date());
    component.theme = theme;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.card-title');
    expect(div.innerHTML).toBe('Test Theme')
  });

  it('should create with proper description', () => {
    const theme = new Theme("Test Theme", "Test description", 0, true, false, new Date());
    component.theme = theme;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.card-text');
    expect(div.innerHTML).toBe('Test description')
  });

  it('should have last class if last', () => {
    const theme = new Theme("Test Theme", "Test description", 0, true, false, new Date());
    component.theme = theme;
    component.last = true;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.card');
    expect(div.getAttribute('class')).toContain('last');
  });
});

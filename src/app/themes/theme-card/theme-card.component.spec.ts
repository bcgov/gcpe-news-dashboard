import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeCardComponent } from './theme-card.component';
import { Message } from '../../view-models/message';
import { TimeAgoPipe } from 'time-ago-pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('ThemeCardComponent', () => {
  let component: ThemeCardComponent;
  let fixture: ComponentFixture<ThemeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(
        [{path: 'theme/new', component: ThemeCardComponent}]
      )],
      declarations: [ ThemeCardComponent, TimeAgoPipe ]
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
    const theme = { title: "Test Theme", description: "Test description", sortOrder: 0, isPublished: true, timestamp: new Date() } as Message;
    component.theme = theme;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with proper title', () => {
    const theme = { title: "Test Theme", description: "Test description", sortOrder: 0, isPublished: true, timestamp: new Date() } as Message;
    component.theme = theme;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.card-title');
    expect(div.innerHTML).toBe('Test Theme')
  });

  it('should create with proper description', () => {
    const theme = { title: "Test Theme", description: "Test description", sortOrder: 0, isPublished: true, timestamp: new Date() } as Message;
    component.theme = theme;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.card-text');
    expect(div.innerHTML).toBe('Test description')
  });
});

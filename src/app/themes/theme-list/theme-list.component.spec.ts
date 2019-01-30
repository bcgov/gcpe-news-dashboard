import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSubMenuComponent } from '../../core/theme-sub-menu/theme-sub-menu.component'
import { ThemeListComponent } from './theme-list.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BASE_PATH } from '../../variables';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FakeThemeData } from '../../test-helpers/themes';
import { ThemeCardComponent } from '../theme-card/theme-card.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from '../../view-models/message';
import { AlertsService } from 'src/app/services/alerts.service';

describe('ThemeListComponent', () => {
  let component: ThemeListComponent;
  let fixture: ComponentFixture<ThemeListComponent>;
  let messagesService: MessagesService;
  let alerts: AlertsService;
  let themes: Message[] = FakeThemeData(10, 0, false);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule,
        HttpClientModule,
       ],
      declarations: [ 
        ThemeListComponent,
        ThemeSubMenuComponent,
        ThemeCardComponent,
        TimeAgoPipe
      ],
      providers: [
        AlertsService,
        MessagesService,
        { provide: BASE_PATH, useValue: environment.apiUrl }
      ],
    });
  }));

  beforeEach(() => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: { data: of({
      themes: FakeThemeData(10, 0, false)
    })}});
    fixture = TestBed.createComponent(ThemeListComponent);
    alerts = TestBed.get(AlertsService);
    messagesService = TestBed.get(MessagesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unpublish a theme', () => {
    const theme = themes[0];
    const observe = of({});
    spyOn(messagesService, 'updateMessage').and.returnValue(observe);
    spyOn(component, 'removeThemeFromList');

    component.unpublishTheme(theme);

    expect(messagesService.updateMessage).toHaveBeenCalledWith(theme.id, {...theme, isPublished: false});
    expect(component.removeThemeFromList).toHaveBeenCalledWith(theme.id);
  });

  it('should remove a theme from the theme list', () => {
    component.themes = themes;

    component.removeThemeFromList(themes[0].id);

    expect(component.themes.length).toEqual(9);
  });

  it('should handle a sort up event successfully', () => {
    component.themes = themes;
    spyOn(messagesService, 'updateMessage').and.returnValue(of({}));
    const themeToSort = themes[1];
    
    component.sortEventReceived({ direction: 'up', themeId: themeToSort.id });

    expect(messagesService.updateMessage).toHaveBeenCalledWith(themeToSort.id, {...themeToSort, sortOrder: themeToSort.sortOrder - 1});
  });

  it('should ignore an invalid sort up event', () => {
    component.themes = themes;
    spyOn(messagesService, 'updateMessage');
    const themeToSort = themes[0];
    
    component.sortEventReceived({ direction: 'up', themeId: themeToSort.id });

    expect(messagesService.updateMessage).not.toHaveBeenCalled();
  });

  it('should handle a sort down event successfully', () => {
    component.themes = themes;
    spyOn(messagesService, 'updateMessage').and.returnValue(of({}));
    const themeToSort = themes[0];
    
    component.sortEventReceived({ direction: 'down', themeId: themeToSort.id });

    expect(messagesService.updateMessage).toHaveBeenCalledWith(themeToSort.id, {...themeToSort, sortOrder: themeToSort.sortOrder + 1});
  });

  it('should ignore an invalid sort down event', () => {
    component.themes = themes;
    spyOn(messagesService, 'updateMessage');
    const themeToSort = themes[themes.length - 1];
    
    component.sortEventReceived({ direction: 'down', themeId: themeToSort.id });

    expect(messagesService.updateMessage).not.toHaveBeenCalled();
  });

  it('should show error alert if failure to retrieve themes', () => {
    spyOn(alerts, 'showError');
    component.parseThemes({});
    expect(alerts.showError).toHaveBeenCalled();
  });

  it('should show error alert if theme fails to unpublish', () => {
    spyOn(messagesService, 'updateMessage').and.returnValue(throwError('error'));
    spyOn(alerts, 'showError');
    component.unpublishTheme({title: 'theme'});
    expect(alerts.showError).toHaveBeenCalled();
  });
});

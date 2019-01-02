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

describe('ThemeListComponent', () => {
  let component: ThemeListComponent;
  let fixture: ComponentFixture<ThemeListComponent>;
  let messagesService: MessagesService;
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

  it('should handle a sort up event succesfully', () => {
    component.themes = themes;
    spyOn(component, 'swapSortOrders');
    const themeToSort = themes[1];
    
    component.sortEventReceived({ direction: 'up', themeId: themeToSort.id });

    expect(component.swapSortOrders).toHaveBeenCalledWith(1, 0);
  });

  it('should ignore an invalid sort up event', () => {
    component.themes = themes;
    spyOn(component, 'swapSortOrders');
    const themeToSort = themes[0];
    
    component.sortEventReceived({ direction: 'up', themeId: themeToSort.id });

    expect(component.swapSortOrders).not.toHaveBeenCalled();
  });

  it('should handle a sort down event succesfully', () => {
    component.themes = themes;
    spyOn(component, 'swapSortOrders');
    const themeToSort = themes[0];
    
    component.sortEventReceived({ direction: 'down', themeId: themeToSort.id });

    expect(component.swapSortOrders).toHaveBeenCalledWith(0, 1);
  });

  it('should ignore an invalid sort down event', () => {
    component.themes = themes;
    spyOn(component, 'swapSortOrders');
    const themeToSort = themes[themes.length - 1];
    
    component.sortEventReceived({ direction: 'down', themeId: themeToSort.id });

    expect(component.swapSortOrders).not.toHaveBeenCalled();
  });

  it('should swap sort orders of themes', () => {
    component.themes = [...themes];
    spyOn(messagesService, 'updateMessage').and.returnValues(of(themes[0]), of(themes[1]));

    component.swapSortOrders(0, 1);

    expect(messagesService.updateMessage).toHaveBeenCalledTimes(2);
    expect(component.themes[0].id).toBe(themes[1].id);
    expect(component.themes[1].id).toBe(themes[0].id);
  });

  it('should use messages service to swap sort orders of themes', () => {
    component.themes = [...themes];
    spyOn(messagesService, 'updateMessage').and.returnValue(throwError({message: "Failed to update"}));
    spyOn(component, "handleError");

    component.swapSortOrders(0, 1);

    expect(messagesService.updateMessage).toHaveBeenCalledTimes(2);
    expect(component.handleError).toHaveBeenCalledWith("Failed to change order of themes");
  });
});

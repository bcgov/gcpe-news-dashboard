import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { ThemesOfWeekComponent } from './themes-of-week.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, from } from 'rxjs';
import { Theme } from 'src/app/shared/theme';
import { FakeThemeData } from '../../test-helpers/themes';
import { ActivatedRoute } from '@angular/router';



describe('ThemesOfWeekComponent', () => {
  let component: ThemesOfWeekComponent;
  let fixture: ComponentFixture<ThemesOfWeekComponent>;
  let div: HTMLElement;
  let route;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule,
        HttpClientTestingModule
       ],
      declarations: [
        ThemesOfWeekComponent,
        HqDashboardSubMenuComponent
      ],
      providers: [
        { provide: 'BASE_API_URL', useValue: environment.apiUrl },
        { provide: 'BASE_HUB_API_URL', useValue: environment.hubApiUrl }
      ],
    })
    .compileComponents();
  }));

  describe('with 10 published and no message', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: { data: of({
        themes: FakeThemeData(10, 0, false)
      })}})
      fixture = TestBed.createComponent(ThemesOfWeekComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      div = fixture.nativeElement.querySelector('#theme-list-container');
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show full width', () => {
      component.ngOnInit();
      const themeListClass = div.querySelector('#theme-list').getAttribute('class');
      expect(themeListClass).toContain('col-sm-12');
    });

    it('should show 10 theme cards', () => {
      component.ngOnInit();
      const themeList = div.querySelector('#theme-list');
      expect(themeList.querySelectorAll('.card').length).toBe(10);
    });
  });

  describe('with 20 published and a message', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: { data: of({
        themes: FakeThemeData(20, 0, true)
      })}})
      fixture = TestBed.createComponent(ThemesOfWeekComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      div = fixture.nativeElement.querySelector('#theme-list-container');
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have themes in 8 columns', () => {
      component.ngOnInit();
      const themeListClass = div.querySelector('#theme-list').getAttribute('class');
      expect(themeListClass).toContain('col-sm-8');
    });

    it('should show 20 theme cards', () => {
      component.ngOnInit();
      const themeList = div.querySelector('#theme-list');
      expect(themeList.querySelectorAll('.card').length).toBe(20);
    });

    it('should show message', () => {
      component.ngOnInit();
      const message = div.querySelector('.message');
      expect(message).toBeTruthy();
      expect(message.getAttribute('class')).toContain('col-sm-4');
      expect(message.innerHTML).toContain('MESSAGE');
    });
  });

  describe('with 2 published themes, 1 unpublished theme and an unpublished message', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: { data: of({
        themes: FakeThemeData(2, 1, false)
      })}})
      fixture = TestBed.createComponent(ThemesOfWeekComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      div = fixture.nativeElement.querySelector('#theme-list-container');
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have 2 theme cards', () => {
      component.ngOnInit();
      const themeList = div.querySelector('#theme-list');
      expect(themeList.querySelectorAll('.card').length).toBe(2);
    });

    it('should not have a message', () => {
      component.ngOnInit();
      const themeList = div.querySelector('#theme-list');
      expect(themeList.querySelectorAll('.card').length).toBe(2);
    });
  });
});

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './core/navmenu/navmenu.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './core/footer/footer.component';
import { OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AlertComponent } from './core/alert/alert.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';

class MockRouterService {
  private subject = new Subject();
  public events = this.subject.asObservable();

  triggerNavStart(url: string) {
    let ns = new NavigationStart(0, url, null);
    this.subject.next(ns);
  }

  triggerNavEnd(url: string) {
    let ne = new NavigationEnd(0, url, null);
    this.subject.next(ne);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    const mockRouterService = new MockRouterService();
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbCollapseModule.forRoot(),
        NgbDropdownModule.forRoot(),
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        NavMenuComponent,
        FooterComponent,
        HasRoleDirective,
        AlertComponent
      ],
      providers: [
        OAuthService,
        UrlHelperService,
        OAuthLogger,
        { provide: Router, useValue: mockRouterService },
        { provide: 'BASE_API_URL', useValue: environment.apiUrl }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'BC Gov News'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('BC Gov News');
  });

  fit('should show loading spinner while navigating', () => {
    let router = TestBed.get(Router);
    expect(component.isLoading).toBeTruthy();
    router.triggerNavStart('http://localhost/test');
    expect(component.isLoading).toBeTruthy();
    router.triggerNavEnd('http://localhost/test');
    expect(component.isLoading).toBeFalsy();
  });
});

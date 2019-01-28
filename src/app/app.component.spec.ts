import { TestBed, async } from '@angular/core/testing';
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
import { AlertsService } from './services/alerts.service';
import { AlertComponent } from './core/alert/alert.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
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
        { provide: 'BASE_API_URL', useValue: environment.apiUrl }
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'BC Gov News'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('BC Gov News');
  });

});

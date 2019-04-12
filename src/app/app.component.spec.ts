import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NavMenuComponent } from './core/navmenu/navmenu.component';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { AlertComponent } from './core/alert/alert.component';
import { Configuration } from './configuration';
import { environment } from '../environments/environment';
import { FooterComponent } from './core/footer/footer.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AuthService } from './_auth/auth.service';
import { mockAuth } from './test-helpers/mock-auth';
import { LoadingSpinnerComponent } from './core/loading-spinner/loading-spinner.component';

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
        AlertComponent,
        LoadingSpinnerComponent
      ],
      providers: [
        { provide: Configuration, useValue: new Configuration({ withCredentials: true, accessToken: ''})},
        { provide: Router, useValue: mockRouterService },
        { provide: 'BASE_API_URL', useValue: environment.apiUrl },
        { provide: AuthService, useClass: mockAuth }
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

  it("should have as title 'BC Gov News'", () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('BC Gov News');
  });
});

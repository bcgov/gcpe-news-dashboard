/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './navmenu.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HasRoleDirective } from 'src/app/_directives/hasRole.directive';
import { AuthService } from 'src/app/_auth/auth.service';
import { Configuration } from 'src/app/configuration';
import { mockAuth } from 'src/app/test-helpers/mock-auth';

describe('NavmenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule,
        HttpClientModule,
        NgbDropdownModule.forRoot(),
        NgbCollapseModule.forRoot()
      ],
      declarations: [
        NavMenuComponent,
        HasRoleDirective
      ],
      providers: [
        { provide: AuthService, useClass: mockAuth },
        { provide: Configuration, useValue: new Configuration({ withCredentials: true, accessToken: ''})},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.gov-navbar'));
    element = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a BC gov logo', () => {
    expect(element.innerHTML).toContain('img');
  });

  it('should have a title', () => {
    fixture.detectChanges();
    expect(element.textContent).toContain('BC Gov News');
  });

  // Tests commented out for MVP since the buttons are removed

  // it('should display the `search` button', () => {
  //     // There should a create button in the template
  //     expect(element.innerHTML).toContain('fa-search');
  // });

  // it('should display the `Topics` button', () => {
  //   // There should a create button in the template
  //   expect(element.innerHTML).toContain('Topics');
  // });

  // it('should display the `hamburger` menu', () => {
  //   // There should a create button in the template
  //   expect(element.innerHTML).toContain('navbar-toggler-icon');
  // });

  it('should get a unique colour for each letter', () => {
    const letters = [...Array(26).keys()].map(i => String.fromCharCode(i + 67));
    const colours = letters.map(letter => component.getColor(letter));
    const coloursSet = [...new Set(colours)];
    expect(colours.length).toBe(coloursSet.length);
  });
});

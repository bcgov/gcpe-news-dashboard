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
import { OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';

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
        NavMenuComponent
      ],
      providers: [
        OAuthService,
        UrlHelperService,
        OAuthLogger
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.gov-navbar'));
    element  = de.nativeElement;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a BC gov logo', () => {
    expect(element.innerHTML).toContain("img");
  });

  it('should have a title', () => {
    fixture.detectChanges();
    expect(element.textContent).toContain('BC Gov News');
  });

  it('should display the `search` button', () => {
      //There should a create button in the template
      expect(element.innerHTML).toContain("fa-search");
  });

  it('should display the `Topics` button', () => {
    //There should a create button in the template
    expect(element.innerHTML).toContain("Topics");
  });

  it('should display the `hamburger` menu', () => {
    //There should a create button in the template
    expect(element.innerHTML).toContain("navbar-toggler-icon");
  });

  it('should have the user`s first initial', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(true);
    spyOn(component, 'getFirstLetter').and.returnValue('A');
    fixture.detectChanges();
    
    expect(element.querySelector('.user-image').innerHTML).toBe('A');
  });

  it('should get a unique colour for each letter', () => {
    const letters = [...Array(26).keys()].map(i => String.fromCharCode(i + 67));
    const colours = letters.map(letter => component.getColor(letter));
    const coloursSet = [...new Set(colours)];
    expect(colours.length).toBe(coloursSet.length);
  });
})

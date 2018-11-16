import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSubMenuComponent } from './theme-sub-menu.component';

describe('ThemeSubMenuComponent', () => {
  let component: ThemeSubMenuComponent;
  let fixture: ComponentFixture<ThemeSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeSubMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

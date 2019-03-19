import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HasRoleDirective } from './hasRole.directive';
import { ViewContainerRef, Component, TemplateRef } from '@angular/core';
import { AuthService } from '../_auth/auth.service';
import { By } from '@angular/platform-browser';
import { mockAuth } from '../test-helpers/mock-auth';

@Component({template: ''})
class TestAdminDiv {}


describe('Directive: HasRole', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [
        HasRoleDirective,
        TestAdminDiv
      ],
      providers: [
        { provide: ViewContainerRef, useValue: { clear: () => {}, createEmbeddedView: () => {}} },
        TemplateRef,
        { provide: AuthService, useClass: mockAuth }
      ]
    });
  });
  it('admin div should show if admin', () => {
    const fixture = createTestComponent(`<div *appHasRole="['Administrators']">admins only</div>`)
    spyOn(TestBed.get(AuthService), 'roleMatch').and.returnValue(true);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('div')).length).toEqual(1);
  });
  it('admin div shouldnt show if not admin', () => {
    const fixture = createTestComponent(`<div *appHasRole="['Administrators']">admins only</div>`)
    spyOn(TestBed.get(AuthService), 'roleMatch').and.returnValue(false);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('div')).length).toEqual(0);
  });
});

function createTestComponent(template: string): ComponentFixture<TestAdminDiv> {
  return TestBed.overrideComponent(TestAdminDiv, { set: { template: template } })
      .createComponent(TestAdminDiv);
}

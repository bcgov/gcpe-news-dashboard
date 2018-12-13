import { ClickPreventDefaultDirective } from './click-preventdefault.directive';
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<a href="#" (click.preventDefault)="test()">Link</a>`
})
class TestPreventDefaultComponent {
  test() {}
}

describe('ClickPreventDefaultDirective', () => {
  let component: TestPreventDefaultComponent;
  let fixture: ComponentFixture<TestPreventDefaultComponent>
  let aEl: DebugElement;
  let directive: ClickPreventDefaultDirective;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickPreventDefaultDirective, TestPreventDefaultComponent]
    });

    fixture = TestBed.createComponent(TestPreventDefaultComponent);
    component = fixture.componentInstance;
    aEl = fixture.debugElement.query(By.css('a'));
    directive = aEl.injector.get<ClickPreventDefaultDirective>(ClickPreventDefaultDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent default and call proper function', () => {
    var event = {
        type: 'click',
        preventDefault: function () {}
    };
    var preventDefaultSpy = spyOn(event, 'preventDefault');
    spyOn(component, 'test');

    aEl.triggerEventHandler('click', event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.test).toHaveBeenCalled();
  });

  it('should unsubscribe', () => {
    spyOn(directive, 'unsubscribe');

    fixture.destroy();

    expect(directive.unsubscribe).toHaveBeenCalled();
  });
});

import { AutosizeDirective } from './autosize.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<textarea autosize></textarea>`
})
class TestAutosizeComponent {}

@Component({
  template: `<textarea autosize minHeight="200"></textarea>`
})
class MinHeightTestAutosizeComponent {}

@Component({
  template: `<textarea autosize maxHeight="200"></textarea>`
})
class MaxHeightTestAutosizeComponent {}

describe('Autosize', () => {
  let component: TestAutosizeComponent;
  let fixture: ComponentFixture<TestAutosizeComponent>;
  let textareaEl: DebugElement;
  let autosizeDirective: AutosizeDirective;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [AutosizeDirective, TestAutosizeComponent, MinHeightTestAutosizeComponent, MaxHeightTestAutosizeComponent]
    });

    fixture = TestBed.createComponent(TestAutosizeComponent);
    component = fixture.componentInstance;
    textareaEl = fixture.debugElement.query(By.css('textarea'));
    textareaEl.nativeElement.style.resize = 'vertical';
    autosizeDirective = textareaEl.injector.get<AutosizeDirective>(AutosizeDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
    expect(textareaEl.nativeElement.style.overflow).toBe('hidden');
  });

  it('should call adjust on resize if new width', () => {
    spyOn(autosizeDirective, "adjust");

    textareaEl.nativeElement.style.width = `${textareaEl.nativeElement.clientWidth / 2}px`;
    window.dispatchEvent(new Event('resize'));
    
    expect(autosizeDirective.adjust).toHaveBeenCalled();
  });

  it('should not call adjust on resize if same width', () => {
    spyOn(autosizeDirective, "adjust");

    window.dispatchEvent(new Event('resize'));
    
    expect(autosizeDirective.adjust).not.toHaveBeenCalled();
  });

  it('should call adjust on input', () => {
    spyOn(autosizeDirective, "adjust");

    textareaEl.nativeElement.dispatchEvent(new Event('input'));
    
    expect(autosizeDirective.adjust).toHaveBeenCalled();
  });

  it('should not allow element to resize vertically', () => {
    // Starts as vertical which changes to none
    expect(textareaEl.nativeElement.style.resize).toBe('none');

    fixture = TestBed.createComponent(TestAutosizeComponent);
    component = fixture.componentInstance;
    textareaEl = fixture.debugElement.query(By.css('textarea'));
    textareaEl.nativeElement.style.resize = 'both';
    autosizeDirective = textareaEl.injector.get<AutosizeDirective>(AutosizeDirective);
    fixture.detectChanges();
    
    expect(textareaEl.nativeElement.style.resize).toBe('horizontal');
  });

  it('should adjust on init', () => {
    fixture = TestBed.createComponent(TestAutosizeComponent);
    component = fixture.componentInstance;
    textareaEl = fixture.debugElement.query(By.css('textarea'));
    textareaEl.nativeElement.style.resize = 'both';
    autosizeDirective = textareaEl.injector.get<AutosizeDirective>(AutosizeDirective);
    spyOn(autosizeDirective, "adjust");
    fixture.detectChanges();
    
    expect(autosizeDirective.adjust).toHaveBeenCalled();
  });

  it('should set new height on resize', () => {
    autosizeDirective.resize(100);
    expect(textareaEl.nativeElement.style.height).toEqual('100px');

    autosizeDirective.resize(300);
    expect(textareaEl.nativeElement.style.height).toEqual('300px');

    autosizeDirective.resize(10);
    expect(textareaEl.nativeElement.style.height).toEqual('10px');
  });

  it('should grow and shrink when necessary', () => {
    const initialHeight = textareaEl.nativeElement.clientHeight;
    const spy = spyOn(autosizeDirective, "resize").and.callThrough();
    
    textareaEl.nativeElement.value = "test\ntest2\ntest3\ntest4\ntest5";
    textareaEl.nativeElement.dispatchEvent(new Event('input'));

    expect(autosizeDirective.resize).toHaveBeenCalled();
    expect(spy.calls.allArgs()[0][0]).toBeGreaterThan(initialHeight);
    spy.calls.reset();
    const newHeight = textareaEl.nativeElement.clientHeight;

    textareaEl.nativeElement.value = "test";
    textareaEl.nativeElement.dispatchEvent(new Event('input'));

    expect(autosizeDirective.resize).toHaveBeenCalled();
    expect(spy.calls.allArgs()[0][0]).toBeLessThan(newHeight);
  });

  it('shouldnt grow and shrink when not necessary', () => {
    const initialHeight = textareaEl.nativeElement.clientHeight;
    const spy = spyOn(autosizeDirective, "resize").and.callThrough();
    
    textareaEl.nativeElement.value = "test";
    textareaEl.nativeElement.dispatchEvent(new Event('input'));

    expect(textareaEl.nativeElement.clientHeight).toBe(initialHeight);
    expect(autosizeDirective.resize).not.toHaveBeenCalled();
  });

  it('should update minHeight of element', () => {
    fixture = TestBed.createComponent(MinHeightTestAutosizeComponent);
    textareaEl = fixture.debugElement.query(By.css('textarea'));
    textareaEl.nativeElement.style.resize = 'vertical';
    autosizeDirective = textareaEl.injector.get<AutosizeDirective>(AutosizeDirective);
    fixture.detectChanges();
    
    expect(textareaEl.nativeElement.style.minHeight).toBe("200px");
  });

  it('should update maxHeight of element', () => {
    fixture = TestBed.createComponent(MaxHeightTestAutosizeComponent);
    textareaEl = fixture.debugElement.query(By.css('textarea'));
    textareaEl.nativeElement.style.resize = 'vertical';
    autosizeDirective = textareaEl.injector.get<AutosizeDirective>(AutosizeDirective);
    fixture.detectChanges();
    
    expect(textareaEl.nativeElement.style.maxHeight).toBe("200px");
  });
});

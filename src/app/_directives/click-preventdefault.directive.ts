import { Directive, Output, EventEmitter, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[click.preventDefault]'
})
export class ClickPreventDefaultDirective implements OnInit, OnDestroy {
  @Output('click.preventDefault') preventEvent = new EventEmitter();
  unsubscribe: Function;

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit() {
    this.unsubscribe = this.renderer.listen(this.element.nativeElement, 'click', event => {
      event.preventDefault();
      this.preventEvent.emit(event);
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}

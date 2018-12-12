import { Directive, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[click.prevent]'
})
export class ClickPreventDefaultDirective {
  @Output("click.prevent") preventEvent = new EventEmitter();
  unsubscribe;

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit() {
    this.unsubscribe = this.renderer.listen(this.element.nativeElement, "click", event => {
      event.preventDefault();
      this.preventEvent.emit(event);
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}

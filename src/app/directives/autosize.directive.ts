import { Input, AfterViewInit, ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
  selector: 'textarea[autosize]'
})
export class AutosizeDirective implements AfterViewInit {
  private el: HTMLElement;
  private _initialHeight: number;
  private _minHeight: number;
  private _maxHeight: number;
  private _clientWidth: number;
  private _rows: number = 0;
  private _rowHeight: number;

  @Input('minHeight')
  get minHeight(): number {
    return this._minHeight;
  }
  set minHeight(val: number) {
    this._minHeight = val;
    this.updateMinHeight();
  }

  @Input('maxHeight')
  get maxHeight(): number {
    return this._maxHeight;
  }
  set maxHeight(val: number) {
    this._maxHeight = val;
    this.updateMaxHeight();
  }

  @HostListener('window:resize', ['$event.target'])
    onResize(textArea: HTMLTextAreaElement): void {
      if (this.el.clientWidth === this._clientWidth) {
        return;
      };
      this._clientWidth = this.el.clientWidth;
      this.adjust();
    }

  @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
      this.adjust();
    }

  constructor(public element: ElementRef) {
    this.el = element.nativeElement;
    this.el.style.overflow = 'hidden';
    this.el.setAttribute('rows', '1');
    this._clientWidth = this.el.clientWidth;
  }

  ngAfterViewInit(): void {
    const style = window.getComputedStyle(this.el, null);

    if (style.resize === 'both') {
      this.el.style.resize = 'horizontal';
    } else if (style.resize === 'vertical') {
      this.el.style.resize = 'none';
    }
    this._initialHeight = this.el.clientHeight;

    this.adjust();
  }

  resize(newSize: number): void {
    this.el.style.height = '0px';
    this.el.style.height = newSize + 'px';
  }

  adjust(): void {
    const prevRows = this._rows;
    this._rows = this.element.nativeElement.value.split('\n').length;
    if (this.el.style.height === this.el.scrollHeight + 'px' && this._rows === prevRows) {
      return;
    }
    if (this._rows < prevRows) {
      const shrinkTo = (this._rowHeight * (this._rows - 1)) + this._initialHeight;
      this.resize(shrinkTo);
    }
    this._rowHeight = this.el.scrollHeight - parseInt(this.el.style.height);
    this.resize(this.el.scrollHeight);
  }

  updateMinHeight(): void {
    this.el.style.minHeight = this._minHeight + 'px';
  }

  updateMaxHeight(): void {
    this.el.style.maxHeight = this._maxHeight + 'px';
  }
}

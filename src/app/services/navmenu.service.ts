import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavmenuService {
  private visibleSource: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public visible = this.visibleSource.asObservable();

  hide() {
    this.visibleSource.next(false);
  }

  show() {
    this.visibleSource.next(true);
  }
}

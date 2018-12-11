import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavmenuService {
  private navNameSource: BehaviorSubject<string> = new BehaviorSubject('default');
  public name = this.navNameSource.asObservable();

  change(name) {
    this.navNameSource.next(name);
  }
}

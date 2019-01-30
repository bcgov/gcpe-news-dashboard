import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private visibleSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public visible = this.visibleSource.asObservable();
  public message: string;
  public class: string;

  remove() {
    this.message = '';
    this.class = '';
    this.visibleSource.next(false);
  }

  showError(message: string) {
    this.show(message, 'alert-danger');
  }

  showInfo(message: string) {
    this.show(message, 'alert-info');
  }

  showSuccess(message: string) {
    this.show(message, 'alert-success');
  }

  show(message: string, alertClass: string) {
    this.message = message;
    this.class = alertClass;
    this.visibleSource.next(true);
  }

}

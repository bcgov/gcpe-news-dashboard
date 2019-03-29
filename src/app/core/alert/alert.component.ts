import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alertMessage: string;
  alertClass: string;
  alertVisible = false;
  public cancelable = true;

  constructor(private alerts: AlertsService) { }

  ngOnInit() {
    this.alerts.visible.subscribe(visible => {
      if (visible) {
        this.cancelable = this.alerts.cancelable;
        this.alertMessage = this.alerts.message;
        this.alertClass = this.alerts.class;
        this.alertVisible = true;
      } else {
        this.alertVisible = false;
      }
    });
  }

  clearAlerts() {
    this.alerts.remove();
  }

}

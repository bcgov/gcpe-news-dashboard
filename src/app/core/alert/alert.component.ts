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
  alertVisible: boolean = false;

  constructor(private alerts: AlertsService) {
    this.alerts.visible.subscribe(visible => {
      if (visible) {
        this.alertMessage = this.alerts.message;
        this.alertClass = this.alerts.class;
        this.alertVisible = true;
      } else {
        this.alertVisible = false;
      }
    });
  }

  ngOnInit() {
  }

  clearAlerts() {
    this.alerts.remove();
  }

}

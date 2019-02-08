import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
    @Input() title: string;
  // visible = true;

  toggleContent() {
    // this.visible = !this.visible;
  }
}

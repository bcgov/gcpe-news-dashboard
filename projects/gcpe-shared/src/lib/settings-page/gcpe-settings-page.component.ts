import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-gcpe-settings-page',
  templateUrl: './gcpe-settings-page.component.html',
  styleUrls: ['./gcpe-settings-page.component.scss']
})
export class GcpeSettingsPageComponent {
    @Input() title: string;
}

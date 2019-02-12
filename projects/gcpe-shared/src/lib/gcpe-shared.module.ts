import { NgModule } from '@angular/core';
import { GcpeCheckboxComponent } from './checkbox/gcpe-checkbox.component';
import { GcpeSettingsPageComponent } from './settings-page/gcpe-settings-page.component';
import { GcpeSettingsGroupComponent } from './settings-group/gcpe-settings-group.component';

@NgModule({
  declarations: [
    GcpeCheckboxComponent,
    GcpeSettingsPageComponent,
    GcpeSettingsGroupComponent
  ],
  imports: [
  ],
  exports: [
    GcpeCheckboxComponent,
    GcpeSettingsPageComponent,
    GcpeSettingsGroupComponent
  ]
})
export class GcpeSharedModule { }

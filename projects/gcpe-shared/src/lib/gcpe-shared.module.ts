import { NgModule } from '@angular/core';
import { GcpeCheckboxComponent } from './checkbox/gcpe-checkbox.component';
import { GcpeSettingsPageComponent } from './settings-page/gcpe-settings-page.component';

@NgModule({
  declarations: [GcpeCheckboxComponent, GcpeCheckboxComponent],
  imports: [
  ],
  exports: [GcpeCheckboxComponent, GcpeSettingsPageComponent]
})
export class GcpeSharedModule { }

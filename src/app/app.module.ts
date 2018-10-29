import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from  './core/navmenu/navmenu.component';
import { ActivityListComponent } from './activities/activity-list/activity-list.component';
import { ActivityService } from './shared/activity.service';
import { FooterComponent } from './core/footer/footer.component';
 

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ActivityListComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

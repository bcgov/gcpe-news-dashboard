import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from  './core/navmenu/navmenu.component';
import { ActivityListComponent } from './activities/activity-list/activity-list.component';
import { FooterComponent } from './core/footer/footer.component';
import { ActivitiesForecastListComponent } from './activities/activities-forecast-list/activities-forecast-list.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'activity-list', component: ActivityListComponent },
  { path: 'activity-forecast-list', component: ActivitiesForecastListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ActivityListComponent,
    FooterComponent,
    ActivitiesForecastListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

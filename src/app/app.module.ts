import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from  './core/navmenu/navmenu.component';
import { PostListComponent } from './posts/post-list/post-list.component';
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
    PostListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

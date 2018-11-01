import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from  './core/navmenu/navmenu.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { FooterComponent } from './core/footer/footer.component';
import { EntryForecastListComponent } from './entries/entry-list/entry-forecast-list.component';
import { RouterModule, Routes } from '@angular/router';
import { EntryListResolver } from "./_resolvers/entry-list.resolver";
import { PostListResolver } from "./_resolvers/post-list.resolver";
import { ApiService } from './services/api.service';

const appRoutes: Routes = [
  { path: 'last-7-day-post-list', component: PostListComponent,  resolve: { posts: PostListResolver } },
  { path: 'next-7-day-entry-list', component: EntryForecastListComponent, resolve: { entrylist: EntryListResolver }  },
  { path: '', redirectTo: 'last-7-day-post-list', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PostListComponent,
    FooterComponent,
    EntryForecastListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
    AppRoutingModule
  ],
  providers: [
    ApiService,
    EntryListResolver,
    PostListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

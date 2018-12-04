import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from  './core/navmenu/navmenu.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { FooterComponent } from './core/footer/footer.component';
import { EntryForecastListComponent } from './entries/entry-list/entry-forecast-list.component';
import { EntryListResolver } from "./_resolvers/entry-list.resolver";
import { PostListResolver } from "./_resolvers/post-list.resolver";
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ThemesOfWeekComponent } from './themes/themes-of-week/themes-of-week.component';
import { ThemeListResolver } from './_resolvers/theme-list.resolver';
import { SocialMediaListComponent } from './social-media/social-media-list/social-media-list.component';
import { SociaMediaListResolver } from './_resolvers/social-media-list.resolver';
import { SociaMediaTypeListResolver } from './_resolvers/social-media-type-list.resolver';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { HqDashboardSubMenuComponent } from './core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { ThemeSubMenuComponent } from './core/theme-sub-menu/theme-sub-menu.component';
import { ThemeListByAdminResolver } from './_resolvers/theme-list-by-admin.resolver';
import { ThemeCardComponent } from './themes/theme-card/theme-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PostListComponent,
    FooterComponent,
    EntryForecastListComponent,
    ThemesOfWeekComponent,
    SocialMediaListComponent,
    ThemeListComponent,
    HqDashboardSubMenuComponent,
    ThemeSubMenuComponent,
    ThemeCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    OAuthModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ApiService,
    AuthService,
    EntryListResolver,
    PostListResolver,
    ThemeListResolver,
    SociaMediaListResolver,
    SociaMediaTypeListResolver,
    ThemeListByAdminResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

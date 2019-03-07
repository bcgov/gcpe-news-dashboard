import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// tslint:disable-next-line:import-spacing
import { NavMenuComponent } from  './core/navmenu/navmenu.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { FooterComponent } from './core/footer/footer.component';
import { ActivityForecastListComponent } from './activities/activity-list/activity-forecast-list.component';
import { ActivityListResolver } from './_resolvers/activity-list.resolver';
import { PostListResolver } from './_resolvers/post-list.resolver';
import { AuthService } from './services/auth.service';
import { MessagesService } from './services/messages.service';
import { ThemesOfWeekComponent } from './themes/themes-of-week/themes-of-week.component';
import { MessageListResolver } from './_resolvers/message-list.resolver';
import { SociaMediaTypeListResolver } from './_resolvers/social-media-type-list.resolver';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { HqDashboardSubMenuComponent } from './core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { ThemeSubMenuComponent } from './core/theme-sub-menu/theme-sub-menu.component';
import { MessageResolver } from './_resolvers/message.resolver';
import { ThemeCardComponent } from './themes/theme-card/theme-card.component';
import { ThemeFormComponent } from './themes/theme-form/theme-form.component';
import { LoadingSpinnerComponent } from './core/loading-spinner/loading-spinner.component';
import { AutosizeDirective } from './_directives/autosize.directive';
import { ClickPreventDefaultDirective } from './_directives/click-preventdefault.directive';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SociaMediaPostListResolver } from './_resolvers/social-media-post-list.resolver';
import { SocialMediaPostsService } from './services/socialMediaPosts.service';
// tslint:disable-next-line:max-line-length
import { SocialMediaPostListComponent } from './social-media/social-media-post-list/social-media-post-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { SocialMediaInputComponent } from './social-media/social-media-input/social-media-input.component';
import { SocialMediaRenderService } from './services/socialMediaRender.service';
import { AppConfigService } from './app-config.service';
import { PluralizeKindPipe } from './_pipes/pluralize-kind.pipe';
import { SocialMediaPostComponent } from './social-media/social-media-post/social-media-post.component';
import { AlertComponent } from './core/alert/alert.component';
import { ApiModule, getApiConfig } from './api.module';
import { RoleGuard } from './_guards/role.guard';
import { ActivitiesService } from './services/activities.service';
import { PostsService } from './services/posts.service';
import { AddSocialMediaPostComponent } from './social-media/add-social-media-post/add-social-media-post.component';
import { OAuthModule, OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
      return appConfig.loadAppConfig();
  }
};

@NgModule({
  declarations: [
    // Components
    ActivityForecastListComponent,
    AlertComponent,
    AppComponent,
    FooterComponent,
    HqDashboardSubMenuComponent,
    ThemesOfWeekComponent,
    ThemeListComponent,
    ThemeSubMenuComponent,
    ThemeCardComponent,
    ThemeFormComponent,
    NavMenuComponent,
    PostListComponent,
    SocialMediaInputComponent,
    SocialMediaPostListComponent,
    SocialMediaPostComponent,
    LoadingSpinnerComponent,
    AddSocialMediaPostComponent,
    // Directives
    AutosizeDirective,
    ClickPreventDefaultDirective,
    HasRoleDirective,
    // Pipes
    TimeAgoPipe,
    PluralizeKindPipe
  ],
  imports: [
    AppRoutingModule,
    ApiModule.forRoot(getApiConfig),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    // Services
    ActivitiesService,
    AuthService,
    MessagesService,
    SocialMediaPostsService,
    PostsService,
    SocialMediaRenderService,
    // Resolvers
    ActivityListResolver,
    PostListResolver,
    MessageListResolver,
    SociaMediaTypeListResolver,
    MessageResolver,
    SociaMediaPostListResolver,
    // Guards
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

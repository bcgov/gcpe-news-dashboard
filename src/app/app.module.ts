import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Pipe } from '@angular/core';
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
import { AuthService } from './_auth/auth.service';
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
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AlertComponent } from './core/alert/alert.component';
import { ApiModule, getApiConfig } from './api.module';
import { RoleGuard } from './_guards/role.guard';
import { ActivitiesService } from './services/activities.service';
import { PostsService } from './services/posts.service';
import { AddSocialMediaPostComponent } from './social-media/add-social-media-post/add-social-media-post.component';
import { MinistriesService } from './services/ministries.service';
import { GcpeSharedModule } from '../../projects/gcpe-shared/src/public_api';
import { UserMinistryListResolver } from './_resolvers/user-ministry-list.resolver';
import { UserPreferencesService } from './services/userPreferences.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { AuthProviderFactory } from './_auth/auth-provider-factory';
import { AuthProvider } from './_auth/auth-provider.service';
import { HomeComponent } from './home/home.component';
import { UtilsService } from './services/utils.service';
import { MinistriesProvider } from './_providers/ministries.provider';
import { SnowplowService } from './services/snowplow.service';
import { DatePipe } from '@angular/common';
import { SocialMediaPageViewComponent } from './social-media/social-media-page-view/social-media-page-view.component';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
      return appConfig.loadAppConfig();
  };
};

export function ministriesProviderFactory(provider: MinistriesProvider) {
  return () => provider.load();
}

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoExtendsPipe extends TimeAgoPipe {}

@NgModule({
  declarations: [
    // Components
    ActivityForecastListComponent,
    AlertComponent,
    AppComponent,
    FooterComponent,
    HqDashboardSubMenuComponent,
    ActivityForecastListComponent,
    AccountSettingsComponent,
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
    HomeComponent,
    // Directives
    AutosizeDirective,
    ClickPreventDefaultDirective,
    HasRoleDirective,
    // Pipes
    TimeAgoExtendsPipe,
    PluralizeKindPipe,
    SocialMediaPageViewComponent
  ],
  imports: [
    AppRoutingModule,
    ApiModule.forRoot(getApiConfig),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GcpeSharedModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    MinistriesProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: ministriesProviderFactory,
      deps: [MinistriesProvider],
      multi: true
    },
    DatePipe,
    // Services
    { provide: AuthProvider, useFactory: AuthProviderFactory, deps: [AppConfigService, OAuthService] },
    ActivitiesService,
    AuthService,
    MessagesService,
    MinistriesService,
    SocialMediaPostsService,
    PostsService,
    SnowplowService,
    SocialMediaRenderService,
    UserPreferencesService,
    UtilsService,
    // Resolvers
    ActivityListResolver,
    PostListResolver,
    MessageListResolver,
    SociaMediaTypeListResolver,
    MessageResolver,
    SociaMediaPostListResolver,
    UserMinistryListResolver,
    // Guards
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

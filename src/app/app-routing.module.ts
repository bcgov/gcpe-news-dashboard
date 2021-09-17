import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListResolver } from './_resolvers/post-list.resolver';
import { ActivityForecastListComponent } from './activities/activity-list/activity-forecast-list.component';
import { ActivityListResolver } from './_resolvers/activity-list.resolver';
import { ThemesOfWeekComponent } from './themes/themes-of-week/themes-of-week.component';
import { MessageListResolver } from './_resolvers/message-list.resolver';
import { SociaMediaTypeListResolver } from './_resolvers/social-media-type-list.resolver';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { MessageResolver } from './_resolvers/message.resolver';
import { ThemeFormComponent } from './themes/theme-form/theme-form.component';
import { SociaMediaPostListResolver } from './_resolvers/social-media-post-list.resolver';
import { SocialMediaPostListComponent } from './social-media/social-media-post-list/social-media-post-list.component';
import { SocialMediaInputComponent } from './social-media/social-media-input/social-media-input.component';
import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/role.guard';
import { AddSocialMediaPostComponent } from './social-media/add-social-media-post/add-social-media-post.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserMinistryListResolver } from './_resolvers/user-ministry-list.resolver';
import { MinistriesResolver } from './_resolvers/ministries.resolver';
import { HqDashboardSubMenuComponent } from './core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { HomeComponent } from './home/home.component';
import { SocialMediaPageViewComponent} from './social-media/social-media-page-view/social-media-page-view.component';

const appRoutes: Routes = [
  { path: 'account-settings', component: AccountSettingsComponent, resolve: { ministries: MinistriesResolver } },
  {
    path: 'last-7-day-post-list',
    component: PostListComponent,
    resolve: { posts: PostListResolver, userMinistries: UserMinistryListResolver },
  },
  {
    path: 'next-7-day-activity-list',
    component: ActivityForecastListComponent,
    resolve: {
      activities: ActivityListResolver,
      userMinistries: UserMinistryListResolver
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Viewer', 'Contributor']
    }
  },
  {
    path: 'message-centre',
    runGuardsAndResolvers: 'always',
    component: ThemesOfWeekComponent,
    resolve: { themes: MessageListResolver },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Viewer', 'Contributor']
    }
  },
  {
    path: 'social-media-list',
    component: SocialMediaPostListComponent,
    resolve: { socialmedia: SociaMediaPostListResolver, socialmediatype: SociaMediaTypeListResolver },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Viewer', 'Contributor']
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'social-media-page-view',
    component: SocialMediaPageViewComponent,
    resolve: { socialmedia: SociaMediaPostListResolver, socialmediatype: SociaMediaTypeListResolver }
  },
  {
    path: 'social-media-input',
    component: SocialMediaInputComponent,
    resolve: { socialmedia: SociaMediaPostListResolver },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Contributor']
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'social-media/new',
    component: AddSocialMediaPostComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Contributor']
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'messages',
    component: ThemeListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Contributor']
    },
    resolve: { themelist: MessageListResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'message/new',
    component: ThemeFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Contributor']
    }
  },
  {
    path: 'message/edit/:id',
    component: ThemeFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Contributor']
    },
    resolve: { theme: MessageResolver }
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'disabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

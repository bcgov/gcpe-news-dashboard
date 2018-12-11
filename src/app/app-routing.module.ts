import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListResolver } from './_resolvers/post-list.resolver';
import { ActivityForecastListComponent } from './activities/activity-list/activity-forecast-list.component';
import { ActivityListResolver } from './_resolvers/activity-list.resolver';
import { ThemesOfWeekComponent } from './themes/themes-of-week/themes-of-week.component';
import { ThemeListResolver } from './_resolvers/theme-list.resolver';
import { SocialMediaListComponent } from './social-media/social-media-list/social-media-list.component';
import { SociaMediaListResolver } from './_resolvers/social-media-list.resolver';
import { SociaMediaTypeListResolver } from './_resolvers/social-media-type-list.resolver';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { ThemeListByAdminResolver } from './_resolvers/theme-list-by-admin.resolver';
import { ThemeFormComponent } from './themes/theme-form/theme-form.component';

const appRoutes: Routes = [
  { path: 'last-7-day-post-list', component: PostListComponent,  resolve: { posts: PostListResolver } },
  { path: 'next-7-day-activity-list', component: ActivityForecastListComponent, resolve: { activityList: ActivityListResolver } },
  { path: 'themes-of-the-week', component: ThemesOfWeekComponent, resolve: { themes: ThemeListResolver } },
  { path: 'social-media', component: SocialMediaListComponent, resolve: { socialmedia: SociaMediaListResolver, socialmediatype: SociaMediaTypeListResolver } },
  { path: '', redirectTo: 'last-7-day-post-list', pathMatch: 'full' },
  { path: 'theme-list', component: ThemeListComponent, resolve: { themelist: ThemeListByAdminResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
  { path: 'theme-new', component: ThemeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}

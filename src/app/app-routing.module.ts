import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListResolver } from './_resolvers/post-list.resolver';
import { ActivityForecastListComponent } from './activities/activity-list/activity-forecast-list.component';
import { ActivityListResolver } from './_resolvers/activity-list.resolver';
import { ThemesOfWeekComponent } from './themes/themes-of-week/themes-of-week.component';
import { MessageListResolver } from './_resolvers/message-list.resolver';
import { SocialMediaListComponent } from './social-media/social-media-list/social-media-list.component';
import { SociaMediaListResolver } from './_resolvers/social-media-list.resolver';
import { SociaMediaTypeListResolver } from './_resolvers/social-media-type-list.resolver';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { MessageResolver } from './_resolvers/message.resolver';
import { ThemeFormComponent } from './themes/theme-form/theme-form.component';

const appRoutes: Routes = [
  { path: 'last-7-day-post-list', component: PostListComponent,  resolve: { posts: PostListResolver } },
  { path: 'next-7-day-entry-list', component: ActivityForecastListComponent, resolve: { entrylist: ActivityListResolver } },
  { path: 'themes-of-the-week', component: ThemesOfWeekComponent, resolve: { themes: MessageListResolver } },
  { path: 'social-media', component: SocialMediaListComponent, resolve: { socialmedia: SociaMediaListResolver, socialmediatype: SociaMediaTypeListResolver } },
  { path: '', redirectTo: 'last-7-day-post-list', pathMatch: 'full' },
  { path: 'themes', component: ThemeListComponent, resolve: { themelist: MessageListResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
  { path: 'theme/new', component: ThemeFormComponent },
  { path: 'theme/edit/:id', component: ThemeFormComponent, resolve: { theme: MessageResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListResolver } from './_resolvers/post-list.resolver';
import { EntryForecastListComponent } from './entries/entry-list/entry-forecast-list.component';
import { EntryListResolver } from './_resolvers/entry-list.resolver';
import { ThemesOfWeekComponent } from './themes/themes-of-week/themes-of-week.component';
import { ThemeListResolver } from './_resolvers/theme-list.resolver';
import { SocialMediaListComponent } from './social-media/social-media-list/social-media-list.component';
import { SociaMediaListResolver } from './_resolvers/social-media-list.resolver';
import { SociaMediaTypeListResolver } from './_resolvers/social-media-type-list.resolver';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { ThemeListByAdminResolver } from './_resolvers/theme-list-by-admin.resolver';

const appRoutes: Routes = [
  { path: 'last-7-day-post-list', component: PostListComponent,  resolve: { posts: PostListResolver } },
  { path: 'next-7-day-entry-list', component: EntryForecastListComponent, resolve: { entrylist: EntryListResolver } },
  { path: 'themes-of-the-week', component: ThemesOfWeekComponent, resolve: { themes: ThemeListResolver } },
  { path: 'social-media', component: SocialMediaListComponent, resolve: { socialmedia: SociaMediaListResolver, socialmediatype: SociaMediaTypeListResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange', },
  { path: '', redirectTo: 'last-7-day-post-list', pathMatch: 'full' },
  { path: 'theme-list', component: ThemeListComponent, resolve: { themelist: ThemeListByAdminResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}

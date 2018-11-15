import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListResolver } from './_resolvers/post-list.resolver';
import { EntryForecastListComponent } from './entries/entry-list/entry-forecast-list.component';
import { EntryListResolver } from './_resolvers/entry-list.resolver';
<<<<<<< HEAD
import { ThemesComponent } from './themes/themes.component';
import { ThemeListResolver } from './_resolvers/theme-list.resolver';
import { SocialMediaListComponent } from './socialMedia/social-media-list/social-media-list.component';
import { SociaMediaListResolver } from './_resolvers/social-media-list.resolver';
||||||| merged common ancestors
=======
import { ThemesComponent } from './themes/themes.component';
import { ThemeListResolver } from './_resolvers/theme-list.resolver';
>>>>>>> db1b0759df81eed41dd3fdd0bec4a9db0030785f

const appRoutes: Routes = [
  { path: 'last-7-day-post-list', component: PostListComponent,  resolve: { posts: PostListResolver } },
<<<<<<< HEAD
  { path: 'next-7-day-entry-list', component: EntryForecastListComponent, resolve: { entrylist: EntryListResolver } },
  { path: 'themes-of-the-week', component: ThemesComponent, resolve: { themes: ThemeListResolver } },
  { path: 'social-media', component: SocialMediaListComponent, resolve: { socialmedia: SociaMediaListResolver } },
||||||| merged common ancestors
  { path: 'next-7-day-entry-list', component: EntryForecastListComponent, resolve: { entrylist: EntryListResolver }  },
=======
  { path: 'next-7-day-entry-list', component: EntryForecastListComponent, resolve: { entrylist: EntryListResolver }  },
  { path: 'themes-of-the-week', component: ThemesComponent, resolve: { themes: ThemeListResolver }},
>>>>>>> db1b0759df81eed41dd3fdd0bec4a9db0030785f
  { path: '', redirectTo: 'last-7-day-post-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}

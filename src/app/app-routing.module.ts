import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListResolver } from './_resolvers/post-list.resolver';
import { EntryForecastListComponent } from './entries/entry-list/entry-forecast-list.component';
import { EntryListResolver } from './_resolvers/entry-list.resolver';
import { ThemesComponent } from './themes/themes.component';
import { ThemeListResolver } from './_resolvers/theme-list.resolver';

const appRoutes: Routes = [
  { path: 'last-7-day-post-list', component: PostListComponent,  resolve: { posts: PostListResolver } },
  { path: 'next-7-day-entry-list', component: EntryForecastListComponent, resolve: { entrylist: EntryListResolver }  },
  { path: 'themes-of-the-week', component: ThemesComponent, resolve: { themes: ThemeListResolver }},
  { path: '', redirectTo: 'last-7-day-post-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

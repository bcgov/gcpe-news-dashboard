import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { BASE_PATH } from './app/variables';
import { environment } from './environments/environment';

const providers = [
  { provide: BASE_PATH, useValue: environment.apiUrl },
  { provide: 'BASE_NEWS_API_URL', useValue: environment.newsApiUrl },
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));

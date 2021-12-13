import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  endpoint: string;
  debug: true;
  endpointDelayMs: 0;
}

export const APP_DI_CONFIG: AppConfig = {
  endpoint: environment.endpoint,
  debug: true,
  endpointDelayMs: 0
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { errorInterceptorInterceptor } from './share/interceptors/error-interceptor.interceptor';
import { HttpCodeInterceptor } from './share/interceptors/http-interceptor.interceptor';
import { SnackBarService } from './services/snack-bar-service.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),//withInterceptors([errorInterceptorInterceptor])
    {provide: HTTP_INTERCEPTORS, useClass: HttpCodeInterceptor, multi: true},//, deps: [SnackBarService] 
    
    ]
};

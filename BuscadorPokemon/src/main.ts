import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component'; //TODO LO QUE USTED ENCUENTRE COMO COMPONENTE TRAIGALO
import { routes } from './app/app.routes'; //TODO LO QUE USTED ENCUENTRE COMO RUTA TRAIGALO
import { provideRouter } from '@angular/router'; //TODO LO QUE USTED ENCUENTRE COMO RUTA TRAIGALO
bootstrapApplication(AppComponent, {
  providers:
  [provideHttpClient(),
  provideRouter(routes) 
  ],
}).catch((error) => console.error(error));

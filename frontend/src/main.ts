import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// import 'primeng/resources/primeng.min.css';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); 

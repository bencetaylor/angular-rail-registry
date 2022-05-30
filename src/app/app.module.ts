import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WagonComponent } from './wagons/wagon/wagon.component';
import { SiteComponent } from './sites/site/site.component';
import { environment } from '../environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService } from './service/in-memory.service';
import { WagonService } from './service/wagon.service';
import { AuthService } from './service/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryService)
      : [],
  ],
  declarations: [AppComponent, HelloComponent, WagonComponent, SiteComponent],
  bootstrap: [AppComponent],
  providers: [InMemoryService, WagonService, AuthService],
})
export class AppModule {}

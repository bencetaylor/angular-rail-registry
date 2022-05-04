import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WagonComponent } from './wagon/wagon.component';
import { SiteComponent } from './site/site.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, WagonComponent, SiteComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

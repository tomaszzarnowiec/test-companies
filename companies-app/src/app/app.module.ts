import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { NgxsModule } from '@ngxs/store';

import { CompaniesState } from './companies/store/companies.state';
import { CompaniesModule } from './companies/companies.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CompaniesModule,
    NgxsModule.forRoot([CompaniesState], {
      developmentMode: !environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

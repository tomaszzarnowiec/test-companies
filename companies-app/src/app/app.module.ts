import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { NgxsModule } from '@ngxs/store';

import { CompanyListComponent } from './companies/components/company-list/company-list.component';
import { CompanyListItemComponent } from './companies/components/company-list/company-list-item/company-list-item.component';
import { CompaniesService } from './companies/services/companies.service';
import { CompaniesState } from './companies/store/companies.state';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

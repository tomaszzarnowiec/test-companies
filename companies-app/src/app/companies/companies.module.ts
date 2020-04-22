import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesService } from './services/companies.service';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyListItemComponent } from './components/company-list/company-list-item/company-list-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        CompanyListComponent,
        CompanyListItemComponent
    ],
    imports: [ 
        CommonModule,
        HttpClientModule
    ],
    exports: [
        CompanyListComponent
    ],
    providers: [
        CompaniesService
    ]
})
export class CompaniesModule {}
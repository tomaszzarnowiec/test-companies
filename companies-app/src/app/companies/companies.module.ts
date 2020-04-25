import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompaniesService } from './services/companies.service';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyListItemComponent } from './components/company-list/company-list-item/company-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from '../shared/pipes/search.pipe';

@NgModule({
    declarations: [
        CompanyListComponent,
        CompanyListItemComponent,
        SearchPipe
    ],
    imports: [ 
        CommonModule,
        HttpClientModule,
        FormsModule
    ],
    exports: [
        CompanyListComponent
    ],
    providers: [
        CompaniesService
    ]
})
export class CompaniesModule {}
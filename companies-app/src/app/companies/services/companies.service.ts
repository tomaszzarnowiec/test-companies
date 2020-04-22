import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company, IncomeList } from '../store/companies.model';

@Injectable()
export class CompaniesService {

    constructor(private http: HttpClient) {

    }
    
    getList() {
        return this.http.get<Company[]>('https://recruitment.hal.skygate.io/companies');
    }

    getIncome(companyId: number) {
        return this.http.get<IncomeList>('https://recruitment.hal.skygate.io/incomes/' + companyId);
    }
    
}
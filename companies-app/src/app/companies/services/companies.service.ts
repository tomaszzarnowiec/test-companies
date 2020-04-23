import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company, IncomeList, Income } from '../store/companies.model';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

@Injectable()
export class CompaniesService {

    constructor(private http: HttpClient) {

    }
    
    getList() {
        return this.http.get<Company[]>('https://recruitment.hal.skygate.io/companies');
    }

    getIncome(companyId: number): Observable<Income[]> {
        return this.http.get<IncomeList>('https://recruitment.hal.skygate.io/incomes/' + companyId)
        .pipe(
            map(resp => {
                return resp.incomes
            })
        );
    }
    
}
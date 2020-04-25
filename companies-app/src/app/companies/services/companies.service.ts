import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company, IncomeList, Income } from '../store/companies.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompaniesService {

    constructor(private http: HttpClient) {

    }
    
    getList() {
        return this.http.get<Company[]>(environment.endpoints.companies);
    }

    getIncome(companyId: number): Observable<Income[]> {
        return this.http.get<IncomeList>(environment.endpoints.incomes + "/" + companyId)
        .pipe(
            map(resp => {
                return resp.incomes
            })
        );
    }
    
}
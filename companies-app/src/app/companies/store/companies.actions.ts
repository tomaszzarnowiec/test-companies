import { CompanyListSearch } from './companies.model';

export namespace CompaniesActions {

    export class GetCompanyList {
        static readonly type = '[Companies] GetCompanyList';
        constructor(public payload?: CompanyListSearch) { }
    }

    export class GetCompanyIncome {
        static readonly type = '[Companies] GetCompanyIncome';
        constructor(public id: number) { }
    }

}
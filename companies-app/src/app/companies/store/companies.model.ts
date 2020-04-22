export interface CompanyListSearch {
    sortBy: string;
    sortOrder: string;
    page: number;
    perPage: number;
    searchText: string; 
}

export interface Income {
    value: string;
    date: string;
}

export interface IncomeList {
    id: number;
    values: Income[];
}

export interface Company {
    id: number;
    name: string;
    city: string;
    incomes?: Income[];
    totalIncome?: number;
    averageIncome?: number;
    lastMonthIncome?: number;
}

export interface CompaniesStateModel {
    companies: Company[];
}
import { Observable } from 'rxjs';

export interface Sorting {
    sortBy: string;
    sortOrder?: boolean | 'asc' | 'desc';
}

export interface Pagination {
    page: number;
    perPage: number;
    pages?: number;
}

export interface Searching {
    searchText: string
}

export interface Income {
    value: string;
    date: string;
}

export interface IncomeList {
    id: number;
    incomes: Income[];
}

export class Company {
    id: number;
    name: string;
    city: string;
    incomes?: Income[];
    totalIncome: number;
    averageIncome?: number;
    lastMonthIncome?: number;
}

export interface CompaniesStateModel {
    companies: Company[];
    sort?: Sorting;
    pagination?: Pagination;
    searching?: Searching;
}
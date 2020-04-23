import { State, StateContext, Selector, Action, createSelector } from '@ngxs/store';
import { CompaniesStateModel, Company } from './companies.model';
import { CompaniesActions } from './companies.actions';
import { Injectable } from '@angular/core';
import { CompaniesService } from '../services/companies.service';

import * as _ from 'lodash';
import * as moment from 'moment';

@State<CompaniesStateModel>({
    name: 'Companies',
    defaults: {
        companies: []
    }
})

@Injectable()
export class CompaniesState {
    fetchedCompanies: Company[];

    constructor(private companiesService: CompaniesService) {
    
    }

    ngxsOnInit(context: StateContext<CompaniesStateModel>) {
        context.dispatch(CompaniesActions.GetCompanyList);
    }

    @Selector()
    static getCompanyList(state: CompaniesStateModel) {
        return state.companies;
    }

    @Selector()
    static getSorting(state: CompaniesStateModel) {
        return state.sort;
    }

    @Selector()
    static getPaging(state: CompaniesStateModel) {
        return state.pagination;
    }

    @Action(CompaniesActions.GetCompanyList)
    getList(context: StateContext<CompaniesStateModel>, action: CompaniesActions.GetCompanyList) {
        return this.companiesService.getList().pipe().subscribe(companies => {
            
            console.log(companies);
            
            _.forEach(companies, (company) => {
                context.dispatch(new CompaniesActions.GetCompanyIncome(company))
            })
        })

    }

    @Action(CompaniesActions.GetCompanyIncome)
    getIncome(context: StateContext<CompaniesStateModel>, { company }: CompaniesActions.GetCompanyIncome) {
        return this.companiesService.getIncome(company.id).toPromise().then(incomes => {
            
            const state = context.getState();
           
            let updatedCompany = <Company> {};

            _.extend(updatedCompany, company);
            
            const totalIncome = _.sumBy(incomes, i => parseFloat(i.value));
            const averageIncome = totalIncome / incomes.length;
            const lastMonthIncome = _.sumBy(incomes, i => {
                // current date is hardcoded to October for display values for last month (August), no data for march 2020
                const currentDate = "2019-10-10";
                const lastMonthStart = moment(currentDate, 'YYYY-MM-DD').subtract(1, 'month').startOf('month').subtract(1, "day");
                const lastMonthEnd = moment(currentDate, 'YYYY-MM-DD').subtract(1, 'month').endOf('month');
                const isbet = moment(i.date).isBetween(lastMonthStart, lastMonthEnd);
                return isbet ? parseFloat(i.value) : 0
            });

            _.extend(updatedCompany, {
                totalIncome: totalIncome,
                averageIncome: averageIncome,
                lastMonthIncome: lastMonthIncome,
                incomes: incomes
            })

            context.patchState({
                companies: _.orderBy([
                    ...state.companies,
                    updatedCompany
                ], 'id', true),
                sort: {
                    sortBy: 'id',
                    sortOrder: true
                },
                pagination: {
                    page: 1,
                    perPage: 50,
                    pages: (state.companies.length / 50) + 1
                }
            })

            this.fetchedCompanies = context.getState().companies;
            
        })
    }

    @Action(CompaniesActions.Sort)
    sort(context: StateContext<CompaniesStateModel>, { sort }: CompaniesActions.Sort) {
        const state = context.getState();

        const sortingOrder = state.sort.sortBy === sort.sortBy ? !state.sort.sortOrder : true;

        this.fetchedCompanies = _.orderBy(state.companies, sort.sortBy, sortingOrder ? 'asc' : 'desc');

        context.patchState({
            companies: this.fetchedCompanies,
            sort: {
                sortBy: sort.sortBy,
                sortOrder: sortingOrder
            } 
        })
    }

    @Action(CompaniesActions.Search)
    search(context: StateContext<CompaniesStateModel>, { search }: CompaniesActions.Search) {
        
    }

    @Action(CompaniesActions.Paginate)
    pagination(context: StateContext<CompaniesStateModel>, { pagination }: CompaniesActions.Paginate) {
        const state = context.getState();

        const start = (pagination.page - 1) * pagination.perPage;

        const end = pagination.page * pagination.perPage;

        context.patchState({
            companies: _.slice(this.fetchedCompanies, start, end),
            pagination: {
                ...state.pagination,
                page: pagination.page
            }
        })
    }
}

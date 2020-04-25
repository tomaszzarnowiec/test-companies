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
        allCompanies: [],
        companies: [],
        pagination: {
            page: 1,
            perPage: 50,
            pages: []
        },
        sort: {
            sortBy: null,
            sortOrder: null
        },
        searching: {
            searchText: ""
        },
        isLoading: true
    }
})

@Injectable()
export class CompaniesState {

    tmpCompanies: Company[] = [];

    constructor(private companiesService: CompaniesService) {
    
    }

    ngxsOnInit(context: StateContext<CompaniesStateModel>) {
        context.dispatch(CompaniesActions.GetCompanyList);
    }

    @Selector()
    static isLoading(state: CompaniesStateModel) {
        return state.isLoading;
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
            // get income data for each company
            // can wrap it by another action, but I want to patch state when all data loaded once
            _.forEach(companies, (company) => {

                this.companiesService.getIncome(company.id).toPromise().then(incomes => {
                    
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
        
                    _.extend(company, {
                        totalIncome: totalIncome,
                        averageIncome: averageIncome,
                        lastMonthIncome: lastMonthIncome,
                        incomes: incomes
                    })

                    this.tmpCompanies.push(company);

                    if(this.tmpCompanies.length === companies.length) {
                        // if all records was get -> set state
                        context.patchState({
                            allCompanies: this.tmpCompanies,
                            isLoading: false
                        })

                        context.dispatch(new CompaniesActions.Apply())
                    }
                    
                })
            })
        })

    }

    @Action(CompaniesActions.Apply)
    apply(context: StateContext<CompaniesStateModel>, action: CompaniesActions.Apply) {
        const state = context.getState();

        const filtered = state.allCompanies.filter(item => {
            const st = state.searching.searchText.toLowerCase();
            return  item.id.toString().indexOf(st) > -1 ||
                    item.name.toLowerCase().indexOf(st) > -1 ||
                    item.city.toLowerCase().indexOf(st) > -1 ||
                    item.totalIncome.toString().indexOf(st) > -1 ||
                    item.averageIncome.toString().indexOf(st) > -1 ||
                    item.lastMonthIncome.toString().indexOf(st) > -1
        })

        const sorted = _.orderBy(
            filtered, 
            state.sort.sortBy, 
            state.sort.sortOrder ? 'asc' : 'desc'
        )
        
        const start = (state.pagination.page - 1) * state.pagination.perPage;
        const end = state.pagination.page * state.pagination.perPage;

        const paginated = (sorted.length < state.pagination.perPage) ? sorted : _.slice(sorted, start, end);

        context.patchState({
            companies: paginated,
            pagination: {
                ...state.pagination,
                page: (sorted.length < state.pagination.perPage) ? 1 : state.pagination.page,
                pages: [...Array(_.ceil(sorted.length / state.pagination.perPage, 0)).keys()].map(i => i+1)
            }
        })
    }

    @Action(CompaniesActions.Sort)
    sort(context: StateContext<CompaniesStateModel>, { sort }: CompaniesActions.Sort) {
        const state = context.getState();

        const sortingOrder = state.sort.sortBy === sort.sortBy ? !state.sort.sortOrder : true;

        context.patchState({
            sort: {
                sortBy: sort.sortBy,
                sortOrder: sortingOrder
            } 
        })

        context.dispatch(new CompaniesActions.Apply())
    }

    @Action(CompaniesActions.Search)
    search(context: StateContext<CompaniesStateModel>, { search }: CompaniesActions.Search) {
        context.patchState({
            searching: search
        })

        context.dispatch(new CompaniesActions.Apply())
    }

    @Action(CompaniesActions.Paginate)
    pagination(context: StateContext<CompaniesStateModel>, { pagination }: CompaniesActions.Paginate) {
        const state = context.getState();

        context.patchState({
            pagination: {
                ...state.pagination,
                page: pagination.page
            }
        })

        context.dispatch(new CompaniesActions.Apply())
    }
}

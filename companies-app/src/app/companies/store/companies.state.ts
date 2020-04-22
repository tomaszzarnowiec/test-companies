import { State, StateContext, Selector, Action } from '@ngxs/store';
import { CompaniesStateModel } from './companies.model';
import { CompaniesActions } from './companies.actions';
import { Injectable } from '@angular/core';
import { CompaniesService } from '../services/companies.service';

import * as _ from 'lodash';

@State<CompaniesStateModel>({
    name: 'Companies',
    defaults: {
        companies: []
    }
})

@Injectable()
export class CompaniesState {

    constructor(private companiesServive: CompaniesService) {}

    ngxsOnInit(context: StateContext<CompaniesStateModel>) {
        context.dispatch(CompaniesActions.GetCompanyList);
    }

    @Selector()
    static getCompanyList(state: CompaniesStateModel) {
        return state.companies;
    }

    @Action(CompaniesActions.GetCompanyList)
    getList(context: StateContext<CompaniesStateModel>, { payload }: CompaniesActions.GetCompanyList) {
        return this.companiesServive.getList().subscribe(companies => {
            context.patchState({
                companies: companies
            })

            _.forEach(companies, company => {
                context.dispatch(new CompaniesActions.GetCompanyIncome(company.id))
            })
        })
    }

    @Action(CompaniesActions.GetCompanyIncome)
    getIncome(context: StateContext<CompaniesStateModel>, action: CompaniesActions.GetCompanyIncome) {
        return this.companiesServive.getIncome(action.id).toPromise().then(resp => {
            console.log('income feed', resp);
            const state = context.getState().companies;

            const company = _.find(state, {
                id: resp.id
            })
        })
    }
}

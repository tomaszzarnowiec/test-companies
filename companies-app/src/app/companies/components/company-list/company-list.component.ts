import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CompaniesState } from '../../store/companies.state';
import { Observable, combineLatest } from 'rxjs';
import { Company, Pagination, Sorting } from '../../store/companies.model';
import { CompaniesActions } from '../../store/companies.actions';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  @Select(CompaniesState.getCompanyList) companies$: Observable<Company[]>;
  @Select(CompaniesState.getSorting) sorting$: Observable<Sorting>;
  @Select(CompaniesState.getPaging) paging$: Observable<Pagination>;

  pages: number[] = [];
  currentPage: number;
  currentSorting: Sorting = {};

  constructor(private store: Store) { }

  ngOnInit(): void {

    combineLatest(this.paging$, this.sorting$).subscribe(([paging, sorting]) => {
      if(!paging || !sorting)
        return;

      this.currentPage = paging.page;
      this.currentSorting = sorting;
    })

  }

  getSortingClass(name: string) {
    return this.currentSorting.sortBy === name ? (this.currentSorting.sortOrder ? 'asc' : 'desc') : '';
  }

  sort(field: string) {
    this.store.dispatch(new CompaniesActions.Sort({
      sortBy: field
    }))
  }

  setPage(page: number) {
    this.store.dispatch(new CompaniesActions.Paginate({
      page: page
    }))
  }

}

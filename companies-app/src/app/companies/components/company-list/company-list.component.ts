import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CompaniesState } from '../../store/companies.state';
import { Observable } from 'rxjs';
import { Company, Pagination } from '../../store/companies.model';
import { CompaniesActions } from '../../store/companies.actions';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  @Select(CompaniesState.getCompanyList) companies$: Observable<Company[]>;

  @Select(CompaniesState.getPaging) paging$: Observable<Pagination>;

  pages: number;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.paging$.subscribe(paging => {
      if(!paging)
        return;
      console.log(paging.pages);
        
      this.pages = paging.pages;
    })

  }

  sort(field: string) {
    this.store.dispatch(new CompaniesActions.Sort({
      sortBy: field
    }))
  }

}

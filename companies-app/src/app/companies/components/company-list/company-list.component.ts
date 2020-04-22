import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { CompaniesState } from '../../store/companies.state';
import { Observable } from 'rxjs';
import { Company } from '../../store/companies.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  @Select(CompaniesState.getCompanyList) companies$: Observable<Company[]>;

  constructor() { }

  ngOnInit(): void {
  }

}

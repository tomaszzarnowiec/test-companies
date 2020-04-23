import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'src/app/companies/store/companies.model';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-company-list-item',
  templateUrl: './company-list-item.component.html',
  styleUrls: ['./company-list-item.component.scss']
})
export class CompanyListItemComponent implements OnInit {

  @Input() company: Company;

  constructor(private store: Store) {
    
  }

  ngOnInit(): void {
    // this.company.incomes.subscribe(incomes => {
    //   console.log('incomes:', incomes);
      
    // })
  }

}

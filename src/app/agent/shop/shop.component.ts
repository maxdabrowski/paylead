import { Component, ViewChild} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LeadToBuy } from 'src/app/models/leadToBuy.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {
  getUserRoleData,
  getUserAreaData,
  getLeadsToBuyLead,
  State,
  GetLeadsToBuy,
  getUserNickData,
  LeadBuyAgent
} from '../../store'

@Component({
  selector: 'nga-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent {

  userRola$: string;
  userArea$: string;
  userNick$: string;
  displayedColumns: string[] = ['lead_id', 'name', 'type', 'campaign', 'price', 'buy'];
  dataSource: MatTableDataSource<LeadToBuy>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<State>) {

    this.store.pipe(select(getUserRoleData)).subscribe((value) => this.userRola$ = value);
    this.store.pipe(select(getUserAreaData)).subscribe((value) => this.userArea$ = value);
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);
    this.store.dispatch(new GetLeadsToBuy({ leadData: {role: this.userRola$ , type: this.userArea$} }));
    
    this.store.pipe(select(getLeadsToBuyLead)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

   buyLead(lead_id: number){
    this.store.dispatch(new LeadBuyAgent({leadData: {role: this.userRola$ , type: this.userArea$, agent: this.userNick$ ,lead_id: lead_id} }));
  }

}
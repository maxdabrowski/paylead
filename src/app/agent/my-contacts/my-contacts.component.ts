import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  getUserRoleData,
  getUserAreaData,
  State,
  GetLeadsOwn,
  getLeadsOwnLead,
  getUserNickData
} from '../../store'


@Component({
  selector: 'nga-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MyContactsComponent implements OnInit{
  //zmienne do pobrania danych i użytkowniku
  userRola$: string;
  userArea$: string;
  userNick$: string;
  //zmienne do filtrowania
  idFilter = new FormControl('');
  clientFilter = new FormControl('');
  typeFilter = new FormControl('');
  campaignFilter = new FormControl('');
  filterValues = {
    id: '',
    client: '',
    type: '',
    campaign: ''
  };
  // zmienne do tabeli
  displayedColumns: string[] = ['lead_id','client', 'type', 'campaign', 'status'];
  dataSource: MatTableDataSource<LeadOwn>;
  expandedElement: LeadOwn | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<State>) {

    this.store.pipe(select(getUserRoleData)).subscribe((value) => this.userRola$ = value);
    this.store.pipe(select(getUserAreaData)).subscribe((value) => this.userArea$ = value);
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);
    this.store.dispatch(new GetLeadsOwn({ leadData: {agent: this.userNick$} }));

    this.store.pipe(select(getLeadsOwnLead)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
    })
   }

   ngOnInit() {
    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
      this.clientFilter.valueChanges
      .subscribe(
        client => {
          this.filterValues.client = client;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.typeFilter.valueChanges
      .subscribe(
        type => {
          this.filterValues.type = type;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.campaignFilter.valueChanges
      .subscribe(
        campaign => {
          this.filterValues.campaign = campaign;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.lead_id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && (data.name.toString().toLowerCase().indexOf(searchTerms.client) !== -1
        || data.surname.toString().toLowerCase().indexOf(searchTerms.client) !== -1)
        && data.type.toLowerCase().indexOf(searchTerms.type) !== -1
        && data.campaign.toLowerCase().indexOf(searchTerms.campaign) !== -1;
    }
    return filterFunction;
  }









}



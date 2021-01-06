import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  getUserRoleData,
  getUserAreaData,
  State,
  GetLeadsOwn,
  getLeadsOwnLead,
  getUserRegionData,
} from '../../store'


@Component({
  selector: 'nga-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
      //zmienne do pobrania danych i użytkowniku
      userRola$: string;
      userRegion$: string;
  
      //zmienne do filtrowania
      idFilter = new FormControl('');
      typeFilter = new FormControl('');
      campaignFilter = new FormControl('');
      areaFilter = new FormControl('');
      statusFilter = new FormControl('');
  
      typeList: string[] = [''];
      campaignList: string[] = [''];
      areasList: string[] = [''];
      statusList: string[] = [''];

  
      filterValues = {
        id: '',
        type: '',
        campaign: '',
        area: '',
        status: ''
      };
  
      // zmienne do tabeli
      displayedColumns: string[] = ['lead_id', 'type', 'campaign', 'status', 'area', 'details'];
      dataSource: MatTableDataSource<LeadOwn>;
      expandedElement: LeadOwn | null;
      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<State>) { 
    this.store.pipe(select(getUserRoleData)).subscribe((value) => this.userRola$ = value);
    this.store.pipe(select(getUserRegionData)).subscribe((value) => this.userRegion$ = value);
    this.store.dispatch(new GetLeadsOwn({ leadData: {role: this.userRola$, type: this.userRegion$} }));

    this.store.pipe(select(getLeadsOwnLead)).subscribe(value => {
      value.forEach(lead =>{
        this.typeList.push(lead.type);
        this.campaignList.push(lead.campaign);
        this.areasList.push(lead.area);
        this.statusList.push(lead.status);
      });

      this.typeList = [...new Set(this.typeList)].sort();
      this.campaignList = [...new Set(this.campaignList)].sort();
      this.areasList = [...new Set(this.areasList)].sort();
      this.statusList = [...new Set(this.statusList)].sort();

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
      this.areaFilter.valueChanges
      .subscribe(
        area => {
          this.filterValues.area = area;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
      this.statusFilter.valueChanges
      .subscribe(
        status => {
          this.filterValues.status = status;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.lead_id.toString().indexOf(searchTerms.id) !== -1
        && data.type.indexOf(searchTerms.type) !== -1
        && data.campaign.indexOf(searchTerms.campaign) !== -1
        && data.area.indexOf(searchTerms.campaign) !== -1
        && data.status.indexOf(searchTerms.status) !== -1;
    }
    return filterFunction;
  }

}

import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ChangeUserDataModalComponent } from 'src/app/shared/components/change-user-data-modal/change-user-data-modal.component';
import { ChangeUserModalComponent } from 'src/app/shared/components/change-user-modal/change-user-modal.component';
import { DeactivationModalComponent } from 'src/app/shared/components/deactivation-modal/deactivation-modal.component';
import { LoginService } from 'src/app/shared/services';

@Component({
  selector: 'nga-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class StructureComponent implements OnInit {

  //zmienne do filtrowania
  nameSurnameFilter = new FormControl('');
  areaFilter = new FormControl('');
  regionFilter = new FormControl('');
  roleFilter = new FormControl('');

  regionList: string[] = ['','Administrator', 'Dyrektor Centralny', 'Północ', "Południe"];
  roleList: string[] = ["", "agent", "area", "region", "admin"];
  areasList: string[] = ["", "Dolnośląskie", "Lubelskie", "Małopolskie", "Opolskie", "Podkarpackie", "Łódzkie", "Śląskie", "Świętokrzyskie", "Zachodnio-Pomorskie", "Pomorskie", "Warmińsko-Mazurskie", "Kujawsko-Pomorskie", "Podlaskie", "Lubuskie", "Wielkopolskie", "Mazowieckie" ];

  filterValues = {
    nameSurname: '',
    area: '',
    region: '',
    role: ''
  };

  // zmienne do tabeli
  displayedColumns: string[] = ['name','role', 'region', 'area'];
  dataSource: MatTableDataSource<User>;
  expandedElement: User | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subject$ = new BehaviorSubject(0);

  constructor(private loginService: LoginService, private dialog: MatDialog) { 
    this.loginService.getstructureAll().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
    });
  };

  changeData(){
    this.loginService.getstructureAll().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
    });
  };

  ngOnInit() {
    this.nameSurnameFilter.valueChanges
      .subscribe(
        nameSurname => {
          this.filterValues.nameSurname = nameSurname;
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
    this.regionFilter.valueChanges
      .subscribe(
        region => {
          this.filterValues.region = region;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.roleFilter.valueChanges
      .subscribe(
        role => {
          this.filterValues.role = role;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  };

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.area.indexOf(searchTerms.area) !== -1 &&
        (data.name.toString().indexOf(searchTerms.nameSurname) !== -1 || data.surname.toString().indexOf(searchTerms.nameSurname) !== -1)
        && data.region.indexOf(searchTerms.region) !== -1
        && data.role.indexOf(searchTerms.role) !== -1;
    } 
    return filterFunction;
  };

  unactiveUser(user:User){
    this.openDeactivationModal(user);
  };

  openDeactivationModal(user: User): void {
    const deactivationModalRef = this.dialog.open(DeactivationModalComponent, {
      width: '450px',
      data: {user: user}
    });
    deactivationModalRef.afterClosed().subscribe( result =>{
      if(result){
        this.changeData();
      };
    });
  };

  changeUserData(user: User):void {
    this.openChangeDataModal(user);
  };

  openChangeDataModal(user: User): void {
    const changeDataModalRef = this.dialog.open(ChangeUserDataModalComponent, {
      width: '450px',
      data: {user: user}
    });
  
    changeDataModalRef.afterClosed().subscribe(result => {
      if(result){
        this.changeData();
      };
    });
  };

  changeNotAgentData(user:User){
    this.openChangeUserModal(user);
  };

  openChangeUserModal(user: User): void {
    const changeDataModalRef = this.dialog.open(ChangeUserModalComponent, {
      width: '450px',
      data: {user: user}
    });
  
    changeDataModalRef.afterClosed().subscribe(result => {
      if(result){
        this.changeData();
      };
    });
  };

};
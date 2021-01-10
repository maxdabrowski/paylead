import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services';
import { switchMap } from 'rxjs/operators';
import { ChangeUserModalComponent } from 'src/app/shared/components/change-user-modal/change-user-modal.component';
import { ChangeAreaModalComponent } from './change-area-modal/change-area-modal.component';
import { RegionStructure } from 'src/app/models/regionStructure.model';
import {
  getUserRegionData,
  State
} from '../../store'


@Component({
  selector: 'nga-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent {
  regionStructure$: Observable<RegionStructure>;
  userRegion$: string;
  subject$ = new BehaviorSubject(0);

  constructor( private store: Store<State>, private loginService: LoginService, private dialog: MatDialog) {
    this.store.pipe(select(getUserRegionData)).subscribe((value) => this.userRegion$ = value);

    this.regionStructure$ = this.subject$.asObservable().pipe(
      switchMap(()=> this.loginService.getstructureByRegion({region:this.userRegion$}))
    );  
  };

  openChangeDataModal(user: User): void {
    const changeDataModalRef = this.dialog.open(ChangeUserModalComponent, {
    width: '450px',
    data: {user: user}
    });
    
    changeDataModalRef.afterClosed().subscribe(result => {
      if(result){
        this.subject$.next(1);
      };
    });
  };

  changeUserData(user: User):void {
    this.openChangeDataModal(user);
  };

  openChangeAreaModal(user: User): void {
    const changeDataModalRef = this.dialog.open(ChangeAreaModalComponent, {
    width: '450px',
    data: {user: user}
    });
    
    changeDataModalRef.afterClosed().subscribe(result => {
      if(result){
        this.subject$.next(1);
      };
    });
  };

  changeAreaData(user: User):void {
    this.openChangeAreaModal(user);
  };

}
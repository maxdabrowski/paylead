import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services';
import { switchMap } from 'rxjs/operators';
import { DeactivationModalComponent } from './deactivation-modal/deactivation-modal.component';
import { ChangeDataModalComponent } from './change-data-modal/change-data-modal.component';
import {
  getUserAreaData,
  getUserRegionData,
  State
} from '../../store'

@Component({
  selector: 'nga-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent {

  userStructure$: Observable<User[]>;
  userStructure2$: User[];
  directorRegion$: Observable<User>;
  userArea$: string;
  userRegion$: string;
  subject$ = new BehaviorSubject(0);

  constructor( private store: Store<State>, private loginService: LoginService, private dialog: MatDialog) {
    this.store.pipe(select(getUserAreaData)).subscribe((value) => this.userArea$ = value);
    this.store.pipe(select(getUserRegionData)).subscribe((value) => this.userRegion$ = value);
    this.directorRegion$ = this.loginService.getDirectorByRegion({region:this.userRegion$});
    this.userStructure$ = this.subject$.asObservable().pipe(
      switchMap(()=> this.loginService.getstructureByArea({area:this.userArea$})),
    );  
  };

  openChangeDataModal(user: User): void {
    const changeDataModalRef = this.dialog.open(ChangeDataModalComponent, {
    width: '450px',
    data: {user: user}
    });
    
    changeDataModalRef.afterClosed().subscribe(result => {
      if(result){
        this.subject$.next(1);
      };
    });
  };

  openDeactivationModal(user_nick: string): void {
    const deactivationModalRef = this.dialog.open(DeactivationModalComponent, {
    width: '450px',
    data: {user_nick: user_nick}
    });
    deactivationModalRef.afterClosed().subscribe( result =>{
      if(result){
        this.subject$.next(1);
      };
    });
  };

  changeUserData(user_nick: User):void {
    this.openChangeDataModal(user_nick);
  };

  unactiveUser(user_nick: string):void {
    this.openDeactivationModal(user_nick);
  };
};
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services';
import { switchMap } from 'rxjs/operators';
import { DeactivationModalComponent } from 'src/app/shared/components/deactivation-modal/deactivation-modal.component';
import { ChangeUserDataModalComponent } from 'src/app/shared/components/change-user-data-modal/change-user-data-modal.component';
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

  //otwarcie okna modalnego do dezaktywacji użytkownika
  unactiveUser(user: User):void {
    const deactivationModalRef = this.dialog.open(DeactivationModalComponent, {
      width: '450px',
      data: {user: user}
    });
    deactivationModalRef.afterClosed().subscribe( result =>{
      if(result){
        this.subject$.next(1);
      };
    });
  };

  //otwarcie okna modalnego do zmiany danych użytkownika
  changeUserData(user: User):void {
    const changeDataModalRef = this.dialog.open(ChangeUserDataModalComponent, {
      width: '450px',
      data: {user: user}
    });
    changeDataModalRef.afterClosed().subscribe(result => {
      if(result){
        this.subject$.next(1);
      };
    });
  };

};
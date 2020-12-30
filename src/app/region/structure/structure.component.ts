import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services';
import { switchMap, tap } from 'rxjs/operators';
import { ChangeDataModalComponent } from './change-data-modal/change-data-modal.component';
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
  userStructure$: Observable<any>;
  userRegion$: string;
  subject$ = new BehaviorSubject(0);

  constructor( private store: Store<State>, private loginService: LoginService, private dialog: MatDialog) {
    this.store.pipe(select(getUserRegionData)).subscribe((value) => this.userRegion$ = value);

    this.userStructure$ = this.subject$.asObservable().pipe(
      switchMap(()=> this.loginService.getstructureByRegion({region:this.userRegion$})),
      tap(data => console.log(data))
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

  changeUserData(user_nick: User):void {
    this.openChangeDataModal(user_nick);
  };

}

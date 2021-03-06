import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalPasswordComponent } from 'src/app/shared/components/modal-password/modal-password.component';
import { LoginService } from 'src/app/shared/services';
import {
  getUserAreaData,
  getUserDataLogin,
  State
} from '../../store'

@Component({
  selector: 'nga-my-count',
  templateUrl: './my-count.component.html',
  styleUrls: ['./my-count.component.scss']
})

export class MyCountComponent{

  readonly loginUser$: Observable<User>;
  readonly userStructure$: Observable<User[]>;
  userArea$: string;
  
  constructor( private store: Store<State>, private loginService: LoginService, private dialog: MatDialog) {
    this.store.pipe(select(getUserAreaData)).subscribe((value) => this.userArea$ = value);
    this.loginUser$ = this.store.pipe(select(getUserDataLogin));
    this.userStructure$ = this.loginService.getstructureByArea({area:this.userArea$});
  };

  //otwarcie okna podalnego na zmianę hasła użytkownika
  hangePassword():void {
    this.dialog.open(ModalPasswordComponent, {
      width: '450px',
    });
  };

}
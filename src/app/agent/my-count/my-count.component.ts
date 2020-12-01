import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import { ModalPasswordComponent } from './modal-password/modal-password.component';
import {
  getUserAreaData,
  getUserDataLogin,
  State
} from '../../store'
import { LoginService } from 'src/app/shared/services';

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
   }

   openDialog(): void {
    this.dialog.open(ModalPasswordComponent, {
    width: '450px',
  });
}

   hangePassword():void {
     this.openDialog();
   }
}

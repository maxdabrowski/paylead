import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import { ModalPasswordComponent } from 'src/app/shared/components/modal-password/modal-password.component';
import {
  getUserDataLogin,
  State
} from '../../store'

@Component({
  selector: 'nga-my-count',
  templateUrl: './my-count.component.html',
  styleUrls: ['./my-count.component.scss']
})
export class MyCountComponent  {
  readonly loginUser$: Observable<User>;

  constructor( private store: Store<State>, private dialog: MatDialog) {
    this.loginUser$ = this.store.pipe(select(getUserDataLogin));
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
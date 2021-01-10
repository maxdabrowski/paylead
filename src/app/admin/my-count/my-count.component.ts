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
import { ChangeUserDataModalComponent } from 'src/app/shared/components/change-user-data-modal/change-user-data-modal.component';


@Component({
  selector: 'nga-my-count',
  templateUrl: './my-count.component.html',
  styleUrls: ['./my-count.component.scss']
})
export class MyCountComponent {
  readonly loginUser$: Observable<User>;


  constructor( private store: Store<State>, private dialog: MatDialog) {
    this.loginUser$ = this.store.pipe(select(getUserDataLogin));
  };

  openDialog(): void {
    this.dialog.open(ModalPasswordComponent, {
    width: '450px',
    });
  };

  openChangeDataModal(user: User): void {
    this.dialog.open(ChangeUserDataModalComponent, {
    width: '450px',
    data: {user: user}
    });
  };

  hangePassword():void {
    this.openDialog();
  };

  changeUserData(user: User):void {
    this.openChangeDataModal(user);
  };
}

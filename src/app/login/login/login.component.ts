import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select,Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoginErrorLogin, LogIn, State } from '../../store';
import { PasswordRecoveryComponent } from '../password-recovery/password-recovery.component';

@Component({
  selector: 'nga-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginError$: Observable<boolean>
  hide = true;
  loginForm = this.fb.group({
    nick:[""],
    password:[""]
  });

  constructor( private store: Store<State>, private fb:FormBuilder, private dialog: MatDialog) { 
        this.loginError$ = this.store.pipe(select(getLoginErrorLogin))
  }

  //funkcja do wykonania logowania   
  login(){
    this.store.dispatch( new LogIn({LoginData: this.loginForm.value}))
  };

  //otwarcie okna modalnego do odzyskiwania hasła
  recoveryPassword():void {
    this.dialog.open(PasswordRecoveryComponent, {
      width: '450px',
    });
  };
};
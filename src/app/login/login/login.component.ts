import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select,Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  getLoginErrorLogin,
  LogIn,
  State
} from '../../store'

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

  constructor(private fb:FormBuilder,
              private store: Store<State>) { 
        this.loginError$ = this.store.pipe(select(getLoginErrorLogin))
     }
     
  login(){
    this.store.dispatch( new LogIn({LoginData: this.loginForm.value}))
  }
}



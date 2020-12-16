import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getUserNickData, LogOff, State } from './store';

@Injectable()
export class LoginGuard implements CanActivate{

  userNick$: string;

  constructor(private store: Store<State>) {
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);
  }

  canActivate() {
    if(this.userNick$ !== ''){
      return true; 
    }else{
      this.store.dispatch( new LogOff())
      return false;
    }
  }
}
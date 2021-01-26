import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { iif, Observable, of  } from 'rxjs';
import { map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import { LogIn, LogOff, LoginActionTypes, LogInSuccess, Go, LogInFailed } from '../actions';
import { LoginService } from 'src/app/shared/services/login.service';

@Injectable()
export class LoginEffects {

  constructor( private readonly actions$: Actions, private readonly loginService: LoginService ) {}

  //efekt logowania użytkownika
  @Effect()
  login$: Observable<Action> = this.actions$
    .pipe(
      ofType(LoginActionTypes.LogIn),
      map((action:LogIn) => action.payload.LoginData),
      switchMap((LoginData) => this.loginService.login(LoginData)),
      mergeMap(data => iif(() => data.loginError, of(new LogInFailed()), of(new LogInSuccess({LoginDataRes:data})))),
      catchError(error => {
        console.error(`Błąd podczas logowania: ${error}`);
        return of(new LogOff());
      }),    
    );

  //efekt logowania uźytkownika zakończony powodzeniem
  @Effect()
  loginSuccess$: Observable<Action> = this.actions$
    .pipe(
      ofType(LoginActionTypes.LogInSucces),
      map((action:LogInSuccess) => action.payload.LoginDataRes),
      map(params => new Go({ commands: [ `/${params.loginUser.role}` ]})),
      catchError(error => {
        console.error(`Błąd podczas logowania: ${error}`);
        return of(new LogOff());
      }),    
    );

  // efekt logowania użytkownika niepowodzeniem lub wylogownaie użytkownia
  @Effect()
  logOff$: Observable<Action> = this.actions$
    .pipe(
      ofType(LoginActionTypes.LogOff),
      map(() => new Go({ commands: [ `/login` ]})),
      catchError(error => {
        console.error(`Błąd podczas logowania: ${error}`);
        return of(new LogOff());
      }),    
    );
}
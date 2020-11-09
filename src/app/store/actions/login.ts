import { Action } from '@ngrx/store';
import { LoginData} from 'src/app/models/loginData.model'
import { LoginDataRes} from 'src/app/models/loginDataRes.model'

export enum LoginActionTypes {
  LogIn = '[LogIn] Logowanie użytkownika',
  LogInSucces = '[LogIn] Sukces logowania użytkownika',
  LogOff = '[LogOff] Wylogowanie użytkownika',
}

export class LogIn implements Action {
  readonly type = LoginActionTypes.LogIn;
  constructor(public readonly payload: { LoginData: LoginData }) {}
}

export class LogInSuccess implements Action {
  readonly type = LoginActionTypes.LogInSucces;
  constructor(public readonly payload: { LoginDataRes: LoginDataRes}) {}
}

export class LogOff implements Action {
  readonly type = LoginActionTypes.LogOff;
}

export type LoginActions
  = LogIn
  | LogOff
  | LogInSuccess
;

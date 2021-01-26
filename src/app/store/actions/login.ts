import { Action } from '@ngrx/store';
import { LoginData} from 'src/app/models/loginData.model'
import { LoginDataRes} from 'src/app/models/loginDataRes.model'

export enum LoginActionTypes {
  LogIn = '[Login Component] Logowanie użytkownika',
  LogInSucces = '[Login Component] Sukces logowania użytkownika',
  LogInFailed = '[Login Component] Błąd lolowania użytkownika', 
  LogOff = '[App Component] Wylogowanie użytkownika',
};

//akcja logowania użytkownika
export class LogIn implements Action {
  readonly type = LoginActionTypes.LogIn;
  constructor(public readonly payload: { LoginData: LoginData }) {}
};

//akcja logowania użytkownika zakończona powodzeniem 
export class LogInSuccess implements Action {
  readonly type = LoginActionTypes.LogInSucces;
  constructor(public readonly payload: { LoginDataRes: LoginDataRes}) {}
};

//akcja logowania użytkownika zakończona niepowodzeniem
export class LogInFailed implements Action {
  readonly type = LoginActionTypes.LogInFailed;
};

// akcja wylogowania i przywrócenie stanu początkowego aplkacji
export class LogOff implements Action {
  readonly type = LoginActionTypes.LogOff;
};

export type LoginActions
  = LogIn
  | LogOff
  | LogInSuccess
  | LogInFailed
;
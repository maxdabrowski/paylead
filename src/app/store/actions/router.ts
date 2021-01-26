import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';


export enum RouterActionTypes {
  Go = '[Router] Idź',
  Back = '[Router] Wstecz',
  Forward = '[Router] Do przodu',
};

//przekierowanie do konkretnej ścieżki 
export class Go implements Action {
  readonly type = RouterActionTypes.Go;
  /**
   * @param payload Payload repeats Router.navigate() API. See Router.navigate()
   *                for more details about valid property values.
   */
  constructor(public readonly payload: {
    commands: any[],
    extras?: NavigationExtras
  }) {}
};

//powrót do wcześniejszej ścieżki
export class Back implements Action {
  readonly type = RouterActionTypes.Back;
};

//idz do następnej ścieżki
export class Forward implements Action {
  readonly type = RouterActionTypes.Forward;
};

export type RouterActions = Go | Back | Forward;
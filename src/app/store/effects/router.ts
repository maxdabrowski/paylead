import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { RouterActionTypes, Go } from '../actions';

@Injectable()
export class RouterEffects {

  constructor( private actions$: Actions, private location: Location, private router: Router) {}
  
  //efekt nawigacji do konkretnej ścieżki
  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .pipe(
      ofType<Go>(RouterActionTypes.Go),
      map(action => action.payload),
      tap(({ commands, extras }) => this.router.navigate(commands, extras)),
    );

  //efekt nawigacji powrotu do poprzedniej ścieżki
  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .pipe(
      ofType(RouterActionTypes.Back),
      tap(() => this.location.back())
    );

  //efekt nawigacji do ściezki do przodu
  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .pipe(
      ofType(RouterActionTypes.Forward),
      tap(() => this.location.forward())
    );
}
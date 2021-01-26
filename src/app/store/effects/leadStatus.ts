import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap} from 'rxjs/operators';
import { GetStatus, GetStatusFailed, GetStatusSuccess, LeadStatusActionTypes } from '../actions';
import { LeadStatusService } from 'src/app/shared/services/leadStatus.service';

@Injectable()
export class StatusEffects {

  constructor( private readonly actions$: Actions, private readonly leadStatusService: LeadStatusService ) {}

  //efekt pobrania statusów danego kontaktu 
  @Effect()
  leadsToBuy$: Observable<Action> = this.actions$
    .pipe(
      ofType(LeadStatusActionTypes.GetStatus),
      map((action:GetStatus) => action.payload.leadStatusData),
      switchMap((data) => this.leadStatusService.getLeadStatus(data)),
      map(data =>  new GetStatusSuccess({leadStatus: data})),
      catchError(error => {
        console.error(`Błąd podczas pobierania statusów: ${error}`);
        return of(new GetStatusFailed());
      }),    
    );
}
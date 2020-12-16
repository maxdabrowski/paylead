import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { GetLeadsToBuySuccess, GetLeadsOwnSuccess, GetLeadsOwn, GetLeadsToBuy, LeadActionTypes, GetLeadsToBuyFailed, LeadBuyAgent, GetLeadsOwnFailed } from '../actions';
import { LeadService } from 'src/app/shared/services/lead.service';

@Injectable()
export class LeadEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly leadService: LeadService,
    ) {}

  @Effect()
  leadsToBuy$: Observable<Action> = this.actions$
    .pipe(
      ofType(LeadActionTypes.GetLeadsToBuy),
      map((action:GetLeadsToBuy) => action.payload.leadData),
      switchMap((leadData) => this.leadService.leadToBuy(leadData)),
      map(data =>  new GetLeadsToBuySuccess({leadToBuy: data})),
      catchError(error => {
        console.error(`Błąd podczas pobierania kontkaktów: ${error}`);
        return of(new GetLeadsToBuyFailed());
      }),    
    );

    @Effect()
  leadBuy$: Observable<Action> = this.actions$
    .pipe(
      ofType(LeadActionTypes.LeadBuy),
      map((action:LeadBuyAgent) => action.payload.leadData),
      switchMap((leadBuy) => this.leadService.leadBuy(leadBuy)),
      map(data =>  new GetLeadsToBuySuccess({leadToBuy: data})),
      catchError(error => {
        console.error(`Błąd podczas pobierania kontkaktów: ${error}`);
        return of(new GetLeadsToBuyFailed());
      }),    
    );

    @Effect()
    leadsOwn$: Observable<Action> = this.actions$
      .pipe(
        ofType(LeadActionTypes.GetLeadsOwn),
        map((action:GetLeadsOwn) => action.payload.leadData),
        switchMap((leadOwn) => this.leadService.leadOwn(leadOwn)),
        map(data =>  new GetLeadsOwnSuccess({leadOwn: data})),
        catchError(error => {
          console.error(`Błąd podczas pobierania kontkaktów: ${error}`);
          return of(new  GetLeadsOwnFailed());
        }),    
      );


}
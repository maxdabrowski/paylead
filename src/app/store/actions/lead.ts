import { Action } from '@ngrx/store';
import { LeadData} from 'src/app/models/leadData.model';
import { LeadOwn} from 'src/app/models/leadOwn.model';
import { LeadToBuy} from 'src/app/models/leadToBuy.model';

export enum LeadActionTypes {
  GetLeadsToBuy = '[Shop Component] Pobranie kontaktów do kupienia',
  GetLeadsOwn = '[Shop Componrnt] Pobranie kontaktów zajętych',

  GetLeadsToBuySuccess = '[Shop Component] Sukces pobrania kontaktów do kupienia',
  GetLeadsOwnSuccess = '[Shop Componrnt] Sukces pobrania kontaktów zajętych',

  GetLeadsToBuyFailed = '[Shop Component]  niepowodzenie kontaktów do kupienia',
  GetLeadsOwnFailed = '[Shop Componrnt] niepowodzenie pobrania kontaktów zajętych',

  LeadBuy = '[Shop Component] kupno leada z listy dostępnych',
}

export class GetLeadsToBuy implements Action {
  readonly type = LeadActionTypes.GetLeadsToBuy;
  constructor(public readonly payload: { leadData: LeadData}) {}
}

export class GetLeadsOwn implements Action {
  readonly type = LeadActionTypes.GetLeadsOwn;
  constructor(public readonly payload: { leadData: LeadData}) {}
}

export class GetLeadsToBuySuccess implements Action {
  readonly type = LeadActionTypes.GetLeadsToBuySuccess;
  constructor(public readonly payload: { leadToBuy: LeadToBuy[]}) {}
}

export class GetLeadsOwnSuccess implements Action {
  readonly type = LeadActionTypes.GetLeadsOwnSuccess;
  constructor(public readonly payload: { leadOwn: LeadOwn[]}) {}
}

export class GetLeadsToBuyFailed implements Action {
  readonly type = LeadActionTypes.GetLeadsToBuyFailed;
}

export class GetLeadsOwnFailed implements Action {
  readonly type = LeadActionTypes.GetLeadsOwnFailed;
}

export class LeadBuyAgent implements Action {
  readonly type = LeadActionTypes.LeadBuy;
  constructor(public readonly payload: {leadData: LeadData}) {}
}





export type LeadActions
  = GetLeadsToBuy
  | GetLeadsOwn
  | GetLeadsToBuySuccess
  | GetLeadsOwnSuccess
  | GetLeadsToBuyFailed
  | GetLeadsOwnFailed
  | LeadBuyAgent
;

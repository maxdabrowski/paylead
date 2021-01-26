import { Action } from '@ngrx/store';
import { LeadData} from 'src/app/models/leadData.model';
import { LeadOwn} from 'src/app/models/leadOwn.model';
import { LeadToBuy} from 'src/app/models/leadToBuy.model';

export enum LeadActionTypes {
  GetLeadsToBuy = '[Shop Component] Pobranie kontaktów do kupienia',
  GetLeadsOwn = '[Shop Componrnt] Pobranie kontaktów zajętych',
  GetLeadsToBuySuccess = '[Shop Component] Sukces pobrania kontaktów do kupienia',
  GetLeadsOwnSuccess = '[Shop Componrnt] Sukces pobrania kontaktów zajętych',
  GetLeadsToBuyFailed = '[Shop Component]  Niepowodzenie kontaktów do kupienia',
  GetLeadsOwnFailed = '[Shop Componrnt] Niepowodzenie pobrania kontaktów zajętych',
  LeadBuy = '[Shop Component] Kupno leada z listy dostępnych',
};

//akcja pobrnia kontaktów możliwych do kupienia
export class GetLeadsToBuy implements Action {
  readonly type = LeadActionTypes.GetLeadsToBuy;
  constructor(public readonly payload: { leadData: LeadData}) {}
};

//akcja pobrania własnych konktaków
export class GetLeadsOwn implements Action {
  readonly type = LeadActionTypes.GetLeadsOwn;
  constructor(public readonly payload: { leadData: LeadData}) {}
};

//akcja pobrania kontaktów do kupienia zakończona powodzeniem
export class GetLeadsToBuySuccess implements Action {
  readonly type = LeadActionTypes.GetLeadsToBuySuccess;
  constructor(public readonly payload: { leadToBuy: LeadToBuy[]}) {}
};

//akcja pobrania kontaktów własnych zakończona powodzeniem
export class GetLeadsOwnSuccess implements Action {
  readonly type = LeadActionTypes.GetLeadsOwnSuccess;
  constructor(public readonly payload: { leadOwn: LeadOwn[]}) {}
};

// akcja pobrania kontaktów do kupienia zakończona niepowodzeniem
export class GetLeadsToBuyFailed implements Action {
  readonly type = LeadActionTypes.GetLeadsToBuyFailed;
};

//akcja pobrania kontaktó własnych zakończona niepowodzeniem
export class GetLeadsOwnFailed implements Action {
  readonly type = LeadActionTypes.GetLeadsOwnFailed;
};

//akcja kupienia kontaktu przez agenta
export class LeadBuyAgent implements Action {
  readonly type = LeadActionTypes.LeadBuy;
  constructor(public readonly payload: {leadData: LeadData}) {}
};

export type LeadActions
  = GetLeadsToBuy
  | GetLeadsOwn
  | GetLeadsToBuySuccess
  | GetLeadsOwnSuccess
  | GetLeadsToBuyFailed
  | GetLeadsOwnFailed
  | LeadBuyAgent
;
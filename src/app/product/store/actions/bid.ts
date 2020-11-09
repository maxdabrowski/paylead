import { Action } from '@ngrx/store';


export enum BidActionTypes {
  PlaceBid = '[Bid] Złóż ofertę',
  BidUpdate = '[Bid] Zaktualizuj ofertę'
}

export class PlaceBid implements Action {
  readonly type = BidActionTypes.PlaceBid;
  constructor(public readonly payload: { productId: number, amount: number }) {}
}

export class BidUpdate implements Action {
  readonly type = BidActionTypes.BidUpdate;
  constructor(public readonly payload: { productId: number, amount: number }) {}
}

export type BidActions
  = PlaceBid
  | BidUpdate;

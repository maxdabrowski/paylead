import { Action } from '@ngrx/store';
import { Product } from '../../../shared/services';

export enum ProductActionTypes {
  LoadById = '[Product] Ładowanie według ID',
  LoadByIdSuccess = '[Product] Ładowanie według ID powiodło się',
  LoadByIdFailure = '[Product] Ładowanie według ID nie powiodło się',
  LoadSuggested = '[Product] Zasugerowano ładowania',
  LoadSuggestedSuccess = '[Product] Zasugerowanie ładowanie powiodło się'
}

export class LoadById implements Action {
  readonly type = ProductActionTypes.LoadById;
  constructor(public readonly payload: { productId: number }) {}
}

export class LoadByIdSuccess implements Action {
  readonly type = ProductActionTypes.LoadByIdSuccess;
  constructor(public readonly payload: { product: Product }) {}
}

export class LoadByIdFailure implements Action {
  readonly type = ProductActionTypes.LoadByIdFailure;
  constructor(public readonly payload: { error: string}) {}
}

export class LoadSuggested implements Action {
  readonly type = ProductActionTypes.LoadSuggested;
  constructor(public readonly payload: { productId: number }) {}
}

export class LoadSuggestedSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuggestedSuccess;
  constructor(public readonly payload: { products: Product[] }) {}
}

export type ProductActions
  = LoadById
  | LoadByIdSuccess
  | LoadByIdFailure
  | LoadSuggested
  | LoadSuggestedSuccess;

import { Action } from '@ngrx/store';

export enum CategoriesActionTypes {
  Load = 'Ładowanie [Categories]',
  LoadSuccess = 'Ładowanie [Categories] powiodło się'
}

export class LoadCategories implements Action {
  readonly type = CategoriesActionTypes.Load;
}

export class LoadCategoriesSuccess implements Action {
  readonly type = CategoriesActionTypes.LoadSuccess;
  constructor(public readonly payload: { categories: string[] }) {}
}

export type CategoriesActions
  = LoadCategories
  | LoadCategoriesSuccess;

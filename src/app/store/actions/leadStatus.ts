import { Action } from '@ngrx/store';
import { LeadStatus } from 'src/app/models/leadStatus.model';
import { LeadStatusData} from 'src/app/models/leadStatusData.model';

export enum LeadStatusActionTypes {

  GetStatus = '[Contact-detail Component] Pobranie danych o akcjach',
  GetStatusSuccess = '[Contact-detail Component] Sukces pobrania akcji ',
  GetStatusFailed = '[Contact-detail Component]  Niepowodzenie pobrania akcji',
}

export class GetStatus implements Action {
  readonly type = LeadStatusActionTypes.GetStatus;
  constructor(public readonly payload: { leadStatusData: LeadStatusData}) {}
}

export class GetStatusSuccess implements Action {
  readonly type = LeadStatusActionTypes.GetStatusSuccess;
  constructor(public readonly payload: { leadStatus: LeadStatus[]}) {}
}

export class GetStatusFailed implements Action {
  readonly type = LeadStatusActionTypes.GetStatusFailed;
}

export type LeadStatusActions
  = GetStatus
  | GetStatusSuccess
  | GetStatusFailed
;

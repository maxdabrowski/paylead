import { LeadToBuy } from 'src/app/models/leadToBuy.model';
import { LeadOwn } from 'src/app/models/leadOwn.model';

import { LeadActions, LeadActionTypes, LoginActions, LoginActionTypes } from '../actions';

export interface State {
  leadsToBuy: LeadToBuy[];
  leadsOwn: LeadOwn[];
};

const initialState: State = {
  leadsToBuy: [],
  leadsOwn: []
};

export function reducer(state = initialState, action: LeadActions | LoginActions): State {

  switch (action.type) {

    case LeadActionTypes.GetLeadsToBuySuccess: {
      return {
        ...state,
        leadsToBuy: action.payload.leadToBuy,
        
      };
    }

    case LeadActionTypes.GetLeadsOwnSuccess: {
      return {
        ...state,
        leadsOwn:action.payload.leadOwn,
        
      };
    }
    case LeadActionTypes.GetLeadsToBuyFailed: {
      return {
        ...state,
        leadsToBuy: [],
        
      };
    }

    case LeadActionTypes.GetLeadsOwnFailed: {
      return {
        ...state,
        leadsOwn: [],
        
      };
    }

    case LoginActionTypes.LogOff: {
      return {
        ...state,
        leadsToBuy: [],
        leadsOwn: []
      }
    }
   
    default: {
      return state;
    }
  }
}

export const getLeadsToBuy = (state: State) => state.leadsToBuy;
export const getLeadsOwn = (state: State) => state.leadsOwn;

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

    //ustawienie stanu zwróconymi danymi kontaktów do kupienia
    case LeadActionTypes.GetLeadsToBuySuccess: {
      return {
        ...state,
        leadsToBuy: action.payload.leadToBuy, 
      };
    };

    //ustawienie stanu zwróconymi danymi kontktów własnych
    case LeadActionTypes.GetLeadsOwnSuccess: {
      return {
        ...state,
        leadsOwn:action.payload.leadOwn,
      };
    };

    //pobranie kontaków do kupienia zakończonie niepowodzeniem, ustawienia stanu poczatkowego
    case LeadActionTypes.GetLeadsToBuyFailed: {
      return {
        ...state,
        leadsToBuy: [],  
      };
    };

    //pobranie kontaków własnych zakończonie niepowodzeniem, ustawienia stanu poczatkowego
    case LeadActionTypes.GetLeadsOwnFailed: {
      return {
        ...state,
        leadsOwn: [],     
      };
    };

    //po wylogowaniu się przywrócenie stanu poczatkowego 
    case LoginActionTypes.LogOff: {
      return {
        ...state,
        leadsToBuy: [],
        leadsOwn: []
      }
    };

    default: {
      return state;
    };

  };
  
};

//metody pobrania kontaktów
export const getLeadsToBuy = (state: State) => state.leadsToBuy;
export const getLeadsOwn = (state: State) => state.leadsOwn;
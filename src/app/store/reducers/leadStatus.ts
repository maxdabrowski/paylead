import { LeadStatusActions, LeadStatusActionTypes } from '../actions';
import { LeadStatus } from 'src/app/models/leadStatus.model';

export interface State {
  leadStatus: LeadStatus[];
};

const initialState: State = {
  leadStatus: [],
};

export function reducer(state = initialState, action: LeadStatusActions ): State {

  switch (action.type) {
    
    //ustawienie statusów zwróconymi danymi
    case LeadStatusActionTypes.GetStatusSuccess: {
      return {
        ...state,
        leadStatus: action.payload.leadStatus,
      };
    };

    //pobranie statusów zakończonie niepowodzeniem, ustawienia stanu poczatkowego
    case LeadStatusActionTypes.GetStatusFailed: {
      return {
        ...state,
        leadStatus: [],   
      };
    };

    default: {
      return state;
    };

  };

};

//metoda pobrania statusów
export const getStatus = (state: State) => state.leadStatus;
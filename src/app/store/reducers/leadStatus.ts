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
    case LeadStatusActionTypes.GetStatusSuccess: {
      return {
        ...state,
        leadStatus: action.payload.leadStatus,
      };
    }

    case LeadStatusActionTypes.GetStatusFailed: {
      return {
        ...state,
        leadStatus: [],   
      };
    }

    default: {
      return state;
    }
  }
}

export const getStatus = (state: State) => state.leadStatus;
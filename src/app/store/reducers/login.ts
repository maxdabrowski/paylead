import { User } from 'src/app/models/user.model';
import { LoginActions, LoginActionTypes } from '../actions';

export interface State {
  loginError: boolean;
  loginUser: User;
};

const initialState: State = {
  loginError: false,

  /*loginUser: {
    id: 0,
    name: '',
    surname: '',
    nick: '',
    region: '',
    area: '',
    role: '',
    phone: '',
    mail: ''
  }*/

  loginUser: {
    id: 29,
    name: 'Damian',
    surname: 'Zając',
    nick: 'damzajac',
    region: 'Południe',
    area: 'Łódzkie',
    role: 'agent',
    phone: '723325576',
    mail: 'makdabrowski@pzu.pl'
  }
};

export function reducer(state = initialState, action: LoginActions): State {

  switch (action.type) {

    case LoginActionTypes.LogInSucces: {
      return {
        ...state,
        loginError: action.payload.LoginDataRes.loginError,
        loginUser: action.payload.LoginDataRes.loginUser
      };
    }

    case LoginActionTypes.LogInFailed: {
      return {
        ...state,
        loginError: true,
      };
    }

    case LoginActionTypes.LogOff: {
      return {
        ...state,
        loginError: false,
        loginUser: {  
          id: 0,
          name: '',
          surname: '',
          nick: '',
          region: '',
          area: '',
          role: '',
          phone: '',
          mail: ''
        },
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoginError = (state: State) => state.loginError;
export const getUserData = (state: State) => state.loginUser;
export const getUserRole = (state: State) => state.loginUser.role;
export const getUserArea = (state: State) => state.loginUser.area;
export const getUserRegion = (state: State) => state.loginUser.region;
export const getUserNick = (state: State) => state.loginUser.nick;
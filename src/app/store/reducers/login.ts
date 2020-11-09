import { User } from 'src/app/models/user.model';
import { LoginActions, LoginActionTypes } from '../actions';

export interface State {
  loginError: boolean;
  loginUser: User;
};

const initialState: State = {
  loginError: false,
  loginUser: {
    id: 0,
    name: '',
    surname: '',
    nick: '',
    password: '',
    region: '',
    area: '',
    role: ''
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

    case LoginActionTypes.LogOff: {
      return {
        ...state,
        loginError: true,
        loginUser: {  
          id: 0,
          name: '',
          surname: '',
          nick: '',
          password: '',
          region: '',
          area: '',
          role: ''
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoginError = (state: State) => state.loginError;
export const getUserData = (state: State) => state.loginUser;

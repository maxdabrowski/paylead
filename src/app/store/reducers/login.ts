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
    region: '',
    area: '',
    role: '',
    phone: '',
    mail: '',
    active: true
  }
};

export function reducer(state = initialState, action: LoginActions): State {

  switch (action.type) {

    //ustawienia stanu pobranymi danymi
    case LoginActionTypes.LogInSucces: {
      return {
        ...state,
        loginError: action.payload.LoginDataRes.loginError,
        loginUser: action.payload.LoginDataRes.loginUser
      };
    };

    //niepowodzneia pobrania danych, ustawieni błedu logowania na true
    case LoginActionTypes.LogInFailed: {
      return {
        ...state,
        loginError: true,
      };
    };

    //wylogowanie użytkownika, ustawienia stanu początkowego
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
          mail: '',
          active: true,
        },
      };
    };

    default: {
      return state;
    };

  };

};

//metody do pobierania poszczególnych danych u zalogowanym użytkowniku
export const getLoginError = (state: State) => state.loginError;
export const getUserData = (state: State) => state.loginUser;
export const getUserRole = (state: State) => state.loginUser.role;
export const getUserArea = (state: State) => state.loginUser.area;
export const getUserRegion = (state: State) => state.loginUser.region;
export const getUserNick = (state: State) => state.loginUser.nick;
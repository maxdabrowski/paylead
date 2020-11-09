import { User } from './user.model'

export interface State{
  loginError:boolean,
  userData?: User
}

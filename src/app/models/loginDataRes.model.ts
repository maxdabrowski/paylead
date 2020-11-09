import { User } from './user.model'

export interface LoginDataRes{
  loginError:boolean,
  loginUser?: User
}

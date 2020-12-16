import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { User } from 'src/app/models/user.model';
import { LoginData } from '../../models/loginData.model';
import { LoginDataRes } from '../../models/loginDataRes.model';
import { ChangePassword } from '../../models/changePassword.model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string,
    ) { }

  login(loginData: LoginData): Observable<LoginDataRes>{
    return this.http.post<LoginDataRes>(`${this.baseUrl}/login`, loginData)
  }

  getstructureByArea(structure: {area?:string, region?:string}): Observable<User[]> {
    return this.http.post<User[]>(`${this.baseUrl}/structure`, structure)
  }

  changePassword(changePasswordData:ChangePassword): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/change_password`, changePasswordData)
  }
  
}
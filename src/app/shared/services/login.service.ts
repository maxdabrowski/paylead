import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { User } from 'src/app/models/user.model';
import { LoginData } from '../../models/loginData.model';
import { LoginDataRes } from '../../models/loginDataRes.model';
import { ChangePassword } from '../../models/changePassword.model'
import { NewUser } from 'src/app/models/newUser.model';
import { RegionStructure } from 'src/app/models/regionStructure.model';

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

  getstructureByArea(structure: {area:string}): Observable<User[]> {
    return this.http.post<User[]>(`${this.baseUrl}/structure_area`, structure)
  }

  getstructureByRegion(structure: {region:string}): Observable<RegionStructure> {
    return this.http.post<RegionStructure>(`${this.baseUrl}/structure_region`, structure)
  }

  getstructureAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/structure_all`)
  }

  getDirectorByRegion(structure: {region?:string}): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/structure_director`, structure)
  }

  addNewAgent(newUser:NewUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add_agent`, newUser)
  }

  changeNotUser(newAreaDirector:NewUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add_director`, newAreaDirector)
  }
  
  changeDataUser(changeUser:NewUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/change_agent`, changeUser)
  }

  changeAreaUser(changeAreaUser:{nick:string, newArea:string}): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/change_area_agent`, changeAreaUser)
  }

  deactivateAgent(deactivatedData:{dectivatedAgent:string, agentToWalletChange: string }): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/deactivate_agent`, deactivatedData)
  }

  changePassword(changePasswordData:ChangePassword): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/change_password`, changePasswordData)
  }
  
}
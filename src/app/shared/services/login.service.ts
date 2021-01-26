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

  //logowanie do aplikacji
  login(loginData: LoginData): Observable<LoginDataRes>{
    return this.http.post<LoginDataRes>(`${this.baseUrl}/login`, loginData)
  };

  //odzyskiwanie hasła
  passwordRecovery(login:{login:string}): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/password_recovery`, login)
  };

  //pobranie struktury dla podanego obszaru 
  getstructureByArea(structure: {area:string}): Observable<User[]> {
    return this.http.post<User[]>(`${this.baseUrl}/structure_area`, structure)
  };

  //pobranie struktury dla podanego regionu
  getstructureByRegion(structure: {region:string}): Observable<RegionStructure> {
    return this.http.post<RegionStructure>(`${this.baseUrl}/structure_region`, structure)
  };

  //pobranie całej struktury
  getstructureAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/structure_all`)
  };

  //pobranie dyrektora podanego regionu
  getDirectorByRegion(structure: {region?:string}): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/structure_director`, structure)
  };

  //dodanie nowego agenta
  addNewAgent(newUser:NewUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add_agent`, newUser)
  };

  //zmiana danych użytkownika bez zmiany loginu
  changeNotUser(newAreaDirector:NewUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add_director`, newAreaDirector)
  };
  
  //zmiana danych agenta
  changeDataUser(changeUser:NewUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/change_agent`, changeUser)
  };

  //zmiana obszaru agenta
  changeAreaUser(changeAreaUser:{nick:string, newArea:string}): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/change_area_agent`, changeAreaUser)
  };

  //dezaktywacja agenta
  deactivateAgent(deactivatedData:{dectivatedAgent:string, agentToWalletChange: string }): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/deactivate_agent`, deactivatedData)
  };

  //zmiana hasła
  changePassword(changePasswordData:ChangePassword): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/change_password`, changePasswordData)
  };
  
};
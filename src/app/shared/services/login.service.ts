import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { LoginData } from '../../models/loginData.model';
import { LoginDataRes } from '../../models/loginDataRes.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  base_url = 'http://localhost:9090/api/login';

  constructor(
    private http:HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string,
    ) { }

  login(loginData: LoginData): Observable<LoginDataRes>{
    //return this.http.post<LoginData>(`${this.baseUrl}/login`, loginData)
    return this.http.post<LoginDataRes>(this.base_url, loginData)
  }
}

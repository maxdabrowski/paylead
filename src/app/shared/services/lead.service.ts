import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { LeadData } from 'src/app/models/leadData.model';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { LeadToBuy } from 'src/app/models/leadToBuy.model';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  base_url = 'http://localhost:9090/api';

  constructor(
    private http:HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string,
    ) { }

  leadToBuy(leadData: LeadData): Observable<LeadToBuy[]>{
    return this.http.post<LeadToBuy[]>(`${this.base_url}/lead_buy`, leadData)
  }

  leadBuy(leadData: LeadData): Observable<LeadToBuy[]>{
    return this.http.post<LeadToBuy[]>(`${this.base_url}/lead_buy`, leadData)
  }


  leadOwn(leadData: LeadData): Observable<LeadOwn[]>{
    return this.http.post<LeadOwn[]>(`${this.base_url}/lead_own`, leadData)
  }
}

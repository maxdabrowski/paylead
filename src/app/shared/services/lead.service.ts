import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { Campaign } from 'src/app/models/campaign.model';
import { Commision } from 'src/app/models/commision.model';
import { LeadData } from 'src/app/models/leadData.model';
import { LeadDataCharts } from 'src/app/models/leadDataCharts.model ';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { LeadToBuy } from 'src/app/models/leadToBuy.model';
import { OwnLeadWallet } from 'src/app/models/ownLeadWallet';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(
    private http:HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string,
    ) { }

  leadToBuy(leadData: LeadData): Observable<LeadToBuy[]>{
    return this.http.post<LeadToBuy[]>(`${this.baseUrl}/lead_buy`, leadData)
  }

  leadBuy(leadData: LeadData): Observable<LeadToBuy[]>{
    return this.http.post<LeadToBuy[]>(`${this.baseUrl}/lead_buy`, leadData)
  }


  leadOwn(leadData: LeadData): Observable<LeadOwn[]>{
    return this.http.post<LeadOwn[]>(`${this.baseUrl}/lead_own`, leadData)
  }

  addLead(leadToAdd: LeadOwn ): Observable<boolean>{
    return this.http.post<any>(`${this.baseUrl}/lead_add_agent`, leadToAdd)
  }

  getDataToRoundCharts(user:{user:string}): Observable<LeadDataCharts>{
    return this.http.post<LeadDataCharts>(`${this.baseUrl}/lead_to_charts`, user)
  }

  getLeadCommison(user:{user:string}): Observable<Commision[]>{
    return this.http.post<Commision[]>(`${this.baseUrl}/commision`, user)
  }

  getOwnLeadWallet(user:{user:string}): Observable<OwnLeadWallet[]>{
    return this.http.post<OwnLeadWallet[]>(`${this.baseUrl}/own_lead_wallet`, user)
  }
  getCampaign(): Observable<Campaign[]>{
    return this.http.get<Campaign[]>(`${this.baseUrl}/campaign`)
  }

}

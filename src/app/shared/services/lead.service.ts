import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { AreaSummaryData } from 'src/app/models/areaSummary.model';
import { Campaign } from 'src/app/models/campaign.model';
import { Commision } from 'src/app/models/commision.model';
import { LeadData } from 'src/app/models/leadData.model';
import { LeadDataCharts } from 'src/app/models/leadDataCharts.model';
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

  //pobranie kontaktów do kupienia
  leadToBuy(leadData: LeadData): Observable<LeadToBuy[]>{
    return this.http.post<LeadToBuy[]>(`${this.baseUrl}/lead_buy`, leadData)
  };

  //kupienie kontaktu
  leadBuy(leadData: LeadData): Observable<LeadToBuy[]>{
    return this.http.post<LeadToBuy[]>(`${this.baseUrl}/lead_buy`, leadData)
  };

  //pobranie własnych kontaktów
  leadOwn(leadData: LeadData): Observable<LeadOwn[]>{
    return this.http.post<LeadOwn[]>(`${this.baseUrl}/lead_own`, leadData)
  };

  //dodanie własnego kontaktu
  addLead(leadToAdd: LeadOwn ): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/lead_add_agent`, leadToAdd)
  };

  //dodanie kontaktów z pliku
  addLeadFromCsv(leadFile:any ): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/lead_add_csv_file`, leadFile)
  };

  //usunięcie kontaktu
  deleteLead(lead: {lead_id: number} ): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/lead_delete`, lead)
  };

  //pobranie danych o kontaktach do wykresów
  getDataToRoundCharts(data:{user?:string, area?:string, region?:string}): Observable<LeadDataCharts>{
    return this.http.post<LeadDataCharts>(`${this.baseUrl}/lead_to_charts`, data)
  };

  //pobranie danych do rozliczenia prowizji
  getLeadCommison(user:{user:string}): Observable<Commision[]>{
    return this.http.post<Commision[]>(`${this.baseUrl}/commision`, user)
  };

  //pobranie własnych kontaktów do portfela
  getOwnLeadWallet(user:{user:string}): Observable<OwnLeadWallet[]>{
    return this.http.post<OwnLeadWallet[]>(`${this.baseUrl}/own_lead_wallet`, user)
  };

  //pobranie kampanii
  getCampaign(): Observable<Campaign[]>{
    return this.http.get<Campaign[]>(`${this.baseUrl}/campaign`)
  };

  //pobranie sumarycznych danych dla dnej jednostki i okresu czasu
  getSummaryDataArea(data:{area:string, period:string}): Observable<AreaSummaryData[]>{
    return this.http.post<AreaSummaryData[]>(`${this.baseUrl}/bilans_summary_area`, data)
  };

  //pobranie sumarycznych danych dla dnej jednostki i okresu czasu
  getSummaryDataRegion(data:{region: string; period:string}): Observable<AreaSummaryData[]>{
    return this.http.post<AreaSummaryData[]>(`${this.baseUrl}/bilans_summary_region`, data)
  };

  //pobranie danych do tabeli podsumuwujcej
  getDateToSummaryTab(data:{area?:string, region?:string}): Observable<string[]>{
    return this.http.post<string[]>(`${this.baseUrl}/bilans_summary_date`, data)
  };
  
};
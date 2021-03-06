import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { LeadStatusPost } from 'src/app/models/leadStatusPost.model';
import { StatusDataCharts } from 'src/app/models/statusDataCharts.model';
import { LeadStatus } from '../../models/leadStatus.model';
import { LeadStatusData } from '../../models/leadStatusData.model';

@Injectable({
  providedIn: 'root'
})
export class LeadStatusService {

  constructor(
    private http:HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string,
    ) { }

  //pobranie statusów dla podanej jednostki
  getLeadStatus(leadStatusData: LeadStatusData): Observable<LeadStatus[]>{
    return this.http.post<LeadStatus[]>(`${this.baseUrl}/status_get`, leadStatusData)
  };

  //dodanie statusu
  postLeadStatus(leadStatusPost: LeadStatusPost): Observable<LeadStatus[]>{
    return this.http.post<any>(`${this.baseUrl}/status_post`, leadStatusPost)
  };

  //pobranie danych o sukcesach do wykresów
  getDataToColumnChart(data:{user?:string, area?:string, region?: string}): Observable<StatusDataCharts>{
    return this.http.post<StatusDataCharts>(`${this.baseUrl}/status_to_charts`, data)
  };
  
};
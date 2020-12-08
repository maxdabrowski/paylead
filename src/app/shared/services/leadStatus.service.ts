import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { LeadStatusPost } from 'src/app/models/leadStatusPost.model';
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

  getLeadStatus(leadStatusData: LeadStatusData): Observable<LeadStatus[]>{
    return this.http.post<LeadStatus[]>(`${this.baseUrl}/status_get`, leadStatusData)
  }

  postLeadStatus(leadStatusPost: LeadStatusPost): Observable<LeadStatus[]>{
    return this.http.post<any>(`${this.baseUrl}/status_post`, leadStatusPost)
  }
}

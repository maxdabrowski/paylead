import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { LeadStatus } from 'src/app/models/leadStatus.model';
import { GetLeadsOwn, getLeadsOwnLead, getLeadStatusLead, getRouteQueryParams, GetStatus, State } from 'src/app/store';

@Component({
  selector: 'nga-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent{

  leadId$: string;
  lead$: Observable<LeadOwn[]>;
  status$: Observable<LeadStatus[]>;

  constructor(private store: Store<State>) {
    this.store.pipe(select(getRouteQueryParams)).subscribe((value) => this.leadId$ = value.id);
    this.store.dispatch(new GetStatus({ leadStatusData: {lead_id: parseInt(this.leadId$)} }));
    this.store.dispatch(new GetLeadsOwn({ leadData: {lead_id: parseInt(this.leadId$)} }));
    this.lead$ = this.store.pipe(select(getLeadsOwnLead));
    this.status$ = this.store.pipe(select(getLeadStatusLead))
   }

}

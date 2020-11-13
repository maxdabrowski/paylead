import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { find } from 'rxjs/operators';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { getLeadOwnLeadById, getRouteQueryParams, State } from 'src/app/store';

@Component({
  selector: 'nga-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  leadId$: string;
  lead$: Observable<LeadOwn>;


  constructor(private store: Store<State>) { 
    this.store.pipe(select(getRouteQueryParams)).subscribe((value) => this.leadId$ = value.id);
    this.lead$ = this.store.pipe(select(getLeadOwnLeadById))
  }

  ngOnInit(): void {
  }

}

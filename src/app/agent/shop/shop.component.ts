import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeadToBuy } from 'src/app/models/leadToBuy.model';

import {
  getUserRoleData,
  getUserAreaData,
  getLeadsToBuyLead,
  State,
  GetLeadsToBuy,
  getUserNickData,
  LeadBuyAgent
} from '../../store'


@Component({
  selector: 'nga-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent{

  userRola$: string;
  userArea$: string;
  userNick$: string;
  readonly leadToBuy$: Observable<LeadToBuy[]>;

  constructor(private store: Store<State>) {
    this.store.pipe(select(getUserRoleData)).subscribe((value) => this.userRola$ = value);
    this.store.pipe(select(getUserAreaData)).subscribe((value) => this.userArea$ = value);
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);

    this.store.dispatch(new GetLeadsToBuy({ leadData: {role: this.userRola$ , type: this.userArea$} }));
    this.leadToBuy$ = this.store.pipe(select(getLeadsToBuyLead))
    
  }

   buyLead(lead_id: number){
    this.store.dispatch(new LeadBuyAgent({leadData: {role: this.userRola$ , type: this.userArea$, agent: this.userNick$ ,lead_id: lead_id} }));
  }
}

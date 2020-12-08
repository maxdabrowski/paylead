import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { LeadStatus } from 'src/app/models/leadStatus.model';
import { GetLeadsOwn, getLeadsOwnLead, getLeadStatusLead, GetStatus, getUserNickData, State } from 'src/app/store';


@Component({
  selector: 'nga-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent{

  userNick$: string;
  lead$: LeadOwn[];
  status$: LeadStatus[];

  constructor(private store: Store<State>) {
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);
    this.store.dispatch(new GetLeadsOwn({ leadData: {agent: this.userNick$} }));
    this.store.dispatch(new GetStatus({ leadStatusData: {owner: this.userNick$}}));
    this.store.pipe(select(getLeadsOwnLead)).subscribe((value) => this.lead$ = value);
    this.store.pipe(select(getLeadStatusLead)).subscribe((value) => this.status$ = value);
   }

  downloadFile(type:string){

    if(type === 'status'){

      let csv = 'lead_id, agent, obszar, region, data, status, notatka, polisa, przychód\n';
      this.status$.forEach(el => {
              csv += el.lead_id+", "+el.owner+", "+el.area+", "+el.region+", "+el.date+", "+el.status+", "+el.note+", "+el.policy+", "+el.income;
              csv += "\n";
      });

      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      var blob = new Blob(["\ufeff", csv]);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'statusy.csv';
      hiddenElement.click();

    }else if(type === 'lead'){
      let csv = 'lead_id, imię, nazwisko, telefon, mail, miejscowość, kod pocztowy, adres, typ klienta, wiek, typ, kampania, produkt, cena, region, obszar, agent, status\n';
      this.lead$.forEach(el =>  {
              csv +=el.lead_id +", "+el.name+", "+el.surname+", "+el.phone+", "+el.mail+", " +el.town+", "+el.post_code+", "+el.adress+", "+el.client_type+", "+el.age+", "+el.type+", "+el.campaign+", "+el.product+", "+el.price+", "+el.region+", "+el.area+", "+el.owner+", "+el.status;
              csv += "\n";
      });
   
      let  hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'kontakty.csv';
      hiddenElement.click();
    }
  }

}

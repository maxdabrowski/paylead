import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeadDataCharts } from 'src/app/models/leadDataCharts.model ';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { LeadStatus } from 'src/app/models/leadStatus.model';
import { StatusDataCharts } from 'src/app/models/statusDataCharts.model';
import { LeadService, LeadStatusService } from 'src/app/shared/services';
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
  dataLeadcharts$: Observable<LeadDataCharts>;
  dataStatuscharts$: Observable<StatusDataCharts>;

  constructor(private store: Store<State>, private leadSerice: LeadService, private leadStatusService: LeadStatusService) {
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);
    this.store.dispatch(new GetLeadsOwn({ leadData: {agent: this.userNick$} }));
    this.store.dispatch(new GetStatus({ leadStatusData: {owner: this.userNick$}}));
    this.store.pipe(select(getLeadsOwnLead)).subscribe((value) => this.lead$ = value);
    this.store.pipe(select(getLeadStatusLead)).subscribe((value) => this.status$ = value); 
    this.dataLeadcharts$ = this.leadSerice.getDataToRoundCharts({user:this.userNick$});
    this.dataStatuscharts$ = this.leadStatusService.getDataToColumnChart({user:this.userNick$});
   }

  downloadFile(type:string){
    if(type === 'status'){
      let csv = 'lead_id, agent, obszar, region, data, status, notatka, polisa, przychód\n';
      this.status$.forEach(el => {
              csv += el.lead_id+", "+el.owner+", "+el.area+", "+el.region+", "+el.date+", "+el.status+", "+el.note+", "+el.policy+", "+el.income;
              csv += "\n";
      });
      createCsvFile(csv,'statusy.csv');

    }else if(type === 'lead'){
      let csv = 'lead_id, imię, nazwisko, telefon, mail, miejscowość, kod pocztowy, adres, typ klienta, wiek, typ, kampania, produkt, cena, region, obszar, agent, status\n';
      this.lead$.forEach(el =>  {
              csv +=el.lead_id +", "+el.name+", "+el.surname+", "+el.phone+", "+el.mail+", " +el.town+", "+el.post_code+", "+el.adress+", "+el.client_type+", "+el.age+", "+el.type+", "+el.campaign+", "+el.product+", "+el.price+", "+el.region+", "+el.area+", "+el.owner+", "+el.status;
              csv += "\n";
      });
      createCsvFile(csv,'kontakty.csv');
    } 

    function createCsvFile(fileContent: string, fileName:string){
      if(window.navigator.msSaveBlob){
        var blob = new Blob([new Uint8Array([0xEF,0xBB,0xBF]),fileContent],{type:'application/csv;charset=UTF-8'});
        window.navigator.msSaveBlob(blob,fileName);
      }else if(window.webkitURL != null){
        var a=document.createElement("a");
        a.href="data:application/csv;charset=UTF-8,%EF%BB%BF" + encodeURIComponent(fileContent);
        a.download=fileName;
        a.click();
      }
    }
  }
}

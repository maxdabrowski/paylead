import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AreaSummaryData } from 'src/app/models/areaSummary.model';
import { LeadDataCharts } from 'src/app/models/leadDataCharts.model';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { LeadStatus } from 'src/app/models/leadStatus.model';
import { StatusDataCharts } from 'src/app/models/statusDataCharts.model';
import { LeadService, LeadStatusService } from 'src/app/shared/services';
import { GetLeadsOwn, getLeadsOwnLead, getLeadStatusLead, GetStatus, getUserRoleData, State } from 'src/app/store';

@Component({
  selector: 'nga-central-results',
  templateUrl: './central-results.component.html',
  styleUrls: ['./central-results.component.scss']
})
export class CentralResultsComponent{
  userRola$: string;
  lead$: LeadOwn[];
  status$: LeadStatus[];
  monthList: string[];
  selectedMonth: string;
  regionSummaryDisplayedColumns: string[] = ['agent', 'count_lead', 'count_success', 'effectiveness', 'expense', 'income', 'bilans'];
  regionSummarySource: MatTableDataSource<AreaSummaryData>;
  dataLeadcharts$: Observable<LeadDataCharts>;
  dataStatuscharts$_Region: Observable<StatusDataCharts>;
  dataStatuscharts$_North: Observable<StatusDataCharts>;
  dataStatuscharts$_South: Observable<StatusDataCharts>;

  constructor(private store: Store<State>, private leadService: LeadService, private leadStatusService: LeadStatusService, private ref: ChangeDetectorRef) {
    this.store.pipe(select(getUserRoleData)).subscribe((value) => this.userRola$ = value);
    this.store.dispatch(new GetLeadsOwn({ leadData: {role: this.userRola$} }));
    this.store.dispatch(new GetStatus({ leadStatusData: {region: "Wszystkie"}}));
    this.store.pipe(select(getLeadsOwnLead)).subscribe((value) => this.lead$ = value);
    this.store.pipe(select(getLeadStatusLead)).subscribe((value) => this.status$ = value);
    this.leadService.getDateToSummaryTab({region:"Wszystkie"}).subscribe((value) => this.monthList = value); 
    this.leadService.getSummaryDataRegion({region:"Wszystkie", period: "Wszystkie"}).subscribe(value => {
      this.regionSummarySource = new MatTableDataSource(value);
      this.ref.detectChanges();
    });
    this.dataLeadcharts$ = this.leadService.getDataToRoundCharts({region:"Wszystkie"});
    this.dataStatuscharts$_Region = this.leadStatusService.getDataToColumnChart({region:"Wszystkie"});
    this.dataStatuscharts$_North = this.leadStatusService.getDataToColumnChart({region:"Północ"});
    this.dataStatuscharts$_South = this.leadStatusService.getDataToColumnChart({region:"Południe"});
  };

  //zmiana okresu czasu do wyników w tabeli 
  changeSelect(event:string){
    this.leadService.getSummaryDataRegion({region:"Wszystkie", period: event}).subscribe(value => {
      this.regionSummarySource = new MatTableDataSource(value);
      this.ref.detectChanges();
    });
  };

  //pobranie danych
  downloadFile(type:string){
    if(type === 'status'){
      let csv = 'lead_id, agent, obszar, region, data, status, notatka, polisa, przychód\n';
      this.status$.forEach(el => {
              csv += el.lead_id+", "+el.owner+", "+el.area+", "+el.region+", "+el.date+", "+el.status+", "+el.note+", "+el.policy+", "+el.income;
              csv += "\n";
      });
      createCsvFile(csv,`statusy_wszystkie.csv`);
    }else if(type === 'lead'){
      let csv = 'lead_id, imię, nazwisko, telefon, mail, miejscowość, kod pocztowy, adres, typ klienta, wiek, typ, kampania, produkt, cena, region, obszar, agent, status\n';
      this.lead$.forEach(el =>  {
              csv +=el.lead_id +", "+el.name+", "+el.surname+", "+el.phone+", "+el.mail+", " +el.town+", "+el.post_code+", "+el.adress+", "+el.client_type+", "+el.age+", "+el.type+", "+el.campaign+", "+el.product+", "+el.price+", "+el.region+", "+el.area+", "+el.owner+", "+el.status;
              csv += "\n";
      });
      createCsvFile(csv,`kontakty_wszystkie.csv`);
    }; 

    function createCsvFile(fileContent: string, fileName:string){
      if(window.navigator.msSaveBlob){
        var blob = new Blob([new Uint8Array([0xEF,0xBB,0xBF]),fileContent],{type:'application/csv;charset=UTF-8'});
        window.navigator.msSaveBlob(blob,fileName);
      }else if(window.webkitURL != null){
        var a=document.createElement("a");
        a.href="data:application/csv;charset=UTF-8,%EF%BB%BF" + encodeURIComponent(fileContent);
        a.download=fileName;
        a.click();
      };
    };
  };

}
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.model';
import { Commision } from 'src/app/models/commision.model';
import { OwnLeadWallet } from 'src/app/models/ownLeadWallet';
import { LeadService } from 'src/app/shared/services';
import { getUserNickData, State } from 'src/app/store';

@Component({
  selector: 'nga-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent{

  userNick$: string;
  campaign$: Observable<Campaign[]>;
  monthList: string[] = [];
  selectedMonth: string;
  public expense = 0;
  public income = 0;
  public bilans = 0;
  commisionDisplayedColumns: string[] = ['lead_id', 'campaign', 'date', 'income', 'commision', 'policy'];
  commisionSource: MatTableDataSource<Commision>;
  ownLeadWalletDisplayedColumns: string[] = ['lead_id', 'campaign', 'date', 'price'];
  ownLeadWalletSource: MatTableDataSource<OwnLeadWallet>;

  constructor(private store: Store<State>, private leadService: LeadService) { 
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);
    this.campaign$ = this.leadService.getCampaign();
    this.leadService.getLeadCommison({user:this.userNick$}).subscribe(value => {
      value.forEach(el => {
        this.income += el.commision
      });
      this.commisionSource = new MatTableDataSource(value);
      this.commisionSource.filterPredicate = this.createFilter();
    });
    this.leadService.getOwnLeadWallet({user:this.userNick$}).subscribe(value => {
      value.forEach(el => {
        this.monthList.push(el.month)
        this.expense += el.price
      })
      const tabSet = [...new Set(this.monthList)].sort();
      this.monthList = ['Wszystkie', ...tabSet];
      this.bilans = this.income - this.expense
      this.ownLeadWalletSource = new MatTableDataSource(value);
      this.ownLeadWalletSource.filterPredicate = this.createFilter();
    });
  };

  //zmiana przeliczenia  bilansu w zależności od wybranego okresu czasu 
  changeSelect(event: string){
    this.expense = 0;
    this.income = 0;
    this.bilans = 0
    let filteredExpense = 0;
    let filteredIncome =  0;
    if(event === "Wszystkie"){
    this.commisionSource.filter = JSON.stringify('2');
    this.commisionSource.data.forEach(lead => {
        filteredIncome += lead.commision
    })
    this.ownLeadWalletSource.data.forEach(lead => {
        filteredExpense += lead.price
    })
    this.ownLeadWalletSource.filter = JSON.stringify('2'); 
    }else{
      this.commisionSource.filter = JSON.stringify(event);
      this.ownLeadWalletSource.filter = JSON.stringify(event); 
      this.commisionSource.data.forEach(lead => {
        if(lead.month === event){
          filteredIncome += lead.commision
        }
      })
      this.ownLeadWalletSource.data.forEach(lead => {
        if(lead.month === event){
          filteredExpense += lead.price
        }
      })
    }
    this.expense = filteredExpense;
    this.income = filteredIncome;
    this.bilans = filteredIncome-filteredExpense
  };

  //filter do zmian w tabelach MatTable
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.month.toString().toLowerCase().indexOf(searchTerms) !== -1;
    }
    return filterFunction;
  };

}
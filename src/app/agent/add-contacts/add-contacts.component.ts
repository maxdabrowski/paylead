import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { select,Store } from '@ngrx/store';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { LeadService } from 'src/app/shared/services/lead.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import {
  getUserAreaData,
  getUserNickData,
  getUserRegionData,
  State
} from '../../store';


@Component({
  selector: 'nga-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss']
})

export class AddContactsComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  userRegion$: string;
  userArea$: string;
  userNick$: string;
  contactForm: FormGroup;
  campaignList: string [];
  campaignLiveList = [];
  campaingnAssetsList = [];
  contactToSend: LeadOwn;

  constructor(private fb:FormBuilder, private store: Store<State>, private leadService: LeadService, public dialog: MatDialog ) {
    this.store.pipe(select(getUserRegionData)).subscribe((value) => this.userRegion$ = value);
    this.store.pipe(select(getUserAreaData)).subscribe((value) => this.userArea$ = value);
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);
    this.leadService.getCampaign().subscribe(data =>  {

      data.forEach(el => {
        if(el.type === "Życie"){
          let campaign = el.campaign   
          this.campaignLiveList.push(campaign)
        }else if (el.type === "Majątek"){
          let campaign = el.campaign
          this.campaingnAssetsList.push(campaign)
        }
      })
    })

  }

  openDialog(): void {
      this.dialog.open(ModalComponent, {
      width: '450px',
    });
  }

  ngOnInit(){
    this.initContactForm();
    this.onChanges();
  };

  initContactForm(){
    this.contactForm = this.fb.group({
      name:["", [Validators.required, Validators.pattern("^[a-zA-Ząćęłńóśżź]+$")]],
      surname:["", [Validators.required, Validators.pattern("^[a-zA-Ząćęłńóśżź-]+$")]],
      phone:["", [Validators.required, Validators.pattern("[0-9]{9}") ]],
      mail:["", [ Validators.pattern("^[0-9a-z_.-]+@[0-9a-z.-]+[a-z]{2,3}$")]],
      town:["", [Validators.required, Validators.pattern("^[ a-zA-Ząćęłńóśżź._-]+$")]],
      post_code:["", [Validators.required, Validators.pattern("[0-9]{2}-[0-9]{3}")]],
      adress:[""],
      client_type: ["", [Validators.required]],
      age:[ , [Validators.min(1),Validators.max(100)]],
      type:["", [Validators.required]],
      campaign:["", [Validators.required]],
      product:[""],
    });
  };

  onChanges(){
    this.contactForm.get('type').valueChanges.subscribe(selectedType => {
      if(selectedType === 'Majątek') {
        this.contactForm.get('campaign').enable();
        this.campaignList = this.campaingnAssetsList;
      }
      if(selectedType === 'Życie') {
        this.contactForm.get('campaign').enable();
        this.campaignList = this.campaignLiveList;
      }
    });
  };

  onSubmit(){
    if(this.contactForm.dirty && this.contactForm.valid){

      this.contactToSend = {
        lead_id: 0,
        name: this.contactForm.value.name,
        surname: this.contactForm.value.surname,
        phone:this.contactForm.value.phone,
        mail: this.contactForm.value.mail,
        town: this.contactForm.value.town,
        post_code: this.contactForm.value.post_code,
        adress: this.contactForm.value.adress,
        client_type: this.contactForm.value.client_type,
        age: this.contactForm.value.age,
        type: this.contactForm.value.type,
        campaign: this.contactForm.value.campaign,
        product: this.contactForm.value.product,
        campaign_image: this.contactForm.value.campaign.substr(0,3).toLowerCase(),
        price:0,
        region: this.userRegion$,
        area: this.userArea$,
        owner: this.userNick$,
        status: 'Własny'
      };
      
      this.leadService.addLead(this.contactToSend).subscribe(data => {
        if(data){
          this.openDialog();
          this.formDirective.resetForm();
        }
      });
    }
  }
}
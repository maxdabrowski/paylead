import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import { LeadStatus } from 'src/app/models/leadStatus.model';
import { LeadStatusPost } from 'src/app/models/leadStatusPost.model';
import { LeadStatusService } from 'src/app/shared/services';
import { GetLeadsOwn, getLeadsOwnLead, getLeadStatusLead, getRouteQueryParams, GetStatus, State } from 'src/app/store';

@Component({
  selector: 'nga-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  leadId$: string;
  lead$: Observable<LeadOwn[]>;
  status$: Observable<LeadStatus[]>;
  statusForm: FormGroup;
  statusList: string[] = ['Podjęta próba kontaku','Brak kontaku z klientem','Błędne dane','Umówione spotkanie', 'Klient niezainteresowany','Odmowa', 'Sukces'];
  visibleNote = false;
  statusToSend: LeadStatusPost;

  constructor(private store: Store<State>, private fb:FormBuilder, private leadStatusService:LeadStatusService) { 
    this.store.pipe(select(getRouteQueryParams)).subscribe((value) => this.leadId$ = value.id);
    this.store.dispatch(new GetStatus({ leadStatusData: {lead_id: parseInt(this.leadId$)} }));
    this.store.dispatch(new GetLeadsOwn({ leadData: {lead_id: parseInt(this.leadId$)} }));
    this.lead$ = this.store.pipe(select(getLeadsOwnLead));
    this.status$ = this.store.pipe(select(getLeadStatusLead))
  }

  //inicjalizajca formularza oraz dynamiczna zmiana dostępnych pól
  ngOnInit(){  
    this.initStatusForm();
    this.onChanges();
  };

  //inicjalizacja formularza
  initStatusForm(){
    this.statusForm = this.fb.group({
      status:["", [Validators.required]],
      note:[""],
      success: this.fb.array([]),
    });
  };

  //metoda dodająca dane do tabeli success w formularzu 
  success(): FormArray{
    return this.statusForm.get("success") as FormArray
  };

  //dodanie pól do reaktywnego formularza
  successForm(): FormGroup{
    return this.fb.group({
      policy:["", [Validators.required, Validators.pattern("[0-9]{9}") ]],
      income:[ , [Validators.required,Validators.min(1),Validators.max(100000)]],
    })
  };

  //dodanie pól formularza jeżeli wybrano status sukces
  addSuccessForm(){
    this.success().push(this.successForm());
  };

  //usunięcie pól formularza jeżeli nie wybrano statusu sukces
  removeSuccessForm(){
    this.success().removeAt(0);
  };

  //obsługa zmian wyboru statusu w formularzu
  onChanges(){
    this.statusForm.get('status').valueChanges.subscribe(selectedType => {
      if(selectedType !== 'Sukces') {
        this.visibleNote = true;
        this.removeSuccessForm();
      }
      else if(selectedType === 'Sukces') {
        this.visibleNote = true;
        this.addSuccessForm();
      }
    });
  };

  //dodanie statusu
  addStatus(){
    if(this.statusForm.dirty && this.statusForm.valid){
      this.statusToSend = {
        lead_id: parseInt(this.leadId$),
        status: this.statusForm.value.status,
        note: this.statusForm.value.note,
        success:this.statusForm.value.success
      };
      
      this.leadStatusService.postLeadStatus(this.statusToSend).subscribe(data => {
        //jeżeli dodano pomyślnie to czysci formularz i pobiera najnowsze dane
        if(data){
          this.store.dispatch(new GetStatus({ leadStatusData: {lead_id: parseInt(this.leadId$)} }));
          this.store.dispatch(new GetLeadsOwn({ leadData: {lead_id: parseInt(this.leadId$)}}));
          this.formDirective.resetForm();
        // jeżeli sukces już istniał to nie można dodac innego statusu i kontakt jest zamknięty na dodawanie statusów
        }if (!data){
          this.formDirective.resetForm();
          this.statusForm.get('status').disable();
          this.statusForm.get('note').disable();
        }
      });
    };
  };

}
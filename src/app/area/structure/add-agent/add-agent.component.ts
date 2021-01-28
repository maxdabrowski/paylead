import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { select,Store } from '@ngrx/store';
import { NewUser } from 'src/app/models/newUser.model';
import { LoginService } from 'src/app/shared/services';
import { getUserAreaData, getUserRegionData, Go, State } from 'src/app/store';

@Component({
  selector: 'nga-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {

  userRegion$: string;
  userArea$: string;
  userNick: string;
  userForm: FormGroup;
  userToSend: NewUser;

  constructor(private fb:FormBuilder, private store: Store<State>, private loginService: LoginService) {
    this.store.pipe(select(getUserRegionData)).subscribe((value) => this.userRegion$ = value);
    this.store.pipe(select(getUserAreaData)).subscribe((value) => this.userArea$ = value);
  };

  //inicjalizacja formularza
  ngOnInit(): void {
    this.initContactForm();
  }

  //formularz
  initContactForm(){
    this.userForm = this.fb.group({
      name:["", [Validators.required, Validators.pattern("^[a-zA-Ząćęłńóśżź]+$")]],
      surname:["", [Validators.required, Validators.pattern("^[a-zA-Ząćęłńóśżź-]+$")]],
      phone:["", [Validators.required, Validators.pattern("[0-9]{9}") ]],
      mail:["", [Validators.required, Validators.pattern("^[0-9a-z_.-]+@[0-9a-z.-]+[a-z]{2,3}$")]],
    });
  };

  //dodoanie nowego agenta
  onSubmit(){
    if(this.userForm.dirty && this.userForm.valid){
      this.userToSend = {
        name: this.userForm.value.name,
        surname: this.userForm.value.surname,
        region: this.userRegion$,
        area: this.userArea$,
        phone:this.userForm.value.phone,
        mail: this.userForm.value.mail,
      };
      this.loginService.addNewAgent(this.userToSend).subscribe(data => {
        if(data){
          this.store.dispatch(new Go({ commands: [ `/area/structure` ]}));
        };
      });
    };
  };

};
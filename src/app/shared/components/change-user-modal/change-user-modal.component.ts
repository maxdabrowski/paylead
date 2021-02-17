import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services';
import { User } from 'src/app/models/user.model';
import { NewUser } from 'src/app/models/newUser.model';

@Component({
  selector: 'nga-change-user-modal',
  templateUrl: './change-user-modal.component.html',
  styleUrls: ['./change-user-modal.component.scss']
})
export class ChangeUserModalComponent {

  userForm: FormGroup;
  userToSend: NewUser;
  user: User;

  constructor(private fb:FormBuilder, 
    private loginService: LoginService,
    public dialogRef: MatDialogRef<ChangeUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.user = data.user
  }

  ngOnInit(): void {
    this.initContactForm();
  };
  
  initContactForm(){
    this.userForm = this.fb.group({
      name:[this.user.name, [Validators.required, Validators.pattern("^[a-zA-Ząćęłńóśżź]+$")]],
      surname:[this.user.surname, [Validators.required, Validators.pattern("^[a-zA-Ząćęłńóśżź-]+$")]],
      phone:[this.user.phone, [Validators.required, Validators.pattern("[0-9]{9}") ]],
      mail:[this.user.mail, [Validators.required, Validators.pattern("^[0-9a-z_.-]+@[0-9a-z.-]+[a-z]{2,3}$")]],
      action:["", [Validators.required]],
    });
  };
  
  onSubmit(){
    if(this.userForm.dirty && this.userForm.valid){

      if(this.userForm.value.action === "changeDirectorData"){
        this.userToSend = {
          nick: this.user.nick,
          name: this.userForm.value.name,
          surname: this.userForm.value.surname,
          phone:this.userForm.value.phone,
          mail: this.userForm.value.mail,
        }; 
        this.loginService.changeDataUser(this.userToSend).subscribe(data => {
          if(data){
            this.dialogRef.close(true);
          };
        });
      };

      if(this.userForm.value.action === "changeDirector"){
        this.userToSend = {
          nick: this.user.nick,
          name: this.userForm.value.name,
          surname: this.userForm.value.surname,
          phone:this.userForm.value.phone,
          mail: this.userForm.value.mail,
          region: this.user.region,
          area: this.user.area,
        }; 
        this.loginService.changeNotUser(this.userToSend).subscribe(data => {
          if(data){
            this.dialogRef.close(true);
          };
        });
      };

    };
  };
};
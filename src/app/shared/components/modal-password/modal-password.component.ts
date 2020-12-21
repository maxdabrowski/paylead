import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { ChangePassword } from 'src/app/models/changePassword.model';
import { LoginService } from 'src/app/shared/services';
import { getUserNickData, LogOff, State } from 'src/app/store';

@Component({
  selector: 'nga-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.scss']
})
export class ModalPasswordComponent{

  error = false;
  errorContent: string;
  userNick$: string;
  changePasswordForm:FormGroup;
  changePasswordData:ChangePassword;

  constructor(private fb:FormBuilder,private store: Store<State>, private loginService: LoginService, public dialogRef: MatDialogRef<ModalPasswordComponent>) {
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);
    this.initChangePasswordFormForm()
  }

  initChangePasswordFormForm(){
    this.changePasswordForm = this.fb.group({
      password:["",Validators.required],
      newPassword:["", [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
      repeatPassword: ["", [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
    });
  }

  changePassword(){
    if(this.changePasswordForm.dirty && this.changePasswordForm.valid){
      if(this.changePasswordForm.value.newPassword === this.changePasswordForm.value.repeatPassword){
          this.changePasswordData = {
            nick: this.userNick$,
            password: this.changePasswordForm.value.password,
            newPassword: this.changePasswordForm.value.newPassword 
          };
          this.loginService.changePassword(this.changePasswordData).subscribe(data => {
            if(data){
              this.dialogRef.close();
              this.store.dispatch( new LogOff());
            }else{
              this.error = true;
              this.errorContent = 'Podane obecne hasło jest nieprawidłowe';
            }
          });
      }else{
        this.error = true;
        this.errorContent = 'Podane nowe hasła nie są takie same';
      }
    }
  }
}

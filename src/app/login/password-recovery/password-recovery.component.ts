import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/shared/services';

@Component({
  selector: 'nga-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent{

  nick: string = '';
  subject$ = new BehaviorSubject(false);

  constructor(private loginService: LoginService, public dialogRef: MatDialogRef<PasswordRecoveryComponent>) { }

  sendMail():void{
    if(this.nick !== ""){
      this.loginService.passwordRecovery({login:this.nick}).subscribe(res => {
        if (res){
          this.dialogRef.close();
          this.subject$.next(false);
        }else if (!res){
          this.subject$.next(true);
        }
      })
  }
  };

};

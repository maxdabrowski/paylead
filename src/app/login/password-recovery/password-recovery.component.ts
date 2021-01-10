import { Component } from '@angular/core';

@Component({
  selector: 'nga-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent{

  nick: string = '';

  constructor() { }

  sendMail():void{
    console.log(this.nick)
  };

};

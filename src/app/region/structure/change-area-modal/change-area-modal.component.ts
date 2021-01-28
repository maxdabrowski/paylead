import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/shared/services';

@Component({
  selector: 'nga-change-area-modal',
  templateUrl: './change-area-modal.component.html',
  styleUrls: ['./change-area-modal.component.scss']
})

export class ChangeAreaModalComponent {

  user: User;
  selectedArea: string;
  areasList: string[] = ["", "Dolnośląskie", "Lubelskie", "Małopolskie", "Opolskie", "Podkarpackie", "Łódzkie", "Śląskie", "Świętokrzyskie", "Zachodnio-Pomorskie", "Pomorskie", "Warmińsko-Mazurskie", "Kujawsko-Pomorskie", "Podlaskie", "Lubuskie", "Wielkopolskie", "Mazowieckie" ];
  areaChangeToSend: {
    nick: string,
    newArea: string
  };

  constructor(private loginService: LoginService, public dialogRef: MatDialogRef<ChangeAreaModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.user = data.user
  };

  //zmiana obszaru przynależności użytkownika
  changeAreaData(){
    if(this.selectedArea !== ""){
      this.areaChangeToSend = {
        nick: this.user.nick,
        newArea: this.selectedArea
      }; 
      this.loginService.changeAreaUser(this.areaChangeToSend).subscribe(data => {
        if(data){
          this.dialogRef.close(true);
        };
      });
    };
  };

}
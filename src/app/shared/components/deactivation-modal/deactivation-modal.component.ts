import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { LoginService } from 'src/app/shared/services';
import { getUserAreaData, State } from 'src/app/store';

@Component({
  selector: 'nga-deactivation-modal',
  templateUrl: './deactivation-modal.component.html',
  styleUrls: ['./deactivation-modal.component.scss']
})
export class DeactivationModalComponent {

  deactivatedAgent: string;
  userArea$: string;
  agentsList = [];
  selectedAgent: string;

  constructor(private loginService: LoginService,
    public dialogRef: MatDialogRef<DeactivationModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.deactivatedAgent = data.user.nick;
    this.userArea$ = data.user.area;
    this.loginService.getstructureByArea({area:this.userArea$}).subscribe(data => {
      data.forEach(agent => {
        if(agent.role === "agent" && agent.active){
          if(agent.nick !== this.deactivatedAgent) {
            let agentToList = {name: agent.name+ " " +agent.surname, nick: agent.nick}
            this.agentsList.push(agentToList)
          }
        }
      })
    });
  };
  
  onNoClick(): void {
    this.dialogRef.close();
  };

  deactivateAgent(){
    if(this.selectedAgent !== undefined){
      const deactivatedData = {
        dectivatedAgent: this.deactivatedAgent,
        agentToWalletChange: this.selectedAgent
      }
      this.loginService.deactivateAgent(deactivatedData).subscribe(data => {

        if(data){
          this.dialogRef.close(true);
        };
      });
    };
  };

};
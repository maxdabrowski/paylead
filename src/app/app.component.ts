import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogOff } from './store/actions';
import { select, Store } from '@ngrx/store';
import {
  getUserNickData,
  State
} from './store'

@Component({
  selector: 'nga-root',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent{
  
  userNick$: string;
  
  constructor(private store: Store<State>) {
   this.store.pipe(select(getUserNickData)).subscribe(value => this.userNick$ = value)
  }

  //wylogowanie się
  logoff(){
    this.store.dispatch( new LogOff())
  }

}

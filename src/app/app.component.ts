import { ChangeDetectionStrategy, Component} from '@angular/core';
import { Observable} from 'rxjs';
import { LogOff} from './store/actions';
import { select,Store } from '@ngrx/store';


import {
  getLoginErrorLogin,
  State
} from './store'

@Component({
  selector: 'nga-root',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{

  loginError$: Observable<boolean>

  constructor(private store: Store<State>) {
    this.loginError$ = this.store.pipe(select(getLoginErrorLogin))
  }

  logoff(){
    this.store.dispatch( new LogOff())
  }

}

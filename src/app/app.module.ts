import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//moduły biblioteki Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SHARED_SERVICES } from './shared/services';
import { SearchFormModule } from './shared/components/search-form/search-form.module';
import { API_BASE_URL, WS_URL } from './app.tokens';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { LoginEffects, reducers, RouterEffects} from './store';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { AgentModule } from './agent/agent.module';
import { AreaModule } from './area/area.module';
import { RegionModule } from './region/region.module';
import { LeadEffects } from './store/effects/lead';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    HttpClientModule,
    SearchFormModule,
    StoreModule.forRoot({ ...reducers, router: routerReducer }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgAuction DevTools',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([ RouterEffects, LoginEffects, LeadEffects ]),
    LoginModule,
    AdminModule,
    AgentModule,
    AreaModule,
    RegionModule,
  ],
  providers: [
    ...SHARED_SERVICES,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: WS_URL, useValue: environment.wsUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

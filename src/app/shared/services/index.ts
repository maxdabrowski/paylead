import { Provider } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSerializerService } from './router-state-serializer.service';
import { LoginService} from './login.service';
import { LeadService} from './lead.service'
import { LeadStatusService } from './leadStatus.service'

export { RouterStateSerializerService, RouterStateUrl } from './router-state-serializer.service';
export { LeadService} from  './lead.service';
export { LoginService } from  './login.service';
export { LeadStatusService } from './leadStatus.service'

export const SHARED_SERVICES: Provider[] = [
  { provide: LeadService, useClass: LeadService },
  { provide: LoginService, useClass: LoginService },
  { provide: LeadStatusService, useClass: LeadStatusService },
  { provide: RouterStateSerializer, useClass: RouterStateSerializerService }
];
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../../shared/services';
import * as fromLogin from './login';
import * as fromLead from './lead';
import * as fromLeadStatus from './leadStatus';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  login: fromLogin.State;
  lead: fromLead.State;
  status: fromLeadStatus.State
}

export const reducers = {
 login: fromLogin.reducer,
 lead: fromLead.reducer,
 status: fromLeadStatus.reducer
};

//pobieranie danych dla router
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const getRouteUrl = createSelector(getRouterState, router => router.state.url);
export const getRouteParams = createSelector(getRouterState, router => router.state.params);
export const getRouteQueryParams = createSelector(getRouterState, router => router.state.queryParams);

//pobieranie danych dla login
export const getLoginState = createFeatureSelector<fromLogin.State>('login');
export const getLoginErrorLogin = createSelector(getLoginState, fromLogin.getLoginError);
export const getUserDataLogin = createSelector(getLoginState, fromLogin.getUserData);
export const getUserRoleData = createSelector(getLoginState, fromLogin.getUserRole);
export const getUserAreaData = createSelector(getLoginState, fromLogin.getUserArea);
export const getUserRegionData = createSelector(getLoginState, fromLogin.getUserRegion);
export const getUserNickData = createSelector(getLoginState, fromLogin.getUserNick);

//pobieranie danych dla lead
export const getLeadState = createFeatureSelector<fromLead.State>('lead');
export const getLeadsToBuyLead = createSelector(getLeadState, fromLead.getLeadsToBuy);
export const getLeadsOwnLead = createSelector(getLeadState, fromLead.getLeadsOwn);

//pobranie danych dla statusów
export const getLeadStatus = createFeatureSelector<fromLeadStatus.State>('status');
export const getLeadStatusLead = createSelector(getLeadStatus, fromLeadStatus.getStatus);
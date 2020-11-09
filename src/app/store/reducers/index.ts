import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from '../../shared/services';
import * as fromLogin from './login';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  login: fromLogin.State;
}

export const reducers = {
 login: fromLogin.reducer
};

//pobieranie danych dla login
export const getLoginState = createFeatureSelector<fromLogin.State>('login');
export const getLoginErrorLogin = createSelector(getLoginState, fromLogin.getLoginError);
export const getUserDataLogin = createSelector(getLoginState, fromLogin.getUserData);

//pobieranie danych dla router
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const getRouteUrl = createSelector(getRouterState, router => router.state.url);
export const getRouteParams = createSelector(getRouterState, router => router.state.params);
export const getRouteQueryParams = createSelector(getRouterState, router => router.state.queryParams);






import { ActionReducerMap } from '@ngrx/store';
import { AppStates } from '../state/app.states';
import { layoutReducers } from './layout.reducers';

export const appReducers: ActionReducerMap<AppStates, any> = {
  layout: layoutReducers
};

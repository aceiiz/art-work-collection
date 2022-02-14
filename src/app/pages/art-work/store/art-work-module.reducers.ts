import { ActionReducerMap } from '@ngrx/store';
import { ArtWorkModuleStates } from './art-work-module.states';
import { artWorkReducers } from './art-work.reducers';

export const artWorkModuleReducers: ActionReducerMap<ArtWorkModuleStates, any> = {
  artWork: artWorkReducers
};

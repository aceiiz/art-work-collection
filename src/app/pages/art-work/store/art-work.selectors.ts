import { createSelector } from '@ngrx/store';
import { ArtWorkModuleStates } from './art-work-module.states';
import * as fromArtWorkState from './art-work.reducers';

const selectArtWorkState = (state: ArtWorkModuleStates) => state.artWork;

export const selectArtWorkList = createSelector(selectArtWorkState, (state: fromArtWorkState.ArtWorkState) => state);

export const selectArtWorkListCriteria = createSelector(selectArtWorkState, (state) => {
  return state.criteriaObject;
});

export const selectAllArtWorkList = createSelector(selectArtWorkState, fromArtWorkState.selectAll);

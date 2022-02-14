import { createSelector } from '@ngrx/store';
import { LayoutState } from '../reducers/layout.reducers';
import { AppStates } from '../state/app.states';

const selectLayout = (state: AppStates) => state.layout;

export const selectLayoutError = createSelector(selectLayout, (state: LayoutState) => {
  return state.isApiError;
});

export const selectLayoutState = createSelector(selectLayout, (state: LayoutState) => {
  return state;
});

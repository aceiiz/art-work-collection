
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LayoutActions, LayoutActionTypes } from '../action/layout.action';

export interface LayoutState extends EntityState<any> {
  isApiError: boolean;
  errorResponse: any;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: LayoutState = adapter.getInitialState({
  isApiError: false,
  errorResponse: null,
});

export function layoutReducers(state = initialState, action: LayoutActions): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.UPDATE_LAYOUT_ERROR: {
      return {
        ...state,
        isApiError: action.payload
      };
    }
    case LayoutActionTypes.LOAD_ERROR: {
      if (action.payload.status === 401) {
        return state;
      } else {
        return {
          ...state,
          errorResponse: action.payload
        };
      }
    }
    default: {
      return state;
    }
  }
}

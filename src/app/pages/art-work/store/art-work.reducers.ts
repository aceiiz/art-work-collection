import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ArtWorkListContent, ArtWorkListSearchCriteria } from '../models/artwork.model';
import { ArtWorkActions, ArtWorkActionTypes } from './art-work.actions';

export interface ArtWorkState extends EntityState<ArtWorkListContent> {
  isLoading: boolean;
  selected: ArtWorkListContent | null;
  criteriaObject: ArtWorkListSearchCriteria;
  totalPages: number;
}

export const adapter: EntityAdapter<ArtWorkListContent> = createEntityAdapter<ArtWorkListContent>();

export const initialArtWorkState: ArtWorkState = adapter.getInitialState({
  isLoading: false,
  selected: null,
  criteriaObject: {
    page: 0,
    size: 20
  },
  totalPages: 0
});

export function artWorkReducers(state = initialArtWorkState, action: ArtWorkActions): ArtWorkState {
  switch (action.type) {
    case ArtWorkActionTypes.ART_WORK_LIST_REQUEST_ACTION:
      return {
        ...state,
        criteriaObject: action.payload
      };
    case ArtWorkActionTypes.ART_WORK_LIST_RESPONSE_ACTION:
      return adapter.setAll(action.payload.data, {
        ...state,
        criteriaObject: {
          ...state.criteriaObject,
          page: action.payload.pagination.current_page,
          size: action.payload.pagination.limit,
          total: action.payload.pagination.total
        },
        totalPages: action.payload.pagination.total_pages
      });
    default: {
      return state;
    }
  }
}

export const { selectAll, selectEntities } = adapter.getSelectors();

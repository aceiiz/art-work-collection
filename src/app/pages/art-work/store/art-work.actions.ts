import { Action } from '@ngrx/store';
import { ArtWorkListResponse, ArtWorkListSearchCriteria } from '../models/artwork.model';


export enum ArtWorkActionTypes {
  ART_WORK_LIST_REQUEST_ACTION = '[ArtWork List] ArtWork List Request',
  ART_WORK_LIST_RESPONSE_ACTION = '[ArtWork List] ArtWork List Response',
}

export class ArtWorkListRequestAction implements Action {
  readonly type = ArtWorkActionTypes.ART_WORK_LIST_REQUEST_ACTION;

  constructor(public payload: ArtWorkListSearchCriteria) { }
}

export class ArtWorkListResponseAction implements Action {
  readonly type = ArtWorkActionTypes.ART_WORK_LIST_RESPONSE_ACTION;

  constructor(public payload: ArtWorkListResponse) { }
}

export type ArtWorkActions =
  | ArtWorkListRequestAction
  | ArtWorkListResponseAction;

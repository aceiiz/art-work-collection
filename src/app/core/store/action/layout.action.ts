import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  UPDATE_LAYOUT_ERROR = '[Layout] Layout Error Updated',
  LOAD_ERROR = '[Effect] Load Error',
  SAVE_SUCCESS = '[Layout] Save Success'
}

export class LayoutActionErrorUpdate implements Action {
  readonly type = LayoutActionTypes.UPDATE_LAYOUT_ERROR;
  constructor(public payload: boolean) { }
}

export class LayoutActionLoadError implements Action {
  readonly type = LayoutActionTypes.LOAD_ERROR;
  constructor(public payload: any) { }
}

export type LayoutActions =
  | LayoutActionErrorUpdate
  | LayoutActionLoadError;

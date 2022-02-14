import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { LayoutActionLoadError } from 'src/app/core/store/action/layout.action';
import { ArtWorkService } from '../services/art-work.service';
import { ArtWorkActionTypes, ArtWorkListRequestAction, ArtWorkListResponseAction } from './art-work.actions';


@Injectable()
export class ArtWorkEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly artWorkService: ArtWorkService
  ) { }

  searchArtWorkList$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ArtWorkListRequestAction>(ArtWorkActionTypes.ART_WORK_LIST_REQUEST_ACTION),
      map((action) => {
        return action.payload;
      }),
      switchMap((payload) => {
        return this.artWorkService.searchByCriteria(payload).pipe(
          map((response) => {
            return new ArtWorkListResponseAction(response);
          }),
          catchError((error) => of(new LayoutActionLoadError(error)))
        );
      })
    )
  );
}

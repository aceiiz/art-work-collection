import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LayoutActionErrorUpdate } from '../store/action/layout.action';
import { AppStates } from '../store/state/app.states';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<AppStates>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry(1),
      catchError((err) => this.handleError(err, request))
    );
  }

  handleError(err: any, request: any): Observable<any> {
    if (err.error) {
      let obs: Observable<any>;
      if (err.status === 400 || err.status === 404 || err.status === 500 || err.status === 503) {
        this.store.dispatch(new LayoutActionErrorUpdate(true));

        if (typeof err.error === 'string') {
          err.error = JSON.parse(err.error);
        }

        err.error.translateKey = `ERROR_CODE.${err.error.status}`;

        obs = new Observable((observer: any) => {
          observer.error(err);
          observer.complete();
        });
        return obs;
      }
    }

    return throwError(err);
  }
}
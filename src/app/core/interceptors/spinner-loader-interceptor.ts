import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerLoaderInterceptor implements HttpInterceptor {
  private requestCount = 0;
  private readonly SPINNER_NAME: string = 'x-frontend-spinner-loader';

  constructor(protected spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //  disable show loader.
    if (request.headers.has(this.SPINNER_NAME)) {
      const modifiedReq = request.clone({
        headers: request.headers.delete(this.SPINNER_NAME)
      });


      // Show only one spinner.
      if (this.requestCount === 0) {
        this.spinner.show();
      }

      this.requestCount++;

      return next.handle(modifiedReq).pipe(
        finalize(() => {
          this.requestCount--;

          if (!this.requestCount) {
            const ms = +request.headers.get(this.SPINNER_NAME)!;

            setTimeout(() => {
              this.spinner.hide();
            }, ms);
          }
        })
      );
    }

    return next.handle(request);
  }
}

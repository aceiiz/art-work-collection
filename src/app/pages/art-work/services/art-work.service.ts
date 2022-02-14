import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtWorkListResponse, ArtWorkListSearchCriteria } from '../models/artwork.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtWorkService {

  public envService: any;
  public env = { ...environment };

  constructor(
    private readonly http: HttpClient
  ) {
    this.envService = this.env.services.artWork;
  }

  searchByCriteria(criteria: ArtWorkListSearchCriteria): Observable<ArtWorkListResponse> {
    const url = this.getUrl();
    const params = this.getParams(criteria);

    return this.http.get<any>(url, {
      headers: this.loaderHeaders(1000),
      observe: 'body',
      params
    });
  }

  public getUrl() {
    return this.env.serverUrl + this.envService.url;
  }

  protected getParams(query: any, noBracket = false): HttpParams {
    let params: HttpParams = new HttpParams();

    for (const key of Object.keys(query)) {
      if (query[key]) {
        if (query[key] instanceof Array) {
          query[key].forEach((item: any) => {
            params = params.append(noBracket ? `${key.toString()}` : `${key.toString()}[]`, item);
          });
        } else {
          params = params.append(key.toString(), query[key]);
        }
      } else if (query[key] === 0 || query[key] === false) {
        params = params.append(key.toString(), query[key]);
      }
    }

    return params;
  }


  loaderHeaders(ms = 0): HttpHeaders {
    let header = new HttpHeaders();

    if (ms !== null) {
      header = header.append('x-frontend-spinner-loader', ms.toString());
    }

    return header;
  }
}

import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cities} from '../../models/cities';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor() { }

  private _http = inject(HttpClient);
  baseUrl: string = environment.baseUrl;

  getCities(name: string): Observable<Cities> {
    let params = new HttpParams();

    if (name) {
      params = params.set('name', name);
    }

    return this._http.get<Cities>(`${this.baseUrl}/cities`, {params: params});
  }
}

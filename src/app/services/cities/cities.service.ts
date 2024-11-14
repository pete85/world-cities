import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cities} from 'app/models/cities';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor() { }

  private _http = inject(HttpClient);
  baseUrl: string = environment.baseUrl;
  totalCitiesSignal = signal<number>(0);

  setTotalCities(count: number) {
    this.totalCitiesSignal.set(count);
  }

  getCities(name: string): Observable<Cities> {
    let params = new HttpParams();

    if (name) {
      params = params.set('name', name);
    }

    return this._http.get<Cities>(`${this.baseUrl}/cities`, {params: params});
  }
}

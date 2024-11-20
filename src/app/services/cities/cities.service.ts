import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {Cities, City} from 'app/models/cities';
import {environment} from '../../../environments/environment';
import {WorldGeoData} from 'app/models/world-geo-data';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private _http = inject(HttpClient);
  private _cityCache: any = null;
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

    return this._http.get<Cities>(`${this.baseUrl}/api/cities`, {params: params});
  }

  getCity(geonameid: string): Observable<City> {
    return this._http.get<City>(`${this.baseUrl}/api/cities/${geonameid}`);
  }

  getCityDetails(geonameid: string): Observable<WorldGeoData> {
    let params = new HttpParams();

    if (geonameid) {
      params = params.set('cityId', geonameid);
    }

    if (this._cityCache) {
      return of(this._cityCache);
    } else {
      return this._http.get<WorldGeoData>(`${this.baseUrl}/world-geo-data/city`, {params: params});
      // return this._http.get<any>(`${this.baseUrl}/world-geo-data/city`, {params: params}).pipe(
      //   tap(data => this._cityCache = data)
      // );
    }

  }
}

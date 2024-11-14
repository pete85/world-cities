import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CitiesService} from 'app/services/cities/cities.service';
import {Subscription} from 'rxjs';
import {City} from 'app/models/cities';
import {WorldGeoDataCity} from 'app/models/world-geo-data';
import {DecimalPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe
  ],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent implements OnInit, OnDestroy {

  city: City | null = null;
  cityId: string | null = null;
  cityData: WorldGeoDataCity | null = null;
  subCity$: Subscription | undefined;
  subCityDetails$: Subscription | undefined;
  subscriptionList = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _citiesService: CitiesService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.cityId = this.getCityId();

    if (this.cityId) {
      this.getCity(this.cityId);
    }
  }

  getCityId() {
    return this._route.snapshot.queryParamMap.get('geonameid');
  }

  getCity(cityId: string) {
    this.subCity$ = this._citiesService.getCity(cityId).subscribe({
      next: response => {
        if (response) {
          this.city = response;
          console.log('City: ', response);
          this.getCityDetails(cityId);
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getCityDetails(cityId: string) {
    this.subCityDetails$ = this._citiesService.getCityDetails(cityId).subscribe({
      next: response => {
        if (response) {
          console.log('RES: ', response);
          this.cityData = response.data;
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }

}

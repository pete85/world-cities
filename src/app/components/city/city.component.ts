import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CitiesService} from 'app/services/cities/cities.service';
import {Subscription} from 'rxjs';
import {City} from 'app/models/cities';
import {CityModel} from 'app/models/world-geo-data';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent implements OnInit, OnDestroy {

  cityId: string | null = null;
  cityData: CityModel | null = null;
  subCity$: Subscription | undefined;
  subscriptionList = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _citiesService: CitiesService,
  ) {}

  ngOnInit() {
    this.cityId = this.getCityId();

    if (this.cityId) {
      this.getCityDetails(this.cityId);
    }
  }

  getCityId() {
    return this._route.snapshot.queryParamMap.get('geonameid');
  }

  getCityDetails(cityId: string) {
    this.subCity$ = this._citiesService.getCity(cityId).subscribe({
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

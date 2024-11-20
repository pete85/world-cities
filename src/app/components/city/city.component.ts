import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CitiesService} from 'app/services/cities/cities.service';
import {Subscription} from 'rxjs';
import {City, Coordinates} from 'app/models/cities';
import {WorldGeoDataCity} from 'app/models/world-geo-data';
import {DecimalPipe, NgIf} from '@angular/common';
import {WikipediaService} from 'app/services/wikipedia/wikipedia.service';
import {CesiumMapComponent} from 'app/components/cesium-map/cesium-map.component';
import {GoogleChartMapComponent} from 'app/components/google-chart-map/google-chart-map.component';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe,
    CesiumMapComponent,
    GoogleChartMapComponent
  ],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent implements OnInit, OnDestroy {

  city: City | null = null;
  cityId: string | null = null;
  cityData: WorldGeoDataCity | null = null;
  coordinates: Coordinates | null = null;
  errorMessage: string | null = null;
  wikiData: string = '';
  subCity$: Subscription | undefined;
  subCityDetails$: Subscription | undefined;
  subWikiDescription$: Subscription | undefined;
  subscriptionList = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _citiesService: CitiesService,
    private _wikiService: WikipediaService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getCityId();
  }

  getCityId() {
    const cityId: string | null = this._route.snapshot.queryParamMap.get('geonameid');
    this.getCity(<string>cityId);
  }

  getCity(cityId: string) {
    this.subCity$ = this._citiesService.getCity(cityId).subscribe({
      next: response => {
        if (response) {
          this.city = response;
          this.getCityDetails(cityId);
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getCityDetails(cityId: string) {

    console.log('City ID: ', cityId);

    this.coordinates = null;
    this.subCityDetails$ = this._citiesService.getCityDetails(cityId).subscribe({
      next: response => {
        if (response) {
          console.log('RES: ', response);
          this.cityData = response.data;
          this.coordinates = {
            latitude: response.data.latitude,
            longitude: response.data.longitude,
          }
          console.log('COORD: ', this.coordinates);
          if (response.data.wiki_url) {
            this.getWikiDescription(response.data.wiki_url);
          }
        }
      },
      error: error => {
        console.error(error);
        this.errorMessage = error.error.message;
        console.log('ERROR: ', error);
      }
    })
  }

  getWikiDescription(title: string) {
    console.log('Title: ', title);
    this.subWikiDescription$ = this._wikiService.getFirstParagraph(title).subscribe({
      next: response => {
        if (response) {
          this.wikiData = response;
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

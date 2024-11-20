import {Component, HostListener, inject, OnDestroy} from '@angular/core';
import {NgIf} from '@angular/common';
import {SearchComponent} from '../search/search.component';
import {City} from 'app/models/cities';
import {Subscription} from 'rxjs';
import {CitiesService} from 'app/services/cities/cities.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {

  citiesList: City[] = [];
  citiesStringList: string[] = [];
  innerWidth: number = 0;
  innerHeight: number = 0;
  selectedRecord: string = '';
  subCities$: Subscription | undefined;
  subscriptionList = new Subscription();
  title: string = 'Cities Search';
  totalCities: number = 0;

  private _citiesService = inject(CitiesService);
  private _router = inject(Router);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor() {
    this.onResize();
  }

  /**
   * Http request is made with the name query parameter which takes city name. Therefore, searchString has to be split
   * and trimmed to avoid errors. Name's length is checked and if it's 2 characters or longer, the getCities() is called.
   * @param searchString
   */
  handleCitySearch(searchString: string): void {
    if (searchString) {
      const cityName = searchString.split(",")[0].split("(")[0].trim();
      if (cityName.length >= 2) {
        this.getCities(cityName);
      } else {
        this.citiesList = [];
        this.totalCities = 0;
      }
    }
  }

  handleSelectedRecord(selectedRecord: string): void {
    this.selectedRecord = selectedRecord;
  }

  /**
   * Get cities by name (partial or full) provided by the SearchComponent. SearchComponent can be reused for any other purpose
   * @param name
   */
  getCities(name: string) {
    this.totalCities = 0;
    this.subCities$ = this._citiesService.getCities(name).subscribe(
      {
        next: response => {
          this.subscriptionList.add(this.subCities$);
          if (response) {
            this.citiesList = response.data;
            this.totalCities = response.totalRecords;
            this._citiesService.setTotalCities(response.totalRecords);
            this.citiesStringList = response.data.map(
              (el: City) => `${el.name}, ${el.region || ''} (${el.country})`.replace(/\s\|\s$/, '')
            );
          }
        },
        error: err => {
          this.totalCities = 0;
          console.error(err);
        }
      }
    );
  }

  viewCityDetails() {

    const [cityPart, countryPart] = this.selectedRecord.split(" (");
    const cityName = cityPart.split(",")[0].trim();
    const countryName = countryPart.replace(")", "").trim();

    const selectedCity: City = this.citiesList.filter(el => el.name === cityName && el.country === countryName)[0];

    console.log('selectedCity: ', selectedCity);

    this._router.navigate(['/city'], { queryParams: { geonameid: selectedCity.geonameid }, state: { city: selectedCity } });
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }

}

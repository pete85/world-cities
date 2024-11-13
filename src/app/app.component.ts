import {Component, HostListener, inject, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {CitiesService} from './services/cities/cities.service';
import {City} from './models/cities';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SearchComponent} from './components/search/search.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {

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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor() {
    this.onResize();
  }

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
            this.citiesStringList = response.data.map(
              (el: City) => `${el.name}, ${el.region || ''}  (${el.country})`.replace(/\s\|\s$/, '')
            );
          }
        },
        error: err => {
          this.totalCities = 0;
          console.error('Error: ', err);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}

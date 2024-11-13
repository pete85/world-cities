import {Component, inject, OnDestroy, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {

  citiesList: City[] = [];
  subCities$: Subscription | undefined;
  subscriptionList = new Subscription();
  title: string = 'Cities Search';
  totalCities: number = 0;

  private _citiesService = inject(CitiesService);

  ngOnInit() {
  }

  handleCitySearch(searchString: string): void {
    console.log('searchString: ', searchString);
    if (searchString) {
      if (searchString.length > 2) {
        this.getCities(searchString);
      } else {
        this.citiesList = [];
        this.totalCities = 0;
      }
    }
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

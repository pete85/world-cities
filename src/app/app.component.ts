import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {CitiesService} from './services/cities/cities.service';
import {City} from './models/cities';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
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
    this.getCities('wars');
  }

  /**
   * Get cities by name (partial or full) provided by the SearchComponent. SearchComponent can be reused for any other purpose
   * @param name
   */
  getCities(name: string) {
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
          console.error('Error: ', err);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}

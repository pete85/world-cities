import {Component, HostListener, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {City} from './models/cities';
import {SearchComponent} from './components/search/search.component';
import {NgIf} from '@angular/common';
import {CitiesService} from 'app/services/cities/cities.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  citiesList: City[] = [];
  citiesStringList: string[] = [];
  innerWidth: number = 0;
  innerHeight: number = 0;
  selectedRecord: string = '';
  title: string = 'Cities Search';
  totalCities = signal<number>(0);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor(private _citiesService: CitiesService) {
    this.onResize();
    this.totalCities = this._citiesService.totalCitiesSignal;
    console.log('totalCities', this.totalCities);
  }

  navigateTo(url: string) {
    window.open(url, '_blank');
  }
}

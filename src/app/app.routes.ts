import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CityComponent} from 'app/components/city/city.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home',
    data: {title: 'home'}
  },
  {
    path: 'city/:geonameid',
    loadComponent: () => import('app/components/city/city.component').then(m => m.CityComponent),
    title: 'City',
    data: { title: 'city' }
  }
];

import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CitiesService} from './services/cities/cities.service';
import {of, throwError} from 'rxjs';
import {City} from './models/cities';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let citiesServiceMock: jasmine.SpyObj<CitiesService>;

  beforeEach(async () => {

    const citiesServiceSpy = jasmine.createSpyObj('CitiesService', ['getCities']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: CitiesService, useValue: citiesServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    citiesServiceMock = TestBed.inject(CitiesService) as jasmine.SpyObj<CitiesService>;
    fixture.detectChanges();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Cities Search' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Cities Search');
  });

  describe('handleCitySearch()', () => {
    it('should call getCities with the city name if input has at least 2 characters', () => {
      const getCitiesSpy = spyOn(component, 'getCities');
      component.handleCitySearch('Tokyo');
      expect(getCitiesSpy).toHaveBeenCalledWith('Tokyo');
    });

    it('should not call getCities if the city name has less than 2 characters', () => {
      const getCitiesSpy = spyOn(component, 'getCities');

      component.handleCitySearch('A');
      expect(getCitiesSpy).not.toHaveBeenCalled();
      expect(component.citiesList).toEqual([]);
      expect(component.totalCities).toBe(0);
    });
  });

  describe('handleSelectedRecord()', () => {
    it('should update selectedRecord with the provided value', () => {
      component.handleSelectedRecord('Basingstoke, England  (United Kingdom)');
      expect(component.selectedRecord).toBe('Basingstoke, England  (United Kingdom)');
    });
  });

  describe('getCities', () => {
    it('should call CitiesService.getCities and update citiesList, totalCities, and citiesStringList on success', () => {
      const mockResponse = {
        data: [
          { name: 'Miami', country: 'United States', region: 'Florida' } as City,
          { name: 'Barcelona', country: 'Spain', region: 'Catalonia' } as City
        ],
        totalRecords: 2
      };

      citiesServiceMock.getCities.and.returnValue(of(mockResponse));
      component.getCities('Miami');

      expect(citiesServiceMock.getCities).toHaveBeenCalledWith('Miami');
      expect(component.citiesList).toEqual(mockResponse.data);
      expect(component.totalCities).toBe(2);
      expect(component.citiesStringList).toEqual([
        'Miami, Florida (United States)',
        'Barcelona, Catalonia (Spain)'
      ]);
    });

    it('should handle error and set totalCities to 0 on error', () => {
      spyOn(console, 'error');
      citiesServiceMock.getCities.and.returnValue(throwError(() => new Error('Error occurred')));


      component.getCities('InvalidCity');

      expect(citiesServiceMock.getCities).toHaveBeenCalledWith('InvalidCity');
      expect(component.totalCities).toBe(0);
      expect(console.error).toHaveBeenCalled();
    });
  });
});

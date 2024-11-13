import { TestBed } from '@angular/core/testing';
import { CitiesService } from './cities.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Cities } from '../../models/cities';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';

describe('CitiesService', () => {
  let service: CitiesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        CitiesService,
        { provide: HttpClient, useValue: spy }
      ]
    });

    service = TestBed.inject(CitiesService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  describe('getCities', () => {
    it('should call the correct URL with the name parameter if name is provided', () => {
      const mockResponse: Cities = {
        data: [{ name: 'Berlin', country: 'Germany', region: 'Berlin', geonameid: 1 }],
        totalRecords: 1
      };
      const cityName = 'Berlin';

      httpClientSpy.get.and.returnValue(of(mockResponse));

      service.getCities(cityName).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const [url, options] = httpClientSpy.get.calls.mostRecent().args;
      expect(url).toBe(`${environment.baseUrl}/cities`);
      expect(options).toBeDefined();
      if (options && options.params instanceof HttpParams) {
        expect(options.params.get('name')).toBe(cityName);
      }
    });

    it('should call the correct URL without parameters if name is an empty string', () => {
      const mockResponse: Cities = {
        data: [{ name: 'Berlin', country: 'Germany', region: 'Berlin', geonameid: 1 }],
        totalRecords: 1
      };

      httpClientSpy.get.and.returnValue(of(mockResponse));

      service.getCities('').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const [url, options] = httpClientSpy.get.calls.mostRecent().args;
      expect(url).toBe(`${environment.baseUrl}/cities`);
      if (options && options.params instanceof HttpParams) {
        expect(options.params.keys().length).toBe(0); // Check that no params are set
      }
    });
  });
});

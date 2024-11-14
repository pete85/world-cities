import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  private apiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary';

  constructor(private http: HttpClient) {}

  getFirstParagraph(wikiUrl: string): Observable<string> {
    const title = wikiUrl.split('/').pop() || '';

    const url = `${this.apiUrl}/${title}`;

    return this.http.get<any>(url).pipe(
      map((response) => response.extract ? response.extract.split('\n')[0] : 'No content found')
    );
  }
}

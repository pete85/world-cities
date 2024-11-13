import {Component, output} from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  cityName = output<string>();

  onCitySearch(searchString: string) {
    this.cityName.emit(searchString);
  }
}

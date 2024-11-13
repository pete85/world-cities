import {Component, Input, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  @Input() recordsStringList: string[] = [];

  recordName = output<string>();
  selectedRecord: string = '';
  selectedRecordChange = output<string>();

  onSearch(searchString: string) {
    this.recordName.emit(searchString);
  }

  onSelected() {
    this.selectedRecordChange.emit(this.selectedRecord);
  }
}

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

  /**
   * Emit search string for http request
   * @param searchString
   */
  onSearch(searchString: string) {
    this.recordName.emit(searchString);
  }

  /**
   * Emit selected record
   */
  onSelected() {
    if (this.recordsStringList.includes(this.selectedRecord)) {
      this.selectedRecordChange.emit(this.selectedRecord);
    } else {
      this.selectedRecordChange.emit('');
    }
  }
}

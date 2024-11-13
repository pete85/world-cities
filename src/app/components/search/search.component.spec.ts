import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {FormsModule} from '@angular/forms';

describe('CitySearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearch()', () => {
    const searchString = 'London';
    beforeEach(() => {
      spyOn(component.recordName, 'emit');
      component.onSearch(searchString);
    });

    it('should emit recordName when onSearch is called', () => {
      expect(component.recordName.emit).toHaveBeenCalledWith(searchString);
    });
  });

  describe('onSelected()', () => {

    beforeEach(() => {
      spyOn(component.selectedRecordChange, 'emit');
      component.recordsStringList = ['London', 'Warsaw', 'New York City'];
    });

    it('should emit selectedRecordChange with selectedRecord if it exists in recordsStringList', () => {
      component.selectedRecord = 'Warsaw';
      component.onSelected();
      expect(component.selectedRecordChange.emit).toHaveBeenCalledWith('Warsaw');
    });

    it('should emit selectedRecordChange with an empty string if selectedRecord does not exist in recordsStringList', () => {
      component.selectedRecord = 'Lisbon';
      component.onSelected();
      expect(component.selectedRecordChange.emit).toHaveBeenCalledWith('');
    });
  });
});

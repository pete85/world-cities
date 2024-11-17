import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleChartMapComponent } from './google-chart-map.component';

describe('GoogleChartMapComponent', () => {
  let component: GoogleChartMapComponent;
  let fixture: ComponentFixture<GoogleChartMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleChartMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleChartMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

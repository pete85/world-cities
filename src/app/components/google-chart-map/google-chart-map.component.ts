import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {GoogleChartInterface, GoogleChartType, Ng2GoogleChartsModule} from 'ng2-google-charts';
import {Coordinates} from 'app/models/cities';
import {WorldGeoDataCity} from 'app/models/world-geo-data';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-google-chart-map',
  standalone: true,
  imports: [
    Ng2GoogleChartsModule,
    NgIf
  ],
  templateUrl: './google-chart-map.component.html',
  styleUrl: './google-chart-map.component.scss'
})
export class GoogleChartMapComponent implements OnChanges {
  @Input() cityData: WorldGeoDataCity | undefined;

  chartData: GoogleChartInterface = {
    chartType: GoogleChartType.GeoChart,
    dataTable: [
      ['Latitude', 'Longitude', 'City', 'Population'],
    ],
    options: {
      displayMode: 'regional',
      region: 'world',
      colorAxis: {colors: ['#fecaca', '#991b1b'], legend: {position: 'none'}}, // Gradient colors
      backgroundColor: '#f1f5f9',
      datalessRegionColor: '#cbd5e1',
      legend: 'none',
      enableRegionInteractivity: true,
    },
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cityData']) {
      this.chartData.options.region = this.cityData?.country.code;
      this.chartData.dataTable.push(
        [
          this.cityData?.latitude,
          this.cityData?.longitude,
          this.cityData?.name,
          this.cityData?.population
        ]);
    }
  }
}

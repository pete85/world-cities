import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {createWorldTerrainAsync, Viewer, Ion, Cartesian3} from 'cesium';
import * as Cesium from 'cesium';
import {environment} from '../../../environments/environment';
import {Coordinates} from 'app/models/cities';

@Component({
  selector: 'app-cesium-map',
  standalone: true,
  imports: [],
  templateUrl: './cesium-map.component.html',
  styleUrl: './cesium-map.component.scss'
})

export class CesiumMapComponent implements AfterViewInit {

  @Input() coordinates: Coordinates | undefined;

  viewer: Viewer | undefined;

  ngAfterViewInit(): void {
    // Set Cesium static asset path
    (window as any).CESIUM_BASE_URL = '/assets/cesium';

    // Set Cesium Ion access token
    Ion.defaultAccessToken = environment.celsiumJS;

    // Initialize Cesium Viewer
    this.viewer = new Viewer('cesiumContainer', {
      animation: false,
      timeline: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      vrButton: false,
      infoBox: false,
      selectionIndicator: false,
      navigationHelpButton: false,
      creditContainer: document.createElement('div')
    });

    console.log('Coordinates: ', this.coordinates);

    // this.viewer.camera.setView({
    //   destination: Cartesian3.fromDegrees(<number>this.coordinates?.longitude, <number>this.coordinates?.latitude, 50000), // Example coordinates
    // });
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(<number>this.coordinates?.longitude, <number>this.coordinates?.latitude),
      point: {pixelSize: 8, color: Cesium.Color.RED},
    });

    this.viewer.camera.setView({
      destination: Cartesian3.fromDegrees(<number>this.coordinates?.longitude, <number>this.coordinates?.latitude, 18000000)
    });
  }
}

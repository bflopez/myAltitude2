import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GeolocationService} from '../../services/location.service'

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 implements OnInit {

  lat: number;
  long: number;
  latitudeDir: string;
  longitudeDir: string;
  locAccuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  timestamp: number;

  measurementType: string;
  message: string;

  constructor(public navCtrl: NavController, private geolocation: GeolocationService) {
    this.measurementType = "feet";
  }

  getLocation() {
    this.geolocation.getCurrentPosition().forEach(
      // Next.
      (position: Position) => {
        let lat = this.geolocation.round(position.coords.latitude, 5);
        let long = this.geolocation.round(position.coords.longitude, 5);

        if (lat < 0) {
          this.latitudeDir = 'S';
        } else {
          this.latitudeDir = 'N'
        }
        if (long < 0) {
          this.longitudeDir = 'W';
        } else {
          this.longitudeDir = 'E'
        }

        this.lat = Math.abs(lat);
        this.long = Math.abs(long);
        this.locAccuracy = this.geolocation.metersToFeet(position.coords.accuracy);
        this.altitude = this.geolocation.metersToFeet(position.coords.altitude);
        this.altitudeAccuracy = this.geolocation.metersToFeet(position.coords.altitudeAccuracy);
        this.timestamp = position.timestamp;
      }, null
    )
      .then(() => console.log('Geolocation service: completed.'))
      .catch((error: PositionError) => {

        if (error.code > 0) {

          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.message = 'permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              this.message = 'position unavailable';
              break;
            case error.TIMEOUT:
              this.message = 'position timeout';
              break;
          }
        }
      })
  }

  ngOnInit() {
    this.getLocation();
  }
}


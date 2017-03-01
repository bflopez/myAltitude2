import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GeolocationService} from '../../services/location.service'
import {Altitude} from "../../Altitude";

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 implements OnInit {

  altitude: Altitude;

  measurementType: string;
  message: string;

  constructor(public navCtrl: NavController, private geolocation: GeolocationService) {
    this.measurementType = "feet";
  }

  getLocation() {
    this.geolocation.getCurrentPosition().forEach(
      // Next.
      (altitude: Altitude) => {
        this.altitude = altitude;
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


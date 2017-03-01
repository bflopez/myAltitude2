import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

import { Altitude } from '../Altitude'
import { Geolocation } from 'ionic-native';


@Injectable() export class GeolocationService {

  altitude: Altitude;

  constructor() { }

  round(value: number, decimals: number) {
    let strnumber = `${value}e${decimals}`;
    let numround = Math.round(Number(strnumber));
    let strfinal = `${numround}e-${decimals}`;
    return Number(strfinal);
  }

  metersToFeet = (meters: number) => this.round(meters * 3.2808399, 0);
  feetToMeters = (feet:number) => this.round(feet / 3.2808399, 0);

  getCurrentPosition(): Observable<Altitude> {

    return new Observable((observer: Observer<Altitude>) => {

      // Invokes getCurrentPosition method of Geolocation API.
      Geolocation.getCurrentPosition()
        .then(
          // Success callback.
          (position: Position) => {
            let lat = this.round(position.coords.latitude, 5);
            let long = this.round(position.coords.longitude, 5);

            if (lat < 0) {
              this.altitude.latitudeDir = 'S';
            } else {
              this.altitude.latitudeDir = 'N'
            }
            if (long < 0) {
              this.altitude.longitudeDir = 'W';
            } else {
              this.altitude.longitudeDir = 'E'
            }

            this.altitude.lat = Math.abs(lat);
            this.altitude.long = Math.abs(long);
            this.altitude.locAccuracy = this.metersToFeet(position.coords.accuracy);
            this.altitude.altitude = this.metersToFeet(position.coords.altitude);
            this.altitude.altitudeAccuracy = this.metersToFeet(position.coords.altitudeAccuracy);
            this.altitude.timestamp = position.timestamp;

            observer.next(this.altitude);
            observer.complete();

          },

          // Error callback.
          (error: PositionError) => {

            console.log('Geolocation service: ' + error.message);

            observer.error(error);

          }
        );

    });

  }

}

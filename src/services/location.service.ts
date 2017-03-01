import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

import { Geolocation } from 'ionic-native';


@Injectable() export class GeolocationService {

  constructor() { }

  round = (value: number, decimals: number) => {
    let strnumber = `${value}e${decimals}`;
    let numround = Math.round(Number(strnumber));
    let strfinal = `${numround}e-${decimals}`;
    return Number(strfinal);
  };

  metersToFeet = (meters: number) => this.round(meters * 3.2808399, 0);
  feetToMeters = (feet:number) => this.round(feet / 3.2808399, 0);

  getCurrentPosition(): Observable<Position> {

    return new Observable((observer: Observer<Position>) => {

      // Invokes getCurrentPosition method of Geolocation API.
      Geolocation.getCurrentPosition()
        .then(
          // Success callback.
          (position: Position) => {

            observer.next(position);
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationService } from '../../services/location.service';
export var Page1 = (function () {
    function Page1(navCtrl, locationService) {
        this.navCtrl = navCtrl;
        this.locationService = locationService;
    }
    Page1.prototype.ngOnInit = function () {
        this.locationService;
    };
    Page1 = __decorate([
        Component({
            selector: 'page-page1',
            templateUrl: 'page1.html',
            providers: [LocationService]
        }), 
        __metadata('design:paramtypes', [NavController, LocationService])
    ], Page1);
    return Page1;
}());
//# sourceMappingURL=page1.js.map